const myLibrary = [];

Book.prototype.haveReadString = function () {
    if (this.haveRead === true) {
        return "have read";
    } else {
        return "have not read";
    }
};

Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.numPages} pages, ${this.haveReadString()}.`;
};

function Book (title, author, numPages, haveRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.haveRead = haveRead;
}

function addBookToLibrary (book) {
    myLibrary.push(book);
}

function displayLibrary () {
    for (book of myLibrary) {
        console.log(book);
    }
}

function displayBookOnCard (book) {
    const cardContainer = document.getElementsByClassName('card-container');
    const card = document.createElement('div');

    const title = document.createElement('h1')
    const titleText = document.createTextNode(`${book.title}`);
    title.appendChild(titleText);
    card.appendChild(title);
    
    /* ard.textContent = `<h1>${book.title}</h1>`;*/
    cardContainer[0].appendChild(card);
}

const eloquentJS = new Book('EloquentJS', 'Marijn Haverbeke', 500, false);
console.log(eloquentJS.info());

addBookToLibrary(eloquentJS);
console.log(myLibrary);

displayLibrary();

displayBookOnCard(eloquentJS);