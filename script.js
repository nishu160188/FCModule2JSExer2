let timerInterval;
let timeRemaining = 15.0; // Set default time to 15 seconds
let isPaused = false;
const timerDisplay = document.getElementById('timer-display');
const fullTime = 15.0;

// Event listeners for buttons
document.getElementById('start-timer').addEventListener('click', startTimer);
document.getElementById('pause-timer').addEventListener('click', pauseTimer);
document.getElementById('reset-timer').addEventListener('click', resetTimer);

// Set up the progress circle
const progressCircle = document.querySelector('.progress-ring__circle');
const radius = progressCircle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;
progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
progressCircle.style.strokeDashoffset = circumference;

function setProgress(percent) {
    const offset = circumference - (percent / 100) * circumference;
    progressCircle.style.strokeDashoffset = offset;
}

function startTimer() {
    if (!timerInterval) {
        timerInterval = setInterval(countdown, 10);
    }
}

function countdown() {
    if (!isPaused && timeRemaining > 0) {
        timeRemaining -= 0.01;
        timerDisplay.textContent = timeRemaining.toFixed(2);
        setProgress((timeRemaining / fullTime) * 100);
    } else if (timeRemaining <= 0) {
        clearInterval(timerInterval);
        timerDisplay.textContent = "0.00";
        alert("Time's up!");
    }
}

function pauseTimer() {
    isPaused = !isPaused;
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    timeRemaining = fullTime;
    timerDisplay.textContent = timeRemaining.toFixed(2);
    setProgress(100);
    isPaused = false;
}
