const myLibrary = [];
setButtons();


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


function setButtons () {
    document
        .querySelector('#add-book-button')
        .addEventListener('click', () => toggleModalDisplay());

    document
        .querySelector('#form-button')
        .addEventListener('click', () => addToLibrary());
}


function toggleModalDisplay () {
    const modal = document.querySelector('.modal-background');

    if (modal.classList.contains('hide')) {
        modal.classList.add('show');
        modal.classList.remove('hide');
    } else {
        modal.classList.add('hide');
        modal.classList.remove('show');
    }
}

function addToLibrary () {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const numPages = document.querySelector('#pages').value;

    const book = new Book(title, author, numPages, false);
    addBookToLibrary(book);
    displayCard();

    toggleModalDisplay();
}