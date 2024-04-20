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

// let products = readDatabase("./data/db.txt");

// export function removeProductById(id) {
//     let product_match = false;
//     let tempArray = products;
//     //loop through product data
//     for(let i=0; i < products.length; i++) {
//         if(products[i].id==id) {
//             product_match = true;
//             tempArray.splice(i, 1);
//             fs.writeFile("./data/db.txt", "", function(){})
//             //loop through temp array
//             for(let i = 0; i < tempArray.length; i++) {
//                 // for each item convert to json string then write that string to db.txt
//                 let obj = JSON.stringify(tempArray[i]);
//                 fs.appendFile("./data/db.txt", obj+"\n", err => {if(err) console.error(err)})
//             }
//             return tempArray;

//         }
//     }
//     // if no match, return empty object
//     if(!product_match) {
//         return {};
//     }
// }


export async function removeProductById(id) {
    try {
        const [results, metadata] = await sequelize.query("Delete from products where id="+id+";")
        console.log(results);
    } catch (error) {
        console.log("Unable to connect, error:"+ error)
    }
}