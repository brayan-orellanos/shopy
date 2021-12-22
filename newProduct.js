const express = require("express");
const formidable = require("express-formidable");
// const FormData = require("form-data");
const fs = require("fs");
// const fileUpload = require("express-fileupload");
// const morgan = require("morgan");
const app = express();
const cors = require("cors");
const multer = require('multer');
const path = require('path')
app.use(express.static("public"));
// const router = express.Router();
// const bcrypt = require("bcryptjs");
// const { check, validationResult } = require("express-validator");
// const moment = require('moment');
// const jwt = require('jwt-simple');

// const { User } = require("../../db");
app.use(formidable());

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

const diskstorage = multer.diskStorage({
  destination: path.join(__dirname, './images'),
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

app.use(cors(corsOptions))

const fileUpload = multer({
  storage: diskstorage
}).single('picture')

// app.use(fileUpload({
//   createParentPath: true
// }))

app.post("/createProduct", fileUpload, async (req, res) => {
  res.statusCode = 200;
  res.send(JSON.stringify(req.fields));
  res.end(req.data);

  console.log(req.file)



  // try {
  //   if(!req.files) {
  //     res.send({
  //       status: false,
  //       message: "no hay archivos"
  //     })
  //   } else {
  //     const {picture} = req.files

  //     picture.mv("./assets" + picture.name)

  //     res.send({
  //       status:true,
  //       message: "el archivo se ha cargado"
  //     })
  //   }
  // } catch(err) {
  //   res.status(500).send(err)
  // }

  // console.log(req)

  const jsonProducts = fs.readFileSync("users.json", "utf-8");
  const product = JSON.parse(jsonProducts);

  const { nombre, precio, categoria, colors, images, descripcion } = req.fields;

  let newProduct = {
    nombre,
    precio,
    categoria,
    colors,
    images,
    descripcion,
  };

  product.push(newProduct);

  const listProduct = JSON.stringify(product);

  fs.writeFileSync("users.json", listProduct, "utf-8");

  console.log(req.fields);
});

app.listen(8080, () => {
  console.log("server on port 8080");
});
