import { createRequire } from 'module'
const require = createRequire(import.meta.url);


var prompt = require('prompt');


import { readDatabase } from '../Data/import_db.js';
import { getProductByID } from './read.js';
import { removeProductById } from './delete.js';
import fs from 'fs';

let products = readDatabase("./data/db.txt");

export function updateProductByID(id) {
    let currentProduct = getProductByID(id);

    console.log("Details for product id " + id + ":");
    console.log("Price: " + currentProduct.price);
    console.log("Sku: " + currentProduct.sku);
    console.log("Name: " + currentProduct.name);
    console.log("Quantity: " + currentProduct.quantity);
    console.log("Description: " + currentProduct.description);

    console.log("Please enter the new product.");
    prompt.get(['price', 'sku', 'name', 'quantity', 'description'], function (err, result) {

        let product = {

            price: (result.price == "") ? currentProduct.price : Number(result.price),
            sku: (result.sku == "") ? currentProduct.sku : Number(result.sku),
            name: (result.name == "") ? currentProduct.name : result.name,
            quantity: (result.quantity == "") ? currentProduct.quantity : Number(result.quantity),
            description: (result.description == "") ? currentProduct.description : result.description,

        };

    //remove the current entry in db.txt
    //deleting the product
    let updatedProducts = removeProductById(id);     
    //add the edited entry to db.txt
    product.id = Number(id);
    fs.appendFile('./data/db.txt', "\n" + JSON.stringify(product), null, function () {});
    return products;

    })


}