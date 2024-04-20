// take details of new product (as a JS object), turn them into a string, 
// then append that string to our db.txt file
import { readDatabase, readDatabasesimple } from '../Data/import_db.js';
import fs from 'fs';

let products = readDatabase("./data/db.txt");
let highestID = readDatabasesimple("./data/highest_id.txt");

export function createProduct(product) {
    var newObj = Object.values(highestID);
    product.id = Number(newObj) + 1;
    // build code that will read highest_id.txt get value and use it here when need new id number
    // append new product to db.txt
    fs.appendFile("./data/db.txt", "\n" + JSON.stringify(product), null, function(){})
    fs.writeFile("./data/highest_id.txt", '{ "id":' + " "+ product.id + " }", null, function(){})
}