const mongoose = require('mongoose')


const Oauth = mongoose.model('Oauth', {
    access_token: {
        type: String,
        required: true
    },
    shop: {
        type: String,
        required: true
    }
})

module.exports = Oauth