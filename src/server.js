require("./db/mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");

const productRouter = require("./router/product");
const userRouter = require("./router/user");
const historyRouter = require("./router/history");

const port = process.env.PORT || 8080;

app.use(express.json());

// enabling cors
app.use(cors());

app.use(productRouter);
app.use(userRouter);
app.use(historyRouter);

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(port, () =>
  console.log("> Server is up and running on port : " + port)
);
