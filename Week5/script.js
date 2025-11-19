const addCard = document.getElementById("addCard");
const addSection = document.getElementById("addSection");
const openAdd = document.getElementById("openAdd");
const step1 = document.querySelector(".step1");
const step2 = document.querySelector(".step2");
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");
const saveBtn = document.getElementById("saveBtn");
const addSubjectBtn = document.getElementById("addSubjectBtn");
const studentNameInput = document.getElementById("studentName");
const subjectsContainer = document.getElementById("subjectsContainer");
const studentList = document.getElementById("studentList");
const searchBar = document.getElementById("searchBar");

// Load students from Local Storage, or start with an empty array
let students = JSON.parse(localStorage.getItem("students")) || [];

// --- CRUD Functions ---

function deleteStudent(studentId) {
    // Filter out the student with the matching ID
    students = students.filter(student => student.id !== studentId);
    // Save the updated array back to local storage
    localStorage.setItem("students", JSON.stringify(students));
    // Re-render the list (which will also update the search results if the list was filtered)
    renderStudents(students);
}

// --- UI Toggle Functions ---

openAdd.addEventListener("click", () => {
    const isHidden = addSection.style.display === "none" || addSection.style.display === "";
    addSection.style.display = isHidden ? "block" : "none";
    
    step1.classList.add("active");
    step2.classList.remove("active");
    subjectsContainer.innerHTML = "";
    studentNameInput.value = "";
});

nextBtn.addEventListener("click", () => {
    if (studentNameInput.value.trim() === "") {
        alert("Please enter the student's name!");
        return;
    }
    step1.classList.remove("active");
    step2.classList.add("active");
    subjectsContainer.innerHTML = "";
    addSubjectRow();
});

backBtn.addEventListener("click", () => {
    step2.classList.remove("active");
    step1.classList.add("active");
});

// --- Subject Row Management ---

addSubjectBtn.addEventListener("click", addSubjectRow);

function addSubjectRow() {
    const div = document.createElement("div");
    div.classList.add("subject-row");
    div.innerHTML = `
        <input type="text" placeholder="Subject Name" class="subjectName" required />
        <input type="number" placeholder="Marks (0-100)" class="subjectMarks" min="0" max="100" required />
        <button type="button" class="removeSubjectBtn" style="background: #e74c3c; padding: 5px 10px; margin: 0 5px;">❌</button>
    `;
    subjectsContainer.appendChild(div);
    
    div.querySelector(".removeSubjectBtn").addEventListener("click", () => {
        div.remove();
        if (subjectsContainer.children.length === 0) {
            addSubjectRow();
        }
    });
}

// --- Save Student Logic ---

saveBtn.addEventListener("click", () => {
    const name = studentNameInput.value.trim();
    const subjects = [];
    let validationError = false;

    if (name === "") {
        alert("Please enter the student's name!");
        return;
    }

    document.querySelectorAll(".subject-row").forEach((row) => {
        const sub = row.querySelector(".subjectName").value.trim();
        const marksInput = row.querySelector(".subjectMarks").value.trim();
        const marks = parseFloat(marksInput);

        if (sub === "" && marksInput === "") {
            return; 
        }
        
        if (sub === "" || marksInput === "" || isNaN(marks) || marks < 0 || marks > 100) {
            validationError = true;
        } else {
            subjects.push({ sub, marks });
        }
    });

    if (validationError) {
        alert("Please ensure all subject names are entered and marks are valid numbers between 0 and 100.");
        return;
    }
    
    if (subjects.length === 0) {
        alert("Please add at least one valid subject!");
        return;
    }

    const total = subjects.reduce((sum, s) => sum + s.marks, 0);
    const avg = total / subjects.length;
    const grade = calculateGrade(avg);

    const student = {
        id: Date.now(), // Unique ID for deletion
        name,
        subjects,
        avg: avg.toFixed(2),
        grade,
    };

    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));
    renderStudents(students);

    // Reset UI
    studentNameInput.value = "";
    subjectsContainer.innerHTML = "";
    step1.classList.add("active");
    step2.classList.remove("active");
    addSection.style.display = "none";
});

// --- Helper Functions ---

function calculateGrade(avg) {
    if (avg >= 90) return "A+";
    if (avg >= 80) return "A";
    if (avg >= 70) return "B";
    if (avg >= 60) return "C";
    if (avg >= 50) return "D";
    return "F";
}

/**
 * Renders the student list. 
 * Includes a parameter 'isSearch' to control whether the sample card is shown.
 */
function renderStudents(list, isSearch = false) {
    studentList.innerHTML = ''; 
    
    // Only show the sample card if not currently searching and displaying the full list
    if (!isSearch) {
        const sampleCardHTML = `
            <div class="card sample-card">
                <h3>Sample Student</h3>
                <p><strong>Subjects:</strong> Math - 95, Science - 90</p>
                <p><strong>Average:</strong> 92.5%</p>
                <p><strong>Grade:</strong> A+</p>
            </div>
        `;
        studentList.innerHTML += sampleCardHTML;
    }
    
    list.forEach((student) => {
        const subDetails = student.subjects.map((s) => `${s.sub} - ${s.marks}`).join(", ");
        const card = document.createElement("div");
        card.classList.add("card");
        
        // Added the delete button with the student's ID for easy identification
        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <h3>${student.name}</h3>
                <button class="deleteBtn" data-id="${student.id}" style="background: #e74c3c; padding: 5px 8px; margin: 0; font-size: 14px; border-radius: 5px;">
                    🗑️
                </button>
            </div>
            <p><strong>Subjects:</strong> ${subDetails}</p>
            <p><strong>Average:</strong> ${student.avg}%</p>
            <p><strong>Grade:</strong> ${student.grade}</p>
        `;
        studentList.appendChild(card);
    });

    // Attach event listeners for the delete buttons after the cards are rendered
    document.querySelectorAll(".deleteBtn").forEach(button => {
        button.addEventListener("click", (e) => {
            const studentId = parseInt(e.currentTarget.dataset.id);
            if (confirm(`Are you sure you want to delete ${list.find(s => s.id === studentId)?.name}'s record?`)) {
                 deleteStudent(studentId);
            }
        });
    });
}

// --- Search Functionality ---

searchBar.addEventListener("input", () => {
    const query = searchBar.value.toLowerCase();
    
    if (query === "") {
        // If search is cleared, render the full list including the sample card
        renderStudents(students, false); 
        return;
    }
    
    const filtered = students.filter((s) => s.name.toLowerCase().includes(query));
    // Pass true to indicate a search, suppressing the sample card
    renderStudents(filtered, true); 
});

// Initial call to load saved students on page load
renderStudents(students);