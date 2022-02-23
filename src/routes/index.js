const authRouter = require("./auth");
const userRouter = require("./user");
const categoryRouter = require("./category");
const productRouter = require("./product");
const commentRouter = require("./comment");
const orderRouter = require("./order");
const cartRouter = require("./cart");

const routes = (app) => {
  app.use("/v1/api/auth", authRouter);
  app.use("/v1/api/user", userRouter);
  app.use("/v1/api/category", categoryRouter);
  app.use("/v1/api/product", productRouter);
  app.use("/v1/api/comment", commentRouter);
  app.use("/v1/api/order", orderRouter);
  app.use("/v1/api/cart", cartRouter);
};
module.exports = routes;
