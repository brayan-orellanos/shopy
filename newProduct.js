const express = require("express");
const fileupload = require("express-fileupload");
const fs = require("fs");
const cors = require("cors");
const { join } = require("path");
const app = express();

app.use(
  fileupload({
    limits: { fileSize: 20 * 1024 * 1024 },
    createParentPath: true,
    responseOnLimit: "El archivo es demasiado pesado"
  })
);
app.use(express.static("files"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.get("/", function (req, res) {
  console.log(res.files);
});

app.post("/create", async (req, res) => {
  const newpath = __dirname + "/src/image/";

  console.log(req.body);

  if (req.files) {
    if (req.files.imagesDropzone) {
      const imagesDropzone = req.files.imagesDropzone;

      if (imagesDropzone.length >= 2) {
        for (let i = 0; i < imagesDropzone.length; i++) {
          let filename = imagesDropzone[i].name;
          imagesDropzone[i].mv(`${newpath}${filename}`, (err) => {
            if (err) {
              console.log(err);
              res.status(500);
            }
            res.status(200);
          });
        }
      } else {
        let filename = imagesDropzone.name;
        imagesDropzone.mv(`${newpath}${filename}`, (err) => {
          if (err) {
            console.log(err);
            res.status(500);
          }
          res.status(200);
        });
      }
    }

    if (req.files.imagen) {
      const imagen = req.files.imagen;
      if (imagen.length >= 2) {
        for (let i = 0; i < imagen.length; i++) {
          const filename = imagen[i].name;
          imagen[i].mv(`${newpath}${filename}`, (err) => {
            if (err) {
              console.log(err);
              res.status(500);
            }
            res.status(200);
          });
        }
      } else {
        let filename = imagen.name;
        imagen.mv(`${newpath}${filename}`, (err) => {
          if (err) {
            console.log(err);
            res.status(500);
          }
          res.status(200);
        });
      }
    }
  }

  // console.log(req);

  res.statusCode = 200;
  res.send(JSON.stringify(req.body));
  res.end(req.data);

  const jsonProducts = fs.readFileSync("users.json", "utf-8");
  // console.log(jsonProducts);
  const product = JSON.parse(jsonProducts);

  const { nombre, precio, categoria, colors, images, descripcion } = req.body;

  let newProduct = {
    nombre,
    precio,
    categoria,
    colors,
    images,
    descripcion
  };

  product.push(newProduct);

  const listProduct = JSON.stringify(product);

  fs.writeFileSync("users.json", listProduct, "utf-8");

  // console.log(req.body);
});

app.listen(4242, () => {
  console.log("server on port 4242");
});
