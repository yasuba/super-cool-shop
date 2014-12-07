describe("ShoppingCart", function() {
  var cart;
  var voucher;

  beforeEach(function() {
    cart = new ShoppingCart();
    shoes = {"name": "Almond Toe Court Shoes - Patent Black",
        "category": "Womens footwear",
        "price": 99,
        "quantity": 5};
    shirt = {
        "name": "Fine Stripe Short Sleeve Shirt - Grey",
        "category": "Mens casualwear",
        "price": 49.99,
        "quantity": 9};
    shoes2 = {"name": "Almond Toe Court Shoes - Patent Black",
        "category": "Womens footwear",
        "price": 99,
        "quantity": 4};
    shoes3 = {"name": "Almond Toe Court Shoes - Patent Black",
        "category": "Womens footwear",
        "price": 99,
        "quantity": 0};
    voucher = new Voucher('voucher', 'fiver', -5.00);
    voucher2 = new Voucher('voucher', 'tenner', -10.00);
    voucher3 = new Voucher('voucher', 'fifteen', -15.00);
  });

  it("can have products added to it", function() {
    cart.add(shoes);
    expect(cart.contents).toContain(shoes);
  });

  it("can have products removed from it", function(){
    cart.add(shoes);
    cart.remove(shoes);
    expect(cart.contents).not.toContain(shoes);
  });

  it("can add up the prices of products inside it", function(){
    cart.add(shoes);
    cart.add(shirt);
    expect(cart.balance()).toEqual(148.99);
  });

  it("can apply a voucher to items inside it", function(){
    cart.add(shoes);
    cart.add(voucher);
    expect(cart.balance()).toEqual(94.00);
  });

  it("only allows orders above £50 to add the £10 voucher", function(){
    cart.add(shirt);
    expect(function(){cart.add(voucher2);}).toThrow(new Error("Your order must be over £50"));
  });

  it("only allows orders above £75 that includes shoes to add the £15 voucher", function(){
    cart.add(shirt);
    expect(function(){cart.add(voucher3);}).toThrow(new Error("You must have bought at least one footwear item and spent over £75"));
  });

  it("can check the stock level of a product", function(){
    expect(cart.checkStock(shoes2)).toEqual(4);
  });

  it("can reduce the stock level when a product is bought", function(){
    cart.add(shoes2);
    expect(cart.checkStock(shoes2)).toEqual(3);
  });

  it("doesn't allow out of stock items to be added", function(){
    expect(function(){cart.add(shoes3);}).toThrow(new Error("That item is out of stock"));
  });

  it("can know what categories it has", function(){
    cart.add(shoes);
    cart.add(voucher);
    expect(cart.categories()).toEqual(["Womens footwear","voucher"]);
  });

});