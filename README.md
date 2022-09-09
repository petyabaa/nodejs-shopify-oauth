# Hi.
This app will perform you Shopify OAuth **without** the official shopify-api-node package. This app Express, MongoDB instead.

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

For any more info don't hesitate to contact me.
Petyabaa