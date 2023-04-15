let myLibrary = [];

//fill in some static books for now
myLibrary.push(new Book("The Hobbit", "J.R.R. Tolkein", 304, true));
myLibrary.push(new Book("20,000 Leagues Under the Sea", "Jules Verne", 212, true));
myLibrary.push(new Book("The War of the Worlds", "H.G. Wells", 287, false));
displayAllBooks();

//Set a listener on form submission to add book, then toggle form visibility off again
document.querySelector("#addBookForm").addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("Sucessfully prevented default submit behavior!");

    //Get info in form and add (form fields are required in HTML)
    const formData = document.querySelectorAll("input");
    const newEntry = new Book(formData[0].value, formData[1].value, formData[2].value, formData[3].checked);
    
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

    this.info = function() {
        return title + ", by " + author + ", " + pages + " pages, " + (readState ? "has been read" : "unread");
    }
}

function displayAllBooks() {
    myLibrary.forEach(book => {
        createBookEntry(book);    
    });
}

//Function to only display a single book -- helper function for updating
function createBookEntry(book) {
    const newRow = document.createElement("tr");
        //need to append each cell to the row, and then appendChild the row to the tbody element
        
        //create each table cell for the entry
        const titleCell = document.createElement("td");
        const authorCell =  document.createElement("td");
        const pagesCell = document.createElement("td");
        const readCell = document.createElement("td");
        
        //Get all data for the entry and append to proper cell
        const titleEntry = document.createTextNode(book.title);
        titleCell.appendChild(titleEntry);
        const authorEntry = document.createTextNode(book.author);
        authorCell.appendChild(authorEntry);
        const pagesEntry = document.createTextNode(book.pages);
        pagesCell.appendChild(pagesEntry);
        const readEntry = document.createTextNode(book.readYet);
        readCell.appendChild(readEntry);

        //Append all cells to row, then row to tbody in DOM
        newRow.append(titleCell, authorCell, pagesCell, readCell);
        document.getElementById("bookEntries").appendChild(newRow);

        console.log("Added entry: " + book.info());
}