const express = require('express');
const app = express();
const mercadopago = require('mercadopago');
const bodyParser = require('body-parser');
const cors = require('cors')
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}))

app.use(cors())

mercadopago.configure({
    access_token: 'APP_USR-455170933943540-121515-264e060c6c698bb50d38c524499ae8fa-1039995700'
});


app.post('/checkout', (req, res) => {
    console.log(req.body)

    let preference = {
        items: JSON.parse(req.body.items)
      };
      
      mercadopago.preferences.create(preference)
        .then(function(response) {
            response.body.back_urls.success = 'http://localhost:3000/success'
            response.body.back_urls.failure = 'http://localhost:3000/success'
            response.body.back_urls.pending = 'aqui va la url de la pagina de pendiente'
            response.body.redirect_urls.success = 'http://localhost:3000/success'
            response.body.auto_return= "approved"
            console.log(response.body)
            res.redirect(response.body.init_point)
        }).catch(function(error) {
            console.log(error)
        })
})

app.listen(8080, () =>{ console.log('server on port 8080')})