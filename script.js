const myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggleRead() {
        this.read = !this.read;
    }
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

// test books
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("Atomic Habits", "James Clear", 320, true);

console.log(myLibrary);

function displayBooks() {
    const library = document.querySelector("#library");
    library.textContent = ""; // clear old cards first

    myLibrary.forEach((book) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.id = book.id;

        card.innerHTML = `
      <h3>${book.title}</h3>
      <p>by ${book.author}</p>
      <p>${book.pages} pages</p>
      <p>${book.read ? "Read ✅" : "Not read yet"}</p>
      <button class="toggle">Toggle Read</button>
      <button class="remove">Remove</button>
    `;

        library.appendChild(card);
    });
}

displayBooks();

const dialog = document.querySelector("#book-dialog");
const form = document.querySelector("#book-form");

document.querySelector("#new-book").addEventListener("click", () => {
    dialog.showModal();
});

document.querySelector("#cancel").addEventListener("click", () => {
    dialog.close();
});

form.addEventListener("submit", (event) => {
    event.preventDefault(); // stop the page from reloading
    addBookToLibrary(
        document.querySelector("#title").value,
        document.querySelector("#author").value,
        document.querySelector("#pages").value,
        document.querySelector("#read").checked
    );
    displayBooks();
    form.reset();
    dialog.close();
});

document.querySelector("#library").addEventListener("click", (event) => {
    const card = event.target.closest(".card");
    if (!card) return;
    const book = myLibrary.find((b) => b.id === card.dataset.id);

    if (event.target.classList.contains("remove")) {
        myLibrary.splice(myLibrary.indexOf(book), 1);
    } else if (event.target.classList.contains("toggle")) {
        book.toggleRead();
    }
    displayBooks();
});