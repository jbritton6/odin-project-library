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
}

const eqloquentJS = new Book('EloquentJS', 'Marijn Haverbeke', 500, false);
console.log(eqloquentJS.info());