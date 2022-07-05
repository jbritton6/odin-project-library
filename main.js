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
    card.classList.add('card');

    const title = document.createElement('p');
    const titleText = document.createTextNode(`${book.title}`);
    title.classList.add('card-title');
    title.appendChild(titleText);
    card.appendChild(title);

    bookProperties = [
        ['Author', book.author],
        ['Pages', book.numPages],
        ['Read yet?', book.haveReadString()]
    ];

    for (let property of bookProperties) {
        const propertyContainer = document.createElement('div');
        propertyContainer.classList.add('card-info');

        const propertyTitle = document.createElement('p');
        const propertyTitleText = document.createTextNode(property[0]);
        propertyTitle.classList.add('card-title');
        propertyTitle.appendChild(propertyTitleText);
        propertyContainer.appendChild(propertyTitle);

        const propertyContent = document.createElement('p');
        const propertyContentText = document.createTextNode(property[1]);
        propertyContent.appendChild(propertyContentText);
        propertyContainer.appendChild(propertyContent);

        card.appendChild(propertyContainer);
    }

    cardContainer[0].appendChild(card);
}

const eloquentJS = new Book('EloquentJS', 'Marijn Haverbeke', 500, false);
console.log(eloquentJS.info());

addBookToLibrary(eloquentJS);
console.log(myLibrary);

displayLibrary();

displayBookOnCard(eloquentJS);