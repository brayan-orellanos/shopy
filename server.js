const express = require('express');
const app = express();
const mercadopago = require('mercadopago');
const bodyParser = require('body-parser');
const cors = require('cors')
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}))

app.use(cors())

mercadopago.configure({
    access_token: 'APP_USR-6249215249475482-011101-9508ee70921b793c14d2290b4663a499-1049161943'
});


app.post('/checkout', (req, res) => {
    console.log(req.body)

    let additional_info = {
         phone: {
            area_code: "57",
            number: 3002416732
        },
        address: {
            street_name: "ciudad de Bucaramanga barrio cristal alto calle 128 carrera 54 n° 03",
            street_number: 1234,
            zip_code: "570000"
        },
        email: "usernumero245887@email.com",
        identification: {
            number: "1099377508",
            type: "C.C"
        },
        name: "francisco arturo",
        surname: "orellanos",
    }

    let preference = {
        items: JSON.parse(req.body.items),
        external_reference: "123456789",
        payer: {
            id: "123",
            phone: {
                area_code: "57",
                number: 3002416732
            },
            address: {
                street_name: "Bucaramanga calle 128 n° 03",
                street_number: 123,
                zip_code: "5700"
            },
            email: "user@email.com",
            identification: {
                number: "1099377508",
                type: "C.C"
            },
            name: "user-name",
            surname: "user-surname",
        },

        additional_info: JSON.stringify(additional_info),

        client_id: 123,

        back_urls: {
            success: 'http://localhost:3000/success',
            failure: 'http://localhost:3000/success',
            pending: 'http://localhost:3000/success'
        },

        default_payment_method_id: null,
        default_installments: null
    };

    // console.log(JSON.stringify('mercadopago:'+JSON.stringify(mercadopago.preferences)))

    mercadopago.preferences.payer = additional_info
      
    mercadopago.preferences.create(preference)
        .then(function(response) {
            // response.body.auto_return= "approved"
            // console.log('response' + JSON.stringify(response))

            response.body.default_payment_method_id = null
            response.body.default_installments = null

            // console.log('body'+JSON.stringify(response.body))
            res.redirect(response.body.init_point)
        }).catch(function(error) {
            console.log(error)
        })

})

app.listen(8080, () =>{ console.log('server on port 8080')})





