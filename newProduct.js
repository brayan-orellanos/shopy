const express = require("express");
const fileupload = require('express-fileupload');
const fs = require("fs");
const cors = require("cors");
const app = express();
app.use(fileupload());
app.use(express.static("files"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(cors())


app.post("/create", (req, res) => {
  const newpath = __dirname + "/src/images/";
  const file = req.files.file;
  const filename = file.name;
 
  file.mv(`${newpath}${filename}`, (err) => {
    if (err) {
      console.log(err)
      res.status(500);
    }
    res.status(200);
  });

  console.log(req)  


  res.statusCode = 200;
  res.send(JSON.stringify(req.body));
  res.end(req.data);


  const jsonProducts = fs.readFileSync("users.json", "utf-8");
  console.log(jsonProducts)
  const product = JSON.parse(jsonProducts);

  const { nombre, precio, categoria, colors, images, descripcion } = req.body;

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

  console.log(req.body);
});

app.listen(8080, () => {
  console.log("server on port 8080");
});
