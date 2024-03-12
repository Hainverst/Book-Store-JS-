const Order = require("./entities/Order")

module.exports = class Database { 
    #storage = {
        authors: [],
        books: [],
        posters: [],
        orders: [],
        users: [],
    }
    //Encontra uma chave do objeto #storage
    find(key) {
        return this.#storage[key]
    }
    //salvar um autor
    saveAuthor(author) {
        this.#storage.authors.push(author)
    }
    //LIVROS
    findBookByName( bookName ) {
       return this.#storage.books.find( b => b.name === bookName)

    }

    saveBook (book) {
        const bookExists = this.findBookByName(book.name)
        if (!bookExists) {
            this.#storage.books.push(book)
        }
    }

    addBooksToStock(bookName, quantity) {
        const book = this.findBookByName(bookName)
        book?.addToStock(quantity)
    }

    removeBooksFromStock(bookName, quantity) {
        const book = this.findBookByName(bookName)
        book?.removeFromStock(quantity)
    }
    // POSTERS
    findPosterByName( posterName ) {
        return this.#storage.books.find( p => p.name === posterName)
 
     }
 
     savePoster (poster) {
         const posterExists = this.findPosterByName(poster.name)
         if (!posterExists) {
             this.#storage.posters.push(poster)
         }
     }
 
     addPostersToStock(posterName, quantity) {
         const poster = this.findPosterByName(posterName)
         poster?.addToStock(quantity)
     }
 
     removePostersFromStock(posterName, quantity) {
         const poster = this.findPosterByName(posterName)
         poster?.removeFromStock(quantity)
     }
    //USUÁRIOS
     saveUser(user) {
        const userExists = this.#storage.users.find( u => u.email === user.email )
        if (!userExists) {
            this.#storage.users.push(user)
        }
     }
    //PEDIDO
     saveOrder(order){
     this.#storage.orders.push(order)
     }
    //EXIBIR TABELA COM OS DADOS 
     showStorage() {
        console.table( this.#storage.authors)
        console.table( this.#storage.books)
        console.table( this.#storage.posters)
        console.table( this.#storage.orders.map(Order => Order.data))
        console.table( this.#storage.users)
     } 
}