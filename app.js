const crypto = require('crypto');
const express = require('express');
const app = express();
const nonce = [...Array(12)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')
require('dotenv').config();
require('./db/connect')
const Oauth = require('./model/shopify-oauth')

const { API_KEY, API_SECRET_KEY, SCOPES, HOST, PORT } = process.env;

app.get('/', async (req, res) => {
    const oauth = await Oauth.find({ shop: req.query.shop })
    if (oauth.length == 0) {
        return res.redirect('/auth?shop=' + req.query.shop);
    }
    res.send('Hello Authenticated World!')
});

app.get('/auth', async (req, res) => {
    const shop = req.query.shop
    const access_mode = 'per-user'
    const redirect_uri = HOST + '/auth/callback'
    const oauth_url = 'https://' + shop + '/admin/oauth/authorize?client_id=' + API_KEY + '&scope=' + SCOPES + '&redirect_uri='+ encodeURIComponent(redirect_uri) +'&state=' + nonce + '&grant_options[]=' + access_mode
    res.redirect(oauth_url);
});

app.get('/auth/callback', async (req, res) => {
    const url_params = req.query
    const hmac = url_params.hmac
    delete url_params.hmac
    const shop = url_params.shop
    let params = new URLSearchParams(url_params)
    params = params.toString()
    const hash = crypto.createHmac('sha256', API_SECRET_KEY).update(params)
    const new_hmac = hash.digest('hex')

    // Security checks
    if (hmac == new_hmac && url_params.state == nonce && /^[a-zA-Z0-9][a-zA-Z0-9\-]*.myshopify.com/.test(shop)) {
        const request = await require('postman-request')
        const endpoint = 'https://' + shop + '/admin/oauth/access_token?client_id=' + API_KEY + '&client_secret=' + API_SECRET_KEY + '&code=' + url_params.code

        request({
            method: 'POST',
            url: endpoint,
        }, async (error, {body}) => {
            if (error) {
                return res.send(error)
            }
            const oauth = new Oauth({
                access_token: JSON.parse(body).access_token,
                shop
            })
            try {
                await oauth.save()
                await res.redirect('/')
            } catch (e) {
                res.status(400).send(e)
            }
        })

    } else {
        // If dont pass the checks send back error 400 status code
        res.status(400).send('Do not attack me :(')
    }
});

app.listen(PORT, ()=> {
    console.log('SERVER LIVE ON PORT ' + PORT)
})
