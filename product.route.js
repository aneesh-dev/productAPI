const express = require('express');
const app = express();
//create object refrence for express
const proRoutes = express.Router();

//import model
let Product = require('./product.model');


//get request
proRoutes.route('/').get(function (req, res) {
    Product.find(function (err, response) {
        if (err) {
            console.log(err);
        } else {
            res.json(response);
        }
    });
});


//post request
proRoutes.route('/add').post(function (req, res) {
    //const to receive ppost data from front end
    let pro = new Product(req.body);

    pro
        .save()
        .then(myres => {
            res.status(200).json({ 'product': 'product added successfully' })
        })
        .catch(err => {
            res.status(400).send('unable to save value in Database');
        });
});

//get request with refrence
proRoutes.route('/edit/:id').get(function (req, res) {
    let id = req.params.id;
    Product.findById({ _id: id }, function (err, response) {
        res.json(response);
    });

});

//update request
proRoutes.route('/update/:id').put(function (req, res) {
    let id = req.params.id;
    Product.findById({ _id: id }, function (err, data) {
        if (!data) {
            res.status(400).send("No data found...");
        } else {
            data.title = req.body.title;
            data.price = req.body.price;
            data.image = req.body.image;
            data.description = req.body.description;

            data.save()
                .then(mydata => {
                    res.status().send({ response: "'successfully updated " });
                }).catch(err => {
                    res.status(400).send('unable to update the database');
                });
        }
    });
});

//delete product
proRoutes.route('/delete/:id').delete(function (req, res) {
    let id = req.params.id;

    Product.findByIdAndDelete({ _id: id }, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.status(200).send({ response: 'successfully deleted the product' });
        }
    });
});

module.exports = proRoutes;