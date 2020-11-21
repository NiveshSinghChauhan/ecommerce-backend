const bodyParser = require('body-parser');
const express = require('express');
const { connect: connectDB } = require('mongoose');
const PORT = 3000;
const DB_URI = 'mongodb://localhost:27017/demoEcommerce'

const rootRoute = require('./routes');


require('dotenv').config();


const server = async () => {
    await connectDB(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    const app = express();

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.use('/', rootRoute);

    app.listen(PORT, () => {
        console.log(`server started at ${PORT}`)
    });
}

try {
    server();
} catch (error) {
    console.log(error);
    process.exit();
}