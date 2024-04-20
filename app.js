/*
purpose of our application:
Allow a user to create, read, edit and delete products from a collection of products
We will prompt a user for the desired operation, and then perform it
what "concerns" will we have?
1. Data access
2. US concerns (prompting user for inputl presenting output)
3. Create/Edit/Delete data
*/
import { createRequire } from 'module'
const require = createRequire(import.meta.url);


var prompt = require('prompt');

import { readDatabase } from "./Data/import_db.js";
import { getAllProducts, getProductByID } from "./operations/read.js"; //complete
import { removeProductById } from "./operations/delete.js";
import { createProduct } from './operations/create.js'; //IP
import { updateProductByID } from './operations/update.js';


prompt.start();

console.log("Pick from the following operations:");
console.log("A: List all products.");
console.log("I: Find individual product by ID.");
console.log("D: Delete individual product by ID.");
console.log("C: Create a new product");
console.log("U: Update a product by ID");


prompt.get(['operation'], function(err, result) {
    switch(result.operation) {
        case "A":
            console.log(getAllProducts());
            break;
        case "I":
            prompt.get(['id'], function(err, result){
                var product = getProductByID(result.id);
                console.log(product)
            })
            break;
        case "D":
            prompt.get(['id'], function(err, result){
                var product = removeProductById(result.id);
                console.log(product);
            })
            break;
        case "C":
            prompt.get(['price', 'sku', 'name', 'quantity', 'description'], function(err, result){
                let product = {
                    // use the user input to create this new product object that we are going to pass into the createProduct()
                    price: Number(result.price),
                    sku: Number(result.sku),
                    name: result.name,
                    quantity: Number(result.quantity),
                    description: result.description
                };
                var result = createProduct(product);
                console.log(product);
            })
            break;
        case "U":
            prompt.get(['id'], function(err, result){
                var product = updateProductByID(result.id);
                console.log(product)
            })
            break;
        default:
            console.log("Please enter a valid opperation code.")
            break;
    }
});

