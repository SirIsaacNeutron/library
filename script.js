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

function Book(title, author, pages, isRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead
}

modalForm.addEventListener("submit", e => {
    addBookToLibrary(e)
    const modal = document.getElementById("modal")
    closeModal(modal)
    modalForm.reset() // when user re-opens form, it will be blank
})


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

    const bookCardArea = document.querySelector("main")
    library.forEach((book, index) => {
        const newBookCard = document.createElement("div")
        newBookCard.classList.add("book-card")

        const title = document.createElement("h2")
        title.textContent = book.title
        newBookCard.appendChild(title)

        const author = document.createElement("p")
        author.textContent = book.author
        newBookCard.appendChild(author)

        const pages = document.createElement("p")
        pages.textContent = book.pages
        newBookCard.appendChild(pages)

        const isRead = document.createElement("p")
        isRead.textContent = book.isRead
        newBookCard.appendChild(isRead)

        bookCardArea.appendChild(newBookCard)
    })
}