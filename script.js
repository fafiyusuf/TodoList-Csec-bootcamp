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
}

function editNote(index) {
    const urNote = document.getElementById('urNote');
    urNote.value = notes[index].text;
    notes.splice(index, 1);
    updateNotes();
    openPopup();

}

function updateNotes() {
    const noteList = document.getElementById("list-container");
    noteList.innerHTML = ''; 
    notes.forEach((note, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div class="Note-Item">
                <div class="note ${note.completed ? 'completed' : ''}">
                   <div> <input type="checkbox" class="checkbox" ${note.completed ? "checked" : ""} />
                    <span>${note.text}</span></div>
                    <div><button onclick="editNote(${index})"><span class="material-symbols-outlined">edit</span></button>
                    <button onclick="deleteNote(${index})"><span class="material-symbols-outlined">delete</span></button></div>
                   
                </div><br> <hr>
            </div>
        `;
        noteList.appendChild(listItem);
    });
}
// updateEmptyContainer();
// function updateStats() {
//     const completeTasks = notes.filter(note => note.completed).length;
//     const totalTasks = notes.length;
// }



const popup = createPopup("#popup");
document.querySelector("#add").addEventListener("click", popup);
updateEmptyContainer();

let page = document.querySelector('body');
let themeButton = document.querySelector('#mode');
let themeIcon = themeButton.querySelector('.material-symbols-outlined');
if (!page.classList.contains('dark-theme')) {
    page.classList.add('light-theme');
    themeIcon.textContent = "dark_mode";
  }
themeButton.onclick = function() {
  console.log('Button is clicked!');
  if (page.classList.contains('dark-theme')) {
    page.classList.remove('dark-theme');
    page.classList.add('light-theme');
    themeIcon.textContent="dark_mode";
} else {
    page.classList.remove('light-theme');
    page.classList.add('dark-theme');
    themeIcon.textContent = "light_mode";
  
}
};



