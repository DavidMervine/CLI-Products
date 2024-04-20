import { readDatabase } from '../Data/import_db.js';
import fs from 'fs';

let products = readDatabase("./data/db.txt");

export function removeProductById(id) {
    let product_match = false;
    let tempArray = products;
    //loop through product data
    for(let i=0; i < products.length; i++) {
        if(products[i].id==id) {
            product_match = true;
            tempArray.splice(i, 1);
            fs.writeFile("./data/db.txt", "", function(){})
            //loop through temp array
            for(let i = 0; i < tempArray.length; i++) {
                // for each item convert to json string then write that string to db.txt
                let obj = JSON.stringify(tempArray[i]);
                fs.appendFile("./data/db.txt", obj+"\n", err => {if(err) console.error(err)})
            }
            return tempArray;

        }
    }
    // if no match, return empty object
    if(!product_match) {
        return {};
    }
}
