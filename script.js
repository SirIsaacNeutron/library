const openModalButton = document.querySelector("[data-modal-target]")
const overlay = document.getElementById("overlay")

const library = []

function openModal(modal) {
    if (modal == null) { return }
    modal.classList.add("active")
    overlay.classList.add("active")
}

function closeModal(modal) {
    if (modal == null) { return }
    modal.classList.remove("active")
    overlay.classList.remove("active")
}

openModalButton.addEventListener("click", () => {
    const modal = document.getElementById("modal")
    openModal(modal)
})

overlay.addEventListener("click", () => {
    if (overlay.classList.contains("active")) {
        const modal = document.getElementById("modal")
        closeModal(modal)
    }
})

const modalForm = document.querySelector(".modal-form")

modalForm.addEventListener("submit", e => {
    addBookToLibrary(e)
    const modal = document.getElementById("modal")
    closeModal(modal)
    modalForm.reset() // when user re-opens form, it will be blank
})

function Book(title, author, pages, isRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead
}

Book.prototype.toggleRead = function() {
    this.isRead = !this.isRead
}

function addBookToLibrary(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const formObject = Object.fromEntries(formData)

    // Checkboxes by default send "on" if they are checked
    // But if they are unchecked they will not even be recorded as a key in formObject
    let isRead = false
    if ("isRead" in formObject) {
        isRead = true
    }

   const book = new Book(formObject.title, formObject.author, formObject.pages, isRead)
   library.push(book)
   updateDisplayedLibrary()
}

function updateDisplayedLibrary() {
    const previousBookCards = document.querySelectorAll(".book-card")

    if (previousBookCards !== null) {
        previousBookCards.forEach(bookCard => bookCard.remove())
    }

    library.forEach((book, index) => {
        createBookCard(index, book.title, book.author, book.pages, book.isRead)
    })
}

function createBookCard(index, title, author, pages, isRead) {
    const bookCardArea = document.querySelector("main")

    const newBookCard = document.createElement("article")
    newBookCard.classList.add("book-card")

    const bookTitle = document.createElement("h2")
    bookTitle.textContent = title
    newBookCard.appendChild(bookTitle)

    const bookAuthor = document.createElement("p")
    bookAuthor.textContent = author
    newBookCard.appendChild(bookAuthor)

    const bookPages = document.createElement("p")
    bookPages.textContent = `${pages} pages`
    newBookCard.appendChild(bookPages)

    const isReadButton = document.createElement("button")
    isReadButton.classList.add("read-button")
    if (isRead) {
        isReadButton.textContent = "Read"
        isReadButton.classList.add("read")
    }
    else {
        isReadButton.textContent = "Not Read"
        isReadButton.classList.add("not-read")
    }

    isReadButton.addEventListener("click", () => {
        // The function for each book in library will be different
        // For the book at index 0, the function generated here will have selectedBook = library[0]
        // For index 1, selectedBook = library[1]
        // etc.
        const selectedBook = library[index]
        if (selectedBook.isRead) {
            isReadButton.classList.remove("read")
            isReadButton.classList.add("not-read")
            isReadButton.textContent = "Not Read"
        }
        else {
            isReadButton.classList.remove("not-read")
            isReadButton.classList.add("read")
            isReadButton.textContent = "Read"
        }
        selectedBook.toggleRead()
    })
    newBookCard.appendChild(isReadButton)

    const deleteButton = document.createElement("button")
    deleteButton.textContent = "Delete!"
    deleteButton.classList.add("delete-button")
    deleteButton.addEventListener("click", () => {
        // https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array
        library.splice(index, 1)
        // I don't think this will be very efficient when library.length is very high
        // But as I remember a programmer saying, premature optimization is the root of all evil :)
        updateDisplayedLibrary()
    })
    newBookCard.appendChild(deleteButton)

    bookCardArea.appendChild(newBookCard)
}

/*
function createTestCards() {
    for (let i = 0; i < 4; ++i) {
        const book = new Book(`Test ${i}`, "A. Man", (i + 1) * 10, false)
        library.push(book)
        createBookCard(i, book.title, book.author, book.pages, book.isRead)
    }
}

createTestCards()
*/