let myLibrary = [];

//fill in some static books for now
myLibrary.push(new Book("The Hobbit", "J.R.R. Tolkein", 304, true));
myLibrary.push(new Book("20,000 Leagues Under the Sea", "Jules Verne", 212, true));
myLibrary.push(new Book("The War of the Worlds", "H.G. Wells", 287, false));
displayAllBooks();

//Set a listener on form submission to add book, then toggle form visibility off again
document.querySelector("#addBookForm").addEventListener("submit", (event) => {
    event.preventDefault();

    //Get info in form and add (form fields are required in HTML)
    const entryTitle = document.querySelector("input#bookTitle");
    const entryAuthor = document.querySelector("input#bookAuthor");
    const entryPages = document.querySelector("input#bookPages");
    const entryRead = document.querySelector("input#bookRead");

    const newEntry = new Book(entryTitle.value, entryAuthor.value, entryPages.value, entryRead.checked);

    myLibrary.push(newEntry);
    createBookEntry(newEntry);

    console.log(newEntry);

    //Turn off visibility on div, then return (instead of sending POST)
    document.getElementById("addBookFormContainer").classList.remove("show");
    return false;
});

//Book Constructor
function Book(title, author, pages, readState) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readState = readState;
    this.readYet = readState ? "yes" : "no";
}

//Define toggle read state on prototype of Book
//Note: We could do this on the book object itself, but that would create the function on each instance of 'Book', which would eat a lot of memory at scale.
Book.prototype.setReadState = function(newState) {
    this.readState = newState;
    //Update readYet to match
    this.readYet = this.readState ? "yes" : "no";
}

Book.prototype.getInfo = function() {
    return this.title + ", by " + this.author + ", " + this.pages + " pages, " + (this.readState ? "read" : "unread");
}

function displayAllBooks() {
    myLibrary.forEach(book => {
        createBookEntry(book);
    });
}

//Remove Book Entry Function (and remove from array)
function removeBook(index) {
    toRemove = document.querySelector('[data-row-num="' + index + '"]');
    delete myLibrary[index]; //doesn't reindex, but that's fine for now
    toRemove.remove();
    console.log(myLibrary);
}

//Add Book Table Entry Function
function createBookEntry(book) {
    const newRow = document.createElement("tr");
    //Set row number as data-attribute
    newRow.dataset.rowNum = myLibrary.indexOf(book);
    //newRow.classList.add("align-middle");

    //create each table cell for the entry)
    const titleCell = document.createElement("td");
    const authorCell = document.createElement("td");
    const pagesCell = document.createElement("td");
    const readCell = document.createElement("td");

    //Get all data for the entry and append to proper cell
    const titleEntry = document.createTextNode(book.title);
    titleCell.appendChild(titleEntry);
    const authorEntry = document.createTextNode(book.author);
    authorCell.appendChild(authorEntry);
    const pagesEntry = document.createTextNode(book.pages);
    pagesCell.appendChild(pagesEntry);

    //Add toggle switch for "has read"
    const readSwitch = document.createElement("input");
    const readlabel = document.createElement("label");

    readSwitch.classList.add("form-check-input");
    readSwitch.type = "checkbox";
    readSwitch.role = "switch";
    readSwitch.id = "readSwitch-" + newRow.dataset.rowNum;
    readSwitch.checked = book.readState;
    readSwitch.oninput = function () {
        book.setReadState(readSwitch.checked);
        //Update entry on table
        readlabel.innerText = book.readYet;
        console.log(book.getInfo());
    }

    readlabel.classList.add("form-check-label");
    readlabel.for = readSwitch.id;
    readlabel.innerText = book.readYet;

    const readForm = document.createElement("div");
    readForm.classList.add("form-check", "form-switch");
    readForm.append(readSwitch, readlabel);

    readCell.appendChild(readForm);

    //Add button to delete row (from library and table)
    const removeBookCell = document.createElement("td");
    const removeBookButton = document.createElement("button");
    removeBookButton.classList.add("btn", "btn-outline-danger", "btn-sm");
    removeBookButton.innerText = "Remove";
    removeBookButton.onclick = function () {
        removeBook(newRow.dataset.rowNum);
    }
    removeBookCell.appendChild(removeBookButton);

    //Append all cells to row, then row to tbody in DOM
    newRow.append(titleCell, authorCell, pagesCell, readCell, removeBookCell);
    document.getElementById("bookEntries").appendChild(newRow);

    //For some reason, this throws a an error: getInfo not a function -- some kind of scope issue -___-
    //console.log("Added entry: " + book.getInfo());
}