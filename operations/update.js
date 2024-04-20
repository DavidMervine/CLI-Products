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
var prompt = require('prompt');
import { getProductByID } from './read.js';

// let products = readDatabase("./data/db.txt");

// export function updateProductByID(id) {
    // let currentProduct = getProductByID(id);

    // console.log("Details for product id " + id + ":");
    // console.log("Price: " + currentProduct.price);
    // console.log("Sku: " + currentProduct.sku);
    // console.log("Name: " + currentProduct.name);
    // console.log("Quantity: " + currentProduct.quantity);
    // console.log("Description: " + currentProduct.description);

    // console.log("Please enter the new product.");
    // prompt.get(['price', 'sku', 'name', 'quantity', 'description'], function (err, result) {

    //     let product = {

    //         price: (result.price == "") ? currentProduct.price : Number(result.price),
    //         sku: (result.sku == "") ? currentProduct.sku : Number(result.sku),
    //         name: (result.name == "") ? currentProduct.name : result.name,
    //         quantity: (result.quantity == "") ? currentProduct.quantity : Number(result.quantity),
    //         description: (result.description == "") ? currentProduct.description : result.description,

    //     };

//     //remove the current entry in db.txt
//     //deleting the product
//     let updatedProducts = removeProductById(id);     
//     //add the edited entry to db.txt
//     product.id = Number(id);
//     fs.appendFile('./data/db.txt', "\n" + JSON.stringify(product), null, function () {});
//     return products;

//     })


// }

export async function updateProductByID(id) {
    let currentProduct = getProductByID(id);

    console.log("Details for product id " + id + ":");
    console.log("Price: " + currentProduct.price);
    console.log("Sku: " + currentProduct.sku);
    console.log("Name: " + currentProduct.name);
    console.log("Quantity: " + currentProduct.quantity);
    console.log("Description: " + currentProduct.description);

    console.log("Please enter the new product.");
    prompt.get(['price', 'sku', 'name', 'quantity', 'description'], async function (err, result) {

        let product = {

            price: (result.price == "") ? currentProduct.price : Number(result.price),
            sku: (result.sku == "") ? currentProduct.sku : Number(result.sku),
            name: (result.name == "") ? currentProduct.name : result.name,
            quantity: (result.quantity == "") ? currentProduct.quantity : Number(result.quantity),
            description: (result.description == "") ? currentProduct.description : result.description,

        };
    try {
        const [results, metadata] = await sequelize.query("update products set price = "+product.price+" , sku = "+product.sku+" , name = "+product.name+", quantity = "+product.quantity+", description = "+product.description+" where id="+id+";")
        console.log(results);
    } catch (error) {
        console.log("Unable to connect, error:"+ error)
    }
    })
}