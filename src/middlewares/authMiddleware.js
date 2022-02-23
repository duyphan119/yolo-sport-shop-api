const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const reqHeader = req.headers["authorization"];
  if (reqHeader) {
    const token = reqHeader.split(" ")[1];
    const user = jwt.verify(token, process.env.ACCESS_TOKEN);
    if (user) {
      req.user = user;
      next();
    } else {
      return res.status(401).json("Token is invalid");
    }
  } else {
    return res.status(401).json("Error authorization");
  }
};
const verifyToken_Admin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(401).json("Error authorization");
    }
  });
};
module.exports = { verifyToken, verifyToken_Admin };
