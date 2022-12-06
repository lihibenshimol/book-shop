var gTrans = {
    title: {
        en: 'Welcome to my bookshop',
        he: 'ברוכים הבאים לחנות הספרים שלי'
    },
    'max-price-lable': {
        en: 'Max price',
        he: 'מחיר מקסימלי',
    },
    'min-rate-lable': {
        en: 'Min rate',
        he: 'דירוג מינימלי'
    },
    search: {
        en: 'Search',
        he: 'חפש',
    },
    id: {
        en: 'Id',
        he: 'מק״ט'
    },
    'book-name': {
        en: 'Title',
        he: 'שם הספר'
    },
    price: {
        en: 'Price',
        he: 'מחיר'
    },
    rate: {
        en: 'Rate',
        he: 'דירוג'
    },
    actions: {
        en: 'Actions',
        he: 'פעולות'
    },
    
    add: {
        en: 'Add new book',
        he: 'הוסף ספר חדש',
    },
    read: {
        en: 'Read',
        he: 'קרא',
    },
    update: {
        en: 'Update',
        he: 'עדכן',
    },
    delete: {
        en: 'Delete',
        he: 'מחק',
    },
    'search-box': {
        en: 'Search book...',
        he: 'חפש ספר...'
    },
    'next-page': {
        en: 'Next page',
        he: 'דף הבא'
    }
}

var gCurrLang = 'en'

function getTrans(transKey) {
    // TODO: if key is unknown return 'UNKNOWN'
    // TODO: get from gTrans
    // TODO: If translation not found - use english

    const key = gTrans[transKey]
    if (!key) return 'UNKNOWN'

    // done: get from gTrans
    var translation = key[gCurrLang]

    // done: If translation not found - use english
    if (!translation) translation = key.en

    return translation
}

function doTrans() {
    // TODO: 
    // var els = document.querySelectorAll('[data-trans]'
    // for each el:
    //    get the data-trans and use getTrans to replace the innerText 
    //    ITP: support placeholder   
    
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        const transKey = el.dataset.trans
        const translation = getTrans(transKey)

        el.innerText = translation

        // done: support placeholder    
        if (el.placeholder) el.placeholder = translation
    })
}

function setLang(lang) {
    gCurrLang = lang
}

function getCurrLang() {
    return gCurrLang
}

function formatNumSimple(num) {
    return num.toLocaleString('es')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num)
}

function formatCurrency(num) {
    return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num)
}

function formatDate(time) {
    var options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    }

    return new Intl.DateTimeFormat(gCurrLang, options).format(time)
}

// Kilometers to Miles
function kmToMiles(km) {
    return km / 1.609
}

// Kilograms to Pounds:
function kgToLbs(kg) {
    return kg * 2.20462262185
}


function getPastRelativeFrom(ts) {
    const diff = Date.now() - new Date(ts)
    const seconds = diff / 1000
    const minutes = seconds / 60
    const hours = minutes / 60
    const days = hours / 24

    const formatter = new Intl.RelativeTimeFormat('en-US', {
        numeric: 'auto'
    })
    if (seconds <= 60) return formatter.format(-seconds, 'seconds')
    if (minutes <= 60) return formatter.format(-minutes, 'minutes')
    if (hours <= 24) return formatter.format(-hours, 'hours')
    return formatter.format(-days, 'days')
}
