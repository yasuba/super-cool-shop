##Shopping Cart

A responsive store front displaying various products. The items can be added to the shopping cart, which keeps track of the price and number of items added. Items can be removed, updating the item count and total price.

At the checkout, a discount voucher can be added - either £5 off, £10 off an order of £50 or more, or £15 off and order of £75 or more than includes footwear.

An item cannot be added if it is out of stock.

###Technologies

*Javascript
*jQuery
*Node.js
*Express
*Jasmine for testing

###Run the app

To see the store, first you need to install Node.js. Next, clone this repository, cd into it then run npm install.

    git clone git@github.com:yasuba/super-cool-shop.git
    cd super-cool-shop
    npm install

Once all the dependencies are installed:

    node server.js

###Run the tests

    open SpecRunner.html