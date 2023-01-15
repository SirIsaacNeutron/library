const openModalButton = document.querySelector("[data-modal-target]")
const overlay = document.getElementById("overlay")

let library = []

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
    e.preventDefault()
    const formData = new FormData(e.target)
    const formObject = Object.fromEntries(formData)

    // Checkboxes by default send "on" if they are checked
    // But if they are unchecked they will not even be recorded as a key in formObject
    let isRead = false
    if ("isRead" in formObject) {
        isRead = true
    }

    const bookObject = {
        ...formObject,
        isRead
    }

    console.log(bookObject)
})