const Database = require("./Database")
const Author = require("./entities/Author")
const Book = require("./entities/Book")
const Order = require("./entities/Order")
const Posters = require("./entities/Posters")
const User = require("./entities/User")

module.exports = class App {
    static #database = new Database()
    //USUÁRIOS
    createUser(name, email, password) {
        const user = new User(name, email, password)
        App.#database.saveUser(user)
    }

    getUsers(){
       return App.#database.find('users')
    }
    //AUTORES
    createAuthor(name, nationality, bio) {
        const author = new Author (name, nationality, bio)
        App.#database.saveAuthor(author)
    }

    getAuthors() {
        return App.#database.find('authors')
    }
    //LIVROS
    createBook(title, sinopse, genre, pages, author, description, price, inStock) { 
        const book = new Book(title, sinopse, genre, pages, author, description, price, inStock)
        App.#database.saveBook(book)
    }

    addBook(bookName, quantity) {
        App.#database.addBooksToStock(bookName, quantity)
    }

    getBooks() {
        return App.#database.find('books')
      }
    //POSTERS
    createPoster(name, description, height, width, price, inStock) { 
        const poster = new Posters( name, description, height, width, price, inStock)
        App.#database.savePoster(poster)
    }

    addPoster(posterName, quantity) {
        App.#database.addPostersToStock(posterName, quantity)
    }

    getPosters() {
        return App.#database.find('posters')
      }
    //PEDIDOS
    createOrder(items, user) {
        const order = new Order(items, user)
        App.#database.saveOrder(order)
        order.data.items.forEach(({ product, quantity }) => {
            if (product instanceof Book ) {
                App.#database.removeBooksFromStock(product.name, quantity)
            } else if ( product instanceof Posters) {
                App.#database.removePostersFromStock(product.name, quantity)
            }
        })      
     }; 
     
     getOrders(){
       return App.#database.find('orders')
     }

     showDatabase(){
        App.#database.showStorage()
     }
 }


