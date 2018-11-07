var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
  
    port: 3306,
  
    user: "root",
  
    // important X files reference
    password: "Trustnoone1!",
    database: "bamazon_DB"
  });

//make connection
connection.connect(function(err) {
    if (err) throw err;
    //initial prompt
    start();
  });

 var chosen;
function start() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        // prompt on what item user would like to purchase
        inquirer
          .prompt([
            {
              name: "choice",
              type: "list",
              // fill list with DB products
              choices: function() {
                var choiceArray = [];
                for (var i = 0; i < results.length; i++) {
                  choiceArray.push(results[i].product_name);
                }
                return choiceArray;
              },
        message: "What product would you like to buy?",
      }])
      .then(function(answer) {
          // sets variable outside of function so that we can use it in other functions w/o scope issues
            chosen = answer.choice;
          Quantity();
      });
    })
  };

function Quantity() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        //prompt for quantity to purchase
        inquirer
            .prompt([
                {
                    name: "quantity",
                    type: "input",
                    message: "How many would you like to buy?",
                }])
            .then(function (answer) {
                // get reference to the database listing of the chosen product
                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].product_name === chosen) {
                        chosenItem = results[i];
                    }
                }

                // determine if there is sufficient stock to fulfill order
                if (chosenItem.stock_quantity > parseInt(answer.quantity)) {
                    // update quantity in DB
                    var newStock = parseInt(chosenItem.stock_quantity - parseInt(answer.quantity));
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: newStock
                            },
                            {
                                item_id: chosenItem.item_id
                            }
                        ],
                        function (error) {
                            if (error) throw err;
                        }
                    );
                    console.log("Product purchased successfully!");
                    // show cutomer total cost of purchase
                    var price = chosenItem.price * parseInt(answer.quantity);
                    console.log("Total Cost: $" + price);
                    start()
                }
                else {
                    // bid wasn't high enough, so apologize and start over
                    console.log("Insufficient Quantity");
                    // I didn't include a close connection since we always restart
                    start();
                }
            });
    })
};