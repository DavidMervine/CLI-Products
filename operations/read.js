import { createRequire } from 'module'
const require = createRequire(import.meta.url);

//import { readDatabase } from '../Data/import_db.js';
const { Sequelize } = require('sequelize');
import { dbconfig } from '../Data/db.config.js';

//make a sequlize instance
const sequelize = new Sequelize(dbconfig.DB, dbconfig.USER, dbconfig.PASSWORD,{
    host: dbconfig.HOST,
    dialect: dbconfig.dialect,
})

//change to connect to actual database to get all products
//let products = readDatabase("./data/db.txt");

// read info on ONE product, by its ID
// build a FUNCTION that can be called by other parts of your program, when you need info on a product

// export function getProductByID(id) {
//     var product_match = false;
//     for (let i = 0; i < products.length; i++) {
//         if(products[i].id == id) {
//             product_match = true;
//             return products[i];
//         }
//     }
//     if(!product_match) { 
//         return {};
//     }
// }


export async function getProductByID(id) {
    try {
        const [results, metadata] = await sequelize.query("SELECT * from products where id="+id+";")
        console.log(results);
    } catch (error) {
        console.log("Unable to connect, error:"+ error)
    }
}

// read info on ALL products
export async function getAllProducts() {
    try {
        const [results, metadata] = await sequelize.query("SELECT * from products;")
        console.log(results);
    } catch (error) {
        console.log("Unable to connect, error:"+ error)
    }
}