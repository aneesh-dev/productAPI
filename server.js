const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise; //to make data accebality all over the application not to be defined to this file

const config = require('./DB.js');
// bodyparser will handle the post and put request with db or help us to read post and put
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = 4000;


//Cross origin Resource sharing => handling port block error
const cors = require('cors');
app.use(cors());

const proRoutes = require('./product.route');


mongoose.connect(config.DBname, { useNewUrlParser: true })
    .then((res) => {
        console.log('Database successfully connected..');
    },
        (err) => {
            console.log(err);
        });

//setting up primary route
app.use('/product', proRoutes);

app.listen(PORT, function () {
    console.log('server is running on url http://localhost:4000/product');
});
