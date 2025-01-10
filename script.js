let notes = [];
const emptyContainer = document.querySelector('.empty');
function updateEmptyContainer() {
    if (notes.length === 0) {
        emptyContainer.style.visibility = 'visible';
    } else {
        emptyContainer.style.visibility = 'hidden';
    }
}

function createPopup(id) { 
    const popupNode = document.querySelector(id);
    const overlay = popupNode.querySelector(".overlay");
    const cancel = popupNode.querySelector(".cancel");
    const apply = popupNode.querySelector(".apply");

    function openPopup() {
        popupNode.classList.add("active");
    }

    function closePopup() {
        popupNode.classList.remove("active");
    }

    function addNotes() {
        const urNote = document.getElementById('urNote');
        const text = urNote.value.trim();
        if (text) {
            notes.push({ text, completed: false });
            urNote.value = ''; 
            updateNotes();
        }
    }

    overlay.addEventListener("click", closePopup);
    cancel.addEventListener("click", closePopup);
    apply.addEventListener("click", function() {
        addNotes();
        closePopup();
    });

    return openPopup;
}

function deleteNote(index) {
    notes.splice(index, 1);
    updateNotes();
    updateStats();
}

function editNote(index) {
    const urNote = document.getElementById('urNote');
    urNote.value = notes[index].text;
    notes.splice(index, 1);
    updateNotes();
    updateStats();
}

function updateNotes() {
    const noteList = document.getElementById("list-container");
    noteList.innerHTML = ''; 
    notes.forEach((note, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div class="Note-Item">
                <div class="note ${note.completed ? 'completed' : ''}">
                    <input type="checkbox" class="checkbox" ${note.completed ? "checked" : ""} />
                    <span>${note.text}</span>
                    <button onclick="editNote(${index})"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#D0DDD0"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg></button>
                    <button onclick="deleteNote(${index})"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#D0DDD0"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
                </div>
            </div>
        `;
        noteList.appendChild(listItem);
    });
}
updateEmptyContainer();
function updateStats() {
    const completeTasks = notes.filter(note => note.completed).length;
    const totalTasks = notes.length;
}



const popup = createPopup("#popup");
document.querySelector("#add").addEventListener("click", popup);
updateEmptyContainer();



