'use strict'

var gBooks
var gFilterBy = { bookTitle: '', }
var gSortBy = { maxPrice: 100, minRate: 0}
var searchedBook
var gPageIdx = 0
// var maxPrice

const PAGE_SIZE = 3
const STORAGE_KEY = 'booksDB'

_createBooks()


function getBooks() {
    var books = gBooks.filter(book => book.price <= gSortBy.maxPrice && book.rate >= gSortBy.minRate && book.title.toLowerCase().includes(gFilterBy.bookTitle.toLowerCase()))

    var startIdx = gPageIdx * PAGE_SIZE

    return books.slice(startIdx, startIdx + PAGE_SIZE)
}


function _createBook(title, price, img = `img/default.jpg`) {
    return {
        id: _makeId(),
        title,
        price,
        desc: makeLorem(),
        rate: 0,
        img: img
    }
}

function _createBooks() {
    gBooks = loadFromStorage(STORAGE_KEY)
    if (!gBooks || !gBooks.length) {
        gBooks = [
            _createBook('Harry Potter and the Half Blood Prince', 29.90),
            _createBook('Lord of the Rings', 18.50),
            _createBook('IT', 15.60)
        ]
        saveToStorage(STORAGE_KEY, gBooks)
    }
    console.log('gBooks = ', gBooks)
}

function deleteBook(bookId) {
    const bookIdx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage()
}

function updateBook(bookId, bookPrice) {
    const book = getBookById(bookId)
    book.price = bookPrice
    _saveBooksToStorage()
}

function addBook(title, price) {
    const book = _createBook(title, price)
    gBooks.unshift(book)
    _saveBooksToStorage()
}

function opneAddModal() {

}

function rateBook(diff, bookId) {
    const book = getBookById(bookId)

    if (book.rate + diff < 0 || book.rate + diff > 10) return
    book.rate += diff
   
    _saveBooksToStorage()
}


function setFilter(filterBy) {
    console.log('filterBy = ', filterBy)
    gFilterBy.bookTitle = filterBy
    return gFilterBy
}

function getBookSortFilter() {
    return gSortBy
}

function setBookSortFilter(sortBy = {}) {
    if (sortBy.maxPrice !== undefined) gSortBy.maxPrice = sortBy.maxPrice
    if (sortBy.minRate !== undefined) gSortBy.minRate = sortBy.minRate
    return gSortBy
}

function nextPage() {
    gPageIdx++
    if (gPageIdx * PAGE_SIZE >= gBooks.length) {
        gPageIdx = 0
    }
}

function searchBook(searchInput) {
    setFilter(searchInput)
}

function getBookById(bookId) {
    const book = gBooks.find(book => book.id === bookId)
    return book
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}