const noteInput = document.getElementById("noteInput");
const addNoteBtn = document.getElementById("addNoteBtn");
const notesContainer = document.getElementById("notesContainer");

// Key used to store and retrieve data in Local Storage
const STORAGE_KEY = 'userNotes';

// --- Data Handling ---

/**
 * Loads notes from Local Storage.
 * Returns an array or an empty array if nothing is found.
 */
function loadNotes() {
    const notesJSON = localStorage.getItem(STORAGE_KEY);
    // Use JSON.parse to convert the string back into a JavaScript array
    return notesJSON ? JSON.parse(notesJSON) : [];
}

/**
 * Saves the current notes array to Local Storage.
 */
function saveNotes(notesArray) {
    // Use JSON.stringify to convert the JavaScript array into a JSON string
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notesArray));
}

// --- Rendering and UI ---

/**
 * Formats a timestamp into a readable date string.
 */
function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}

/**
 * Renders all notes onto the page.
 */
function renderNotes() {
    const notes = loadNotes();
    notesContainer.innerHTML = ''; // Clear the container

    notes.forEach(note => {
        const card = document.createElement("div");
        card.classList.add("note-card");
        
        card.innerHTML = `
            <p>${note.text}</p>
            <div class="note-footer">
                <span>${formatDate(note.timestamp)}</span>
                <button data-id="${note.id}">Delete</button>
            </div>
        `;
        
        // Attach the delete event listener to the button
        const deleteBtn = card.querySelector('button');
        deleteBtn.addEventListener('click', (e) => {
            const idToDelete = parseInt(e.target.dataset.id);
            deleteNote(idToDelete);
        });

        notesContainer.appendChild(card);
    });
}

// --- CRUD Actions ---

/**
 * Adds a new note to the array and updates storage/UI.
 */
function addNote() {
    const text = noteInput.value.trim();
    
    if (text === "") {
        alert("Please enter some content for your note!");
        return;
    }

    const newNote = {
        id: Date.now(), // Unique ID using timestamp
        text: text,
        timestamp: Date.now()
    };

    const notes = loadNotes();
    notes.unshift(newNote); // Add new note to the beginning
    
    saveNotes(notes);
    renderNotes();
    noteInput.value = ""; // Clear the input
}

/**
 * Deletes a note based on its ID.
 */
function deleteNote(id) {
    if (confirm("Are you sure you want to delete this note?")) {
        let notes = loadNotes();
        // Filter out the note with the matching ID
        notes = notes.filter(note => note.id !== id);
        
        saveNotes(notes);
        renderNotes(); // Update the UI
    }
}


// --- Event Listeners ---

addNoteBtn.addEventListener('click', addNote);

// Allow adding note with Enter key
noteInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { // Allow Shift+Enter for new line
        e.preventDefault(); 
        addNote();
    }
});

// --- Initialization ---
// Load and display all persistent notes when the page first loads
renderNotes();