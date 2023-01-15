const openModalButton = document.querySelector("[data-modal-target]")
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

overlay.addEventListener("click", () => {
    if (overlay.classList.contains("active")) {
        const modal = document.getElementById("modal")
        closeModal(modal)
    }
})

