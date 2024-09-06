const myLibrary = [];
const booksContainer = document.querySelector(".books-container");
const newBookBtn = document.querySelector("#new-book-btn");
const submitBtn = document.querySelector("#submit-btn");

function Book(author, title, numberOfPages, read) {
  // the constructor...
  this.author = author;
  this.title = title;
  this.numberOfPages = numberOfPages;
  this.read = read;
}

function addBookToLibrary(book) {
   myLibrary.push(book);
}

function displayAllBooks(){

    myLibrary.forEach(book => {

        const div = document.createElement("div");
        div.textContent = "Author: " + book.author + " Title: " + book.title + " Number of pages: " 
        + book.numberOfPages + "Read: " + book.read;
        booksContainer.appendChild(div);

    });
}

newBookBtn.addEventListener("click", () => {
    const newBookForm = document.querySelector("#new-book-form");
    newBookForm.style.display = "block";
  });

submitBtn.addEventListener("click", () => {
    const author = document.querySelector("#author").value;
    const title = document.querySelector("#title").value;
    const numberOfPages = document.querySelector("#number-of-pages").value;

    let readRadios = document.getElementsByName("read");
    let readStatus;

    readRadios.forEach(radio => {
        if (radio.checked) {
            readStatus = radio.value;  // This will be either 'read' or 'not-read'
        }
    });


    const newBook = new Book (author, title, numberOfPages, readStatus);
    addBookToLibrary(newBook);
    displayAllBooks();
    console.log(myLibrary);
});

submitBtn.addEventListener('click', function(event) {
    // Prevent the form from submitting and the page from reloading
    event.preventDefault();
});
/*
let author = prompt("enter author:");
let title = prompt("enter title:");
let numberOfPages = prompt("enter number of pages:");
let newBook = new Book(author, title, numberOfPages);
addBookToLibrary(newBook);
displayAllBooks();
*/
