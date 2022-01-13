const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const url = process.env.DB_CONNECTION;

mongoose.connect(url, { useNewUrlParser: true }).then(() => {
  console.log("> db connected");
});
