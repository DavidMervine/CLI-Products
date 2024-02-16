import { readDatabase } from '../Data/import_db.js';

let products = readDatabase("./data/db.txt");

// read info on ONE product, by its ID
// build a FUNCTION that can be called by other parts of your program, when you need info on a product

export function getProductByID(id) {
    var product_match = false;
    for (let i = 0; i < products.length; i++) {
        if(products[i].id == id) {
            product_match = true;
            return products[i];
        }
    }
    if(!product_match) { 
        return {};
    }
}

// read info on ALL products
export function getAllProducts() {
    return products;
}