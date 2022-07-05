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
        propertyTitle.classList.add('card-subtitle');
        propertyTitle.appendChild(propertyTitleText);
        propertyContainer.appendChild(propertyTitle);

        const propertyContent = document.createElement('p');
        const propertyContentText = document.createTextNode(property[1]);
        propertyContent.appendChild(propertyContentText);
        propertyContainer.appendChild(propertyContent);

        card.appendChild(propertyContainer);
    }

    const removeButton = document.createElement('button');
    const removeButtonText = document.createTextNode('Remove');
    removeButton.classList.add('card-button');
    removeButton.appendChild(removeButtonText);
    card.appendChild(removeButton); 

    cardContainer[0].appendChild(card);
}

const eloquentJS = new Book('EloquentJS', 'Marijn Haverbeke', 500, false);
addBookToLibrary(eloquentJS);

const dataApps = new Book('Designing Data-Intensive Applications', 'Martin Kleppmann', 590, false);
addBookToLibrary(dataApps);

const dsa = new Book('Data Structures & Algorithms in Python', 'Michael T. Goodrich', 748, true);
addBookToLibrary(dsa);

displayBookOnCard(eloquentJS);
displayBookOnCard(dataApps);
displayBookOnCard(dsa);