'use strict'

function onInit() {
    renderSortByQueryParams()
    renderBooks()
}

function renderBooks() {
    const books = getBooks()
    const strHTMLs = books.map(book => {
        const { id, title, price, rate } = book
        return ` <tr>
    <td> ${id} </td>  <td> ${title} </td> <td> ${price}$ </td> <td>${rate} ⭐️</td>
    <td> 
    <button class="action-btn read" onclick="onReadBook('${id}')" data-trans="read" >${getTrans('read')}</button>
    <button class="action-btn update" onclick="onUpdateBook('${id}')" data-trans="update">${getTrans('update')}</button>
    <button class="action-btn delete" onclick="onDeleteBook('${id}')" data-trans="delete">${getTrans('delete')}</button>
    </td>
    </tr>`
    })


    document.querySelector('.table-body').innerHTML = strHTMLs.join('')
    //doTrans
}

function onSetLang(lang) {
    setLang(lang)

    if (lang === 'he') $('body').addClass('rtl')
    else ($('body').removeClass('rtl'))

    doTrans()
    getUrl()
    renderBooks()
}


function onDeleteBook(bookId) {
    deleteBook(bookId)
    renderBooks()
}

function onUpdateBook(bookId) {
    var bookPrice = +prompt(`What is the book's price?`)
    updateBook(bookId, bookPrice)
    renderBooks()
}


function onAddBook() {

console.log('hi');
 // var title = prompt(`What is the name of the book?`)
    // var price = +prompt(`What is the price of the book?`)
    var title = $('.new-book-title').val()
    var price = $('.new-book-price').val()
    
    if (title) {
        addBook(title, price)
        renderBooks()
        alert(`Book added to bookshelf!`)
    }
}

function onReadBook(bookId) {
    console.log('hello');
    console.log('bookId = ', bookId)
    var book = getBookById(bookId)
    var strHtml = `
    <h3>${book.title.toUpperCase()}</h3>
    <h4>Book's price is  <span>${book.price}$</span> </h4>
    <h5>Book Description</h5>
    <p>${book.desc}</p>
    <br>
    
    <span>Rate The book!⭐️</span><br>
    <div class="rate-container">
    <button class="btn" onclick="onRateBook(-1, '${book.id}')">-</button>
    <span class="rate">${book.rate}</span>
    <button class="btn" onclick="onRateBook(1, '${book.id}')">+</button>
    </div> <br>
    <button onclick="onCloseModal()">Close</button> 
    `
    // var elModal = document.querySelector('.modal')
    // elModal.innerHTML = strHtml
    // elModal.classList.add('open')
    $('.modal').html(strHtml)
    $('.modal').addClass('open')
}

function onOpenAddBookForm() {
    $('.add-modal').addClass('open')
}

function onCloseModal() {
    $('.modal').removeClass('open')
}

function onRateBook(diff, bookId) {
    rateBook(diff, bookId)
    var book = getBookById(bookId)
    var elRate = document.querySelector('.rate')
    elRate.innerHTML = book.rate
    renderBooks()
}

function onSetFilterBy(filterBy) {
    filterBy = setFilter(filterBy)
    renderBooks()
}


function onSetSortBy(sortBy) {
    console.log('hi = ')
    sortBy = setBookSortFilter(sortBy)
    var lang = getCurrLang()
    getUrl()
    renderBooks()
}

function onSortTable(sortBy) {
console.log('sortBy = ', sortBy)
}

function getUrl() {
    var sortBy = getBookSortFilter()
    var lang = getCurrLang()

    const queryStringParams = `?maxPrice=${sortBy.maxPrice}&minRate=${sortBy.minRate}&lang=${lang}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)
}


function renderLangByQueryParams() {
    const queryStringParams = new URLSearchParams(window.location.search)
    const lang = queryStringParams.get('lang')

}

function renderSortByQueryParams() {
    const queryStringParams = new URLSearchParams(window.location.search)
    const sortBy = {
        maxPrice: queryStringParams.get('maxPrice') || 0,
        minRate: queryStringParams.get('minRate') || 0,
    }
    var lang = queryStringParams.get('lang') || 'en'

    if (!sortBy.maxPrice && !sortBy.minRate) return

    $('.filter-max-price').val(sortBy.maxPrice)
    $('.filter-min-rate').val(sortBy.minRate)

    onSetLang(lang)
    setBookSortFilter(sortBy)
}


function onSearchBook(ev) {
    ev.preventDefault()
    const elSearchInput = document.querySelector('input[name="book-search"]')
    const searchInput = elSearchInput.value
    searchBook(searchInput)
    renderBooks()
}

function onNextPage() {
    nextPage()
    renderBooks()
}