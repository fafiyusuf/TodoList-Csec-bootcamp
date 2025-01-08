function createPopup(id) { 
    const popupNode = document.querySelector(id);
    const overlay = popupNode.querySelector(".overlay");
    const cancel = popupNode.querySelector(".cancel");

    function openPopup() {
        popupNode.classList.add("active");
    }

    function closePopup() {
        popupNode.classList.remove("active");
    }

    overlay.addEventListener("click", closePopup);
    cancel.addEventListener("click", closePopup);

    return openPopup;
}

const popup = createPopup("#popup");
document.querySelector("#add").addEventListener("click", popup);