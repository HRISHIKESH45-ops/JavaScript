// --- Digital Clock Logic ---

const digitalClockDisplay = document.getElementById("digitalClock");

/**
 * Gets the current time and formats it as HH:MM:SS AM/PM.
 */
function updateClock() {
    const now = new Date(); // Using the Date object
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'

    // Add leading zero if less than 10
    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');

    const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;
    digitalClockDisplay.textContent = timeString;
}

// Update the clock every second using setInterval
setInterval(updateClock, 1000);
updateClock(); // Call immediately to avoid a 1-second delay on load


// --- Stopwatch Logic ---

const stopwatchDisplay = document.getElementById("stopwatchDisplay");
const startStopBtn = document.getElementById("startStopBtn");
const resetBtn = document.getElementById("resetBtn");

let startTime;
let elapsedTime = 0; // Stores the elapsed time in milliseconds
let timerInterval;

/**
 * Formats milliseconds into HH:MM:SS.msms format.
 */
function formatTime(ms) {
    const totalMilliseconds = ms;
    const hours = Math.floor(totalMilliseconds / 3600000);
    const minutes = Math.floor((totalMilliseconds % 3600000) / 60000);
    const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
    const milliseconds = Math.floor((totalMilliseconds % 1000) / 10); // Displaying only two digits for milliseconds

    const pad = (num) => String(num).padStart(2, '0');

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`;
}

/**
 * Core function to update the stopwatch display.
 */
function printTime() {
    elapsedTime = Date.now() - startTime;
    stopwatchDisplay.textContent = formatTime(elapsedTime);
}

/**
 * Starts the stopwatch.
 */
function startStopwatch() {
    // Set the start time based on the current time minus any previously elapsed time
    startTime = Date.now() - elapsedTime; 
    
    // Use setInterval to call printTime every 10 milliseconds for high precision
    timerInterval = setInterval(printTime, 10); 
    
    startStopBtn.textContent = 'Stop';
    startStopBtn.classList.remove('start');
    startStopBtn.classList.add('stop');
    resetBtn.disabled = true;
}

/**
 * Stops the stopwatch.
 */
function stopStopwatch() {
    clearInterval(timerInterval); // Stop the interval
    startStopBtn.textContent = 'Start';
    startStopBtn.classList.remove('stop');
    startStopBtn.classList.add('start');
    resetBtn.disabled = false;
}

/**
 * Resets the stopwatch to 00:00:00.00.
 */
function resetStopwatch() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    stopwatchDisplay.textContent = formatTime(elapsedTime);
    
    startStopBtn.textContent = 'Start';
    startStopBtn.classList.remove('stop');
    startStopBtn.classList.add('start');
    resetBtn.disabled = true;
}

// --- Event Listeners ---

startStopBtn.addEventListener('click', () => {
    if (startStopBtn.textContent === 'Start') {
        startStopwatch();
    } else {
        stopStopwatch();
    }
});

resetBtn.addEventListener('click', resetStopwatch);