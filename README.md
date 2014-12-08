##Shopping Cart

A responsive store front displaying various products from six different categories: mens footwear, mens formalwear, mens casualwear, womens footwear, womens formalwear and womens casualwear. The items can be added to the shopping cart, which keeps track of the price and number of items added. Items can be removed, updating the item count and total price.

At the checkout, a discount voucher can be added - either £5 off, £10 off an order of £50 or more, or £15 off an order of £75 or more than includes footwear.

An item cannot be added if it is out of stock.

###Technologies

* Javascript
* jQuery
* JSON
* Node.js
* Express
* Bootstrap
* Jasmine for testing

I stored the product data with JSON rather than hardcoding it into the HTML. I used Node.js simply as the server for my HTML and Express for my framework, which allowed me to use EJS templates, allowing me to pass data from my JSON to my views.

I used Bootstrap to help me style my views, but had to add in a little extra styling (in the main.css file). In here I've included a media query for viewports smaller than 600px wide. This was to prevent my header getting squashed on smaller devices.

###Run the app

To see the store, first you need to install Node.js. Next, clone this repository, cd into it then run npm install.

    git clone git@github.com:yasuba/super-cool-shop.git
    cd super-cool-shop
    npm install

Once all the dependencies are installed:

    node server.js

Then point your browser to localhost:8001

###Run the tests

    open SpecRunner.html

###File structure

The Node server is in the server.js file at the top of the tree. Javascript functions can be found in the public/javascript folder - these consist of the ShoppingCart.js, the Voucher.js and an interface.js.

My HTML is in the views folder and is separated into the index.ejs and two partials - the header and main. 

The CSS is in the public/css folder.
