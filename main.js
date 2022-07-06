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
    const read = document.querySelector('#read').checked;

    const book = new Book(title, author, numPages, read);
    myLibrary.push(book);
    displayBook(myLibrary.length - 1)

    toggleModalDisplay();
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

    document
        .querySelector(`#id-${arrayIndex} > div:nth-child(4) > p + p`)
        .textContent
        = myLibrary[arrayIndex]
        .haveReadString();
}


function displayLibrary () {
    for (let i = 0; i < myLibrary.length; i++) {
        displayBook(i);
    }
}


function displayBook (arrayIndex) {
    let book = myLibrary[arrayIndex];
    const cardContainer = document.querySelector('.card-container');
    const card = newElement('div', null, 'card');
    card.id = `id-${arrayIndex}`;

    const title = newElement('p', `${book.title}`, 'card-title');
    card.appendChild(title);

    bookProperties = [
        ['Author', book.author],
        ['Pages', book.numPages],
        ['Read yet?', book.haveReadString()]
    ];

    for (let property of bookProperties) {
        const title = newElement('p', property[0], 'card-subtitle');
        const content = newElement('p', property[1]);

        const propertyContainer = newElement('div', null, 'card-info-container');
        propertyContainer.appendChild(title);
        propertyContainer.appendChild(content);
        card.appendChild(propertyContainer);
    }

    const removeButton = newElement('button', 'Remove', 'card-button');
    const readButton = newElement('button', 'Read', 'card-button');
    removeButton.addEventListener('click', () => removeBookFromLibrary(arrayIndex));
    readButton.addEventListener('click', () => changeReadStatus(arrayIndex));

    const buttonContainer = newElement('div', null, 'card-button-container');
    buttonContainer.appendChild(removeButton); 
    buttonContainer.appendChild(readButton); 
    card.appendChild(buttonContainer);

    cardContainer.appendChild(card);
}


function newElement (elem, text = null, classText = null) {
    const element = document.createElement(elem);

    if (text !== null) {
        const elementText = document.createTextNode(text);
        element.appendChild(elementText);
    }

    if (classText !== null) {
        element.classList.add(classText);
    }

    return element;
}