const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const RefreshToken = require("../models/RefreshToken");
const User = require("../models/User");
const authController = {
  // Xử lí đăng ký
  register: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(500).json("This email was registered");
      }
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const { password, ...others } = req.body;
      const newUser = new User({ ...others, hash });
      const savedUser = await newUser.save();
      res.status(200).json(savedUser);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  //   Xử lí đăng nhập
  logIn: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(500).json("Email or password is incorrect");
      }
      const decodedHash = bcrypt.compareSync(req.body.password, user.hash);
      if (!decodedHash) {
        return res.status(500).json("Email or password is incorrect");
      }
      const accessToken = jwt.sign(
        {
          _id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.ACCESS_TOKEN,
        { expiresIn: 1000 * 60 * 60 * 24 }
      );
      const refreshToken = jwt.sign(
        {
          _id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.REFRESH_TOKEN,
        { expiresIn: 1000 * 60 * 60 * 24 * 30 }
      );
      res.cookie(process.env.COOKIE_REFRESH_TOKEN_NAME, refreshToken, {
        httpOnly: true,
        path: "/",
        secure: true,
        sameSite: "none",
      });
      await new RefreshToken({ token: refreshToken }).save();
      const { hash, ...others } = user._doc;
      res.status(200).json({ ...others, accessToken });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  //   Refresh token
  refresh: async (req, res) => {
    const refreshToken = req.cookies[process.env.COOKIE_REFRESH_TOKEN_NAME];
    try {
      if (refreshToken) {
        const check = await RefreshToken.findOne({ token: refreshToken });
        if (check) {
          const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
          if (user) {
            const accessToken = jwt.sign(
              {
                _id: user._id,
                isAdmin: user.isAdmin,
              },
              process.env.ACCESS_TOKEN,
              { expiresIn: 1000 * 60 * 60 * 24 }
            );
            res.status(200).json({ accessToken });
          } else {
            return res.status(401).json("RefreshToken's expired");
          }
        } else {
          return res.status(401).json("Error authorization");
        }
      } else {
        return res.status(401).json("Error authorization");
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  //   Xử lí đăng xuất
  logOut: async (req, res) => {
    const refreshToken = req.cookies[process.env.COOKIE_REFRESH_TOKEN_NAME];
    await RefreshToken.deleteOne({ token: refreshToken });
    res.clearCookie(process.env.COOKIE_REFRESH_TOKEN_NAME);
    return res.status(200).json("Log out successful");
  },
};
module.exports = authController;
