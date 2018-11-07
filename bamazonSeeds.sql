USE bamazon_DB;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Glassware Cups Set", "Home Goods", 39.99, 45),
("Plaid Pajama Pants", "Apparel", 14.99, 22),
("Rose Lip Balm", "Beauty Products", 6.99, 15),
("Inkjet Printer", "Electronics", 149.99, 30),
("Bluetooth Headphones", "Electronics", 50.00, 25),
("Queen Sheet Set", "Home Goods", 44.99, 12),
("Fleece Jacket", "Apparel", 27.99, 44),
("Face Primer", "Beauty Products", 18.99, 34),
("Tea Towels", "Home Goods", 9.99, 60),
("Fuzzy Slippers", "Home Goods", 19.99, 20);

SELECT*FROM products;