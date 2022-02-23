const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const PORT = process.env.PORT | 5000;
const connectDatabase = require("./config/db");
const routes = require("./routes");
connectDatabase();
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
routes(app);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
