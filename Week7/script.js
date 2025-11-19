const form = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const messageInput = document.getElementById("message");
const successMessage = document.getElementById("successMessage");

// Helper function to show/hide errors
function displayError(inputElement, message) {
    const errorDiv = document.getElementById(inputElement.id + "Error");
    const formGroup = inputElement.closest('.form-group');

    if (message) {
        errorDiv.textContent = message;
        formGroup.classList.add('invalid');
    } else {
        errorDiv.textContent = '';
        formGroup.classList.remove('invalid');
    }
}

// --- Validation Functions ---

function validateName() {
    const value = nameInput.value.trim();
    if (value === '') {
        displayError(nameInput, "Full Name is required.");
        return false;
    }
    displayError(nameInput, '');
    return true;
}

function validateEmail() {
    const value = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email pattern
    
    if (value === '') {
        displayError(emailInput, "Email is required.");
        return false;
    }
    if (!emailPattern.test(value)) {
        displayError(emailInput, "Please enter a valid email address.");
        return false;
    }
    displayError(emailInput, '');
    return true;
}

function validatePhone() {
    const value = phoneInput.value.trim();
    const phonePattern = /^\d{10}$/; // Exactly 10 digits
    
    if (value === '') {
        displayError(phoneInput, "Phone number is required.");
        return false;
    }
    if (!phonePattern.test(value)) {
        displayError(phoneInput, "Phone number must be exactly 10 digits.");
        return false;
    }
    displayError(phoneInput, '');
    return true;
}

function validateMessage() {
    const value = messageInput.value.trim();
    if (value === '') {
        displayError(messageInput, "Message is required.");
        return false;
    }
    if (value.length < 10) {
        displayError(messageInput, `Message must be at least 10 characters long. (Currently ${value.length})`);
        return false;
    }
    displayError(messageInput, '');
    return true;
}

// --- Main Form Submission Handler ---

function validateForm(e) {
    e.preventDefault(); // Stop the form from submitting normally

    // Run all validation checks and store their boolean results
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isMessageValid = validateMessage();

    // Check if ALL validations passed
    if (isNameValid && isEmailValid && isPhoneValid && isMessageValid) {
        // Validation successful!
        
        // Show success message
        successMessage.textContent = "Thank you! Your message has been sent successfully.";
        successMessage.style.display = 'block';

        // Clear the form inputs after a short delay
        setTimeout(() => {
            form.reset();
            successMessage.style.display = 'none';
        }, 3000); 

    } else {
        // Scroll to the first error if submission failed
        // (Optional but good for UX)
        const firstInvalid = document.querySelector('.form-group.invalid');
        if (firstInvalid) {
            firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}

// --- Event Listeners ---

// Main submission listener
form.addEventListener("submit", validateForm);

// Add real-time validation (on blur) for better user feedback
nameInput.addEventListener('blur', validateName);
emailInput.addEventListener('blur', validateEmail);
phoneInput.addEventListener('blur', validatePhone);
messageInput.addEventListener('blur', validateMessage);

// For phone input, only allow digits
phoneInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
});

// Initial validation checks on page load (optional)
validateName();
validateEmail();
validatePhone();
validateMessage();