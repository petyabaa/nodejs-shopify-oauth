# Hi.
This app will perform you Shopify OAuth **without** the official shopify-api-node package. This app Express, MongoDB instead. 
This app walks through the [manual](https://shopify.dev/apps/auth/oauth/getting-started) authorization progress.

## Important!
This package will only work if you make your own .env file in the project folder.

Example:

```
API_KEY= # Your Shopify API Key, you can discover by the Shopify Partner Admin
API_SECRET_KEY= # Your Shopify API Key, you can discover by the Shopify Partner Admin
SCOPES=read_products,write_products,read_orders,write_orders # If you need less, more, or other access scope, modify this part
HOST= # Your NGROK or production hostname with protocol
PORT= # Your NGROK or production port, example: 3000
MONGODB_IP=127.0.0.1 # Your MongoDB server's IP
MONGODB_PORT=27017  # Your MongoDB server's port
```

### To use this app, you should follow this steps:
1. Install Node.JS with NPM
2. Use ```npm install``` to collect all the necessary dependencies
3. Setup a MongoDB server
4. Setup the App & Redirection URLs on your app's setup page in your Shopify Partner area. The necessary redirection URLs are {App URL}/auth and {App URL}/callback
5. For testing purposes you could use ```npm run dev```. It will use nodemon instead of node. For production you should use ```npm run start```
6. Enjoy the authenticated Shopify World! Now you could make any REST of GraphQL request into the Shopify. 
The only thing that you need is the access token, which will be saved into your MongoDB database. The db name is: shopify-oauth


For any more info don't hesitate to contact me.
Petyabaa