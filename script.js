//script.js for library

const addBtn = document.querySelector('#addBtn');
addBtn.addEventListener('click', addBookToLibrary);

const popUpForm = document.getElementById('popUp');
const closePopUp = document.getElementsByTagName('span')[0];
closePopUp.addEventListener('click', () => popUpForm.style.display = 'none')


const newBookBtn = document.querySelector('#newBookBtn');
newBookBtn.addEventListener('click', () => popUpForm.style.display = 'block');

class Book {
    constructor(title, author, pages, read) {  //contructor given by TOP
        this.title = form.title.value; 
        this.author = form.author.value; 
        this.pages = form.pages.value + ' pages'; 
        this.read = form.read.checked; 
    }
}

let myLibrary = [];
let newBook;

function addBookToLibrary() {
    event.preventDefault();

    popUpForm.style.display = 'none';
    newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    saveBook();
    loadBook(); 
    form.reload();
}

function saveBook() {
    localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary));
}

function loadBook() {
    const display = document.getElementById('library-container');
    const books = document.querySelectorAll('.book');
    books.forEach(book => display.removeChild(book));

    for (let i = 0; i < myLibrary.length; i++) {
        createBook(myLibrary[i]);
    }
}

function createBook(book) {


    const library = document.querySelector('#library-container');
    const bookDiv = document.createElement('div');
    const titleDiv = document.createElement('div');
    const authDiv = document.createElement('div');
    const pageDiv = document.createElement('div');
    const removeBtn = document.createElement('button');
    const readBtn = document.createElement('button');

    bookDiv.classList.add('book');
    bookDiv.setAttribute('id', myLibrary.indexOf(book));

    titleDiv.textContent = book.title;
    titleDiv.classList.add('title');
    bookDiv.appendChild(titleDiv);

    authDiv.textContent = book.author;
    authDiv.classList.add('author');
    bookDiv.appendChild(authDiv);

    pageDiv.textContent = book.pages;
    pageDiv.classList.add('pages');
    bookDiv.appendChild(pageDiv);

    readBtn.classList.add('readBtn')    
    bookDiv.appendChild(readBtn);

    if(book.read === false) {
        readBtn.textContent = 'Not Read';
        readBtn.style.backgroundColor = '#c90838';
    } else {
        readBtn.textContent = 'Read';
        readBtn.style.backgroundColor = '#b6e2c0'
    }

    removeBtn.textContent = 'Remove';
    readBtn.setAttribute('id', 'removeBtn');
    bookDiv.appendChild(readBtn);

    library.appendChild(bookDiv);

    removeBtn.addEventListener('click', () => {
        myLibrary.splice(myLibrary.indexOf(book), 1);

        saveBook();
        loadBook();
    });

    readBtn.addEventListener('click', () => {
        book.read = !book.read;
        saveBook();
        loadBook();
    });

}

function reload() {
    if (!localStorage.myLibrary) {
        loadBook();
    } else {
        let books = localStorage.getItem('myLibrary');
        books = JSON.parse(books);
        myLibrary = books;
        loadBook();
    }
}

reload();