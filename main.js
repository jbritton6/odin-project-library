const myLibrary = [];



setSubmitButtons();


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


function removeBookFromLibrary (arrayIndex) {
    myLibrary.splice(arrayIndex, 1);

    const cardContainer = document.querySelector('.card-container');
    while (cardContainer.hasChildNodes()) {
        cardContainer.removeChild(cardContainer.lastChild);
    }

    displayLibrary();
}


function changeReadStatus (arrayIndex) {
    myLibrary[arrayIndex].haveRead = true;
    const book = document.querySelector(`.read-${arrayIndex}`);
    book.innerHTML = myLibrary[arrayIndex].haveReadString();
}


function displayLibrary () {
    for (let i = 0; i < myLibrary.length; i++) {
        displayBookOnCard(myLibrary[i], i);
    }
}

function displayCard () {
    last = myLibrary.length - 1;
    displayBookOnCard(myLibrary[last], last);
}


function displayBookOnCard (book, arrayIndex) {
    const cardContainer = document.querySelector('.card-container');
    const card = document.createElement('div');
    card.classList.add('card');
    card.id = arrayIndex;


   const title = createElementWithText('p', `${book.title}`);
   title.classList.add('card-title');
   card.appendChild(title);

    bookProperties = [
        ['Author', book.author],
        ['Pages', book.numPages],
        ['Read yet?', book.haveReadString()]
    ];

    for (let property of bookProperties) {
        const propertyContainer = document.createElement('div');
        propertyContainer.classList.add('card-info-container');

        const title = createElementWithText('p', property[0]);
        title.classList.add('card-subtitle');
        propertyContainer.appendChild(title);

        const content = createElementWithText('p', property[1]);
        propertyContainer.appendChild(content);

        if (property[0] === 'Read yet?') {
            content.classList.add(`read-${arrayIndex}`)
        }

        card.appendChild(propertyContainer);
    }

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('card-button-container');

    const removeButton = createElementWithText('button', 'Remove');
    removeButton.classList.add('card-button');
    removeButton.addEventListener('click', () => removeBookFromLibrary(arrayIndex));
    buttonContainer.appendChild(removeButton); 

    const readButton = createElementWithText('button', 'Read');
    readButton.classList.add('card-button');
    readButton.addEventListener('click', () => changeReadStatus(arrayIndex));
    buttonContainer.appendChild(readButton); 

    card.appendChild(buttonContainer);

    cardContainer.appendChild(card);
}


function createElementWithText(element, innerText) {
    const elementObject = document.createElement(element);
    const elementObjectText = document.createTextNode(innerText);
    elementObject.appendChild(elementObjectText);

    return elementObject;
}


function setSubmitButtons () {
    const button = document.querySelector('#add-book-button');
    button.addEventListener('click', () => addNewBook());

    const buttonForm = document.querySelector('#form-button');
    buttonForm.addEventListener('click', () => addToLibrary());
}


function addNewBook () {
    const modal = document.querySelector('.modal-background');
    modal.style.display = 'block';
}


function addToLibrary () {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const numPages = document.querySelector('#pages').value;

    // myLibrary.push('hi');   
    // const book = new Book('h', 'author', 'numPages', false);
    const book = new Book(title, author, numPages, false);
    addBookToLibrary(book);
    displayCard();
    const modal = document.querySelector('.modal-background');
    modal.style.display = 'none';
}


/*
const eloquentJS = new Book('EloquentJS', 'Marijn Haverbeke', 500, false);
addBookToLibrary(eloquentJS);

const dataApps = new Book('Designing Data-Intensive Applications', 'Martin Kleppmann', 590, false);
addBookToLibrary(dataApps);

const dsa = new Book('Data Structures & Algorithms in Python', 'Michael T. Goodrich', 748, true);
addBookToLibrary(dsa);


displayLibrary();
setSubmitButtons();
*/