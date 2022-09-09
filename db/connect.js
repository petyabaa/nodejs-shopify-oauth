const mongoose = require('mongoose')
require('dotenv').config();
const { MONGODB_IP, MONGODB_PORT } = process.env;

mongoose.connect('mongodb://' + MONGODB_IP + ':' + MONGODB_PORT + '/shopify-oauth', {
    useNewUrlParser: true
})