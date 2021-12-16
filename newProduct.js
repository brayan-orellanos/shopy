const express = require("express");
// const router = express.Router();
const app = express();
const bodyParser = require("body-parser");
app.use(express.static("public"));
// const bcrypt = require("bcryptjs");
// const { check, validationResult } = require("express-validator");
// const moment = require('moment');
// const jwt = require('jwt-simple');

// const { User } = require("../../db");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.post("/createProduct", cors(corsOptions), async (req, res) => {
    res.statusCode = 200;
    res.end(req.data)
    console.log(req.body)
});

app.listen(8080, () => {
  console.log("server on port 8080");
});
