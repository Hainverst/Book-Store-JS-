const Product = require("./Product");

module.exports = class Book extends Product {
    constructor(title, sinopse, genre, pages, author, description, price, inStock = 0){
        super(`Livro: ${title}`, description, price, inStock)
        this.title = title 
        this.sinopse = sinopse
        this.genre = genre
        this.pages = pages
        this.author = author
    }
}