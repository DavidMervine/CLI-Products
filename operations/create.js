import { createRequire } from 'module'
const require = createRequire(import.meta.url);

import { readDatabase } from '../Data/import_db.js';
const { Sequelize } = require('sequelize');


import { dbconfig } from '../Data/db.config.js';

//make a sequlize instance
const sequelize = new Sequelize(dbconfig.DB, dbconfig.USER, dbconfig.PASSWORD,{
    host: dbconfig.HOST,
    dialect: dbconfig.dialect,
})

// take details of new product (as a JS object), turn them into a string, 
// then append that string to our db.txt file
//import { readDatabase, readDatabasesimple } from '../Data/import_db.js';
//import fs from 'fs';

//let products = readDatabase("./data/db.txt");
//let highestID = readDatabasesimple("./data/highest_id.txt");

// export function createProduct(product) {
//     var newObj = Object.values(highestID);
//     product.id = Number(newObj) + 1;
//     // build code that will read highest_id.txt get value and use it here when need new id number
//     // append new product to db.txt
//     fs.appendFile("./data/db.txt", "\n" + JSON.stringify(product), null, function(){})
//     fs.writeFile("./data/highest_id.txt", '{ "id":' + " "+ product.id + " }", null, function(){})
// }

export async function createProduct(product) {
    try {
        const [results, metadata] = await sequelize.query("insert into products (price, sku, name, quantity, description) values ("+product.price+",'"+product.sku+"','"+product.name+"',"+product.quantity+",'"+product.description+"')"+";")
        console.log(results);
    } catch (error) {
        console.log("Unable to connect, error:"+ error)
    }
}
//}