const express = require("express");
const app = express();
const mercadopago = require("mercadopago");
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(express.static("public"));
const formidable = require("express-formidable");

app.use(formidable());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

mercadopago.configure({
  access_token:
    "APP_USR-455170933943540-121515-264e060c6c698bb50d38c524499ae8fa-1039995700",
});

app.post("/checkout", (req, res) => {
  res.statusCode = 200;
  res.send(JSON.stringify(req.fields));
  res.end(req.fields);
  console.log(req.fields);

  let preference = {
    items: JSON.parse(req.fields),
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      console.log(response.body);
      res.redirect(response.body.init_point);
    })
    .catch(function (error) {
      console.log(error);
    });
});


app.listen(4040, () => {
  console.log("server on port 4040");
});
