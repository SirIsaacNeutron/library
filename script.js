const openModalButton = document.querySelector("[data-modal-target]")
const closeModalButton = document.querySelector("[data-close-button")
const overlay = document.getElementById("overlay")

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

closeModalButton.addEventListener("click", () => {
    const modal = document.getElementById("modal")
    closeModal(modal)
})

overlay.addEventListener("click", () => {
    if (overlay.classList.contains("active")) {
        const modal = document.getElementById("modal")
        closeModal(modal)
    }
})

