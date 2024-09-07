const myLibrary = [];

const booksContainer = document.querySelector(".books-container");
const newBookBtn = document.querySelector("#new-book-btn");
const submitBtn = document.querySelector("#submit-btn");
const newBookForm = document.querySelector("#new-book-form");
const errorMessage = document.querySelector("#error-message");


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

function clearForm(){
    const formValues = document.querySelectorAll("input");
    formValues.forEach(input => {

        input.value = ""
    })

    errorMessage.textContent = "";
    newBookForm.style.display = "none";

}

function isLogged(author, title){
    let logged = false;
    myLibrary.forEach(book => {
        if (book.author == author){
            if (book.title == title){
                logged = true;
            }
        }
    })

    return logged;
}

function isEmpty(){
    const formValues = document.querySelectorAll("input");
    let empty = false;

    formValues.forEach(input => {

        if (input.type != "radio" && input.value === ""){
            empty = true;
        }
    
    });

    return empty;
}

function displayAllBooks(){

    myLibrary.forEach(book => {

        const div = document.createElement("div");
        div.innerHTML = "Author: " + book.author + "<br>Title: " + book.title + "<br>Number of pages: " 
        + book.numberOfPages + "<br>Read: " + book.read + "<br>";

        booksContainer.appendChild(div);

    });
}

function displayNewBook(book){
    const div = document.createElement("div");
    div.innerHTML = "Author: " + book.author + "<br>Title: " + book.title + "<br>Number of pages: " 
    + book.numberOfPages;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";

    const toggleReadBtn = document.createElement("button");
    toggleReadBtn.textContent = "Read";

    div.appendChild(removeBtn);
    div.appendChild(toggleReadBtn);

    booksContainer.appendChild(div);

    removeBtn.addEventListener("click", () => {
        // Remove the book from the DOM
        booksContainer.removeChild(div);

        // Find the index of the book in the myLibrary array and remove it
        const index = myLibrary.indexOf(book);
        
        myLibrary.splice(index, 1);  // Remove the book from the array
        
    });

    toggleReadBtn.addEventListener("click", () => {
        console.log(book.read);
        if (book.read === "Not read"){
            book.read = "read";
            toggleReadBtn.textContent = "Unread";
        }

        else{
            book.read = "Not read";
            toggleReadBtn.textContent = "Read";
        }
        
    });
}

function displayErrorMessage(error){

    if (error == "logged"){
        errorMessage.textContent = "Book is already in library";
    }

    else if (error == "full"){
        errorMessage.textContent = "Library is full";
    }
    
    else if (error == "empty"){
        errorMessage.textContent = "Please fill out all the data"
    }
}

newBookBtn.addEventListener("click", () => {

    let temp;

    if (newBookForm.style.display != "none"){
        temp = "none";
        clearForm();
    }

    else if (newBookForm.style.display != "block"){
        temp = "block";
    }

    newBookForm.style.display = temp;

  });

submitBtn.addEventListener("click", () => {
    const author = document.querySelector("#author").value;
    const title = document.querySelector("#title").value;

    if (myLibrary.length < 5){
        if (!isLogged(author, title)){
            if (!isEmpty()){
                const numberOfPages = document.querySelector("#number-of-pages").value;

      


                const newBook = new Book (author, title, numberOfPages, "read");
                addBookToLibrary(newBook);

                displayNewBook(newBook);

                clearForm();
            }
            
            else{
                displayErrorMessage("empty");
            }
        }

        else{
            displayErrorMessage("logged");
        }
    }

    else{
        displayErrorMessage("full");
    }
    
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
