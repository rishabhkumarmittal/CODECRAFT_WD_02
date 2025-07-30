let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById("display");
const lapList = document.getElementById("lapTimes");

function timeToString(time) {
  let diffInHrs = time / 3600000;
  let hh = Math.floor(diffInHrs);

  let diffInMin = (diffInHrs - hh) * 60;
  let mm = Math.floor(diffInMin);

  let diffInSec = (diffInMin - mm) * 60;
  let ss = Math.floor(diffInSec);

  let diffInMs = (diffInSec - ss) * 100;
  let ms = Math.floor(diffInMs);

  let formatted =
    `${String(hh).padStart(2, '0')}:` +
    `${String(mm).padStart(2, '0')}:` +
    `${String(ss).padStart(2, '0')}.` +
    `${String(ms).padStart(2, '0')}`;
  return formatted;
}

function start() {
  if (isRunning) return;
  isRunning = true;
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    display.textContent = timeToString(elapsedTime);
  }, 10);
}

function pause() {
  if (!isRunning) return;
  isRunning = false;
  clearInterval(timerInterval);
}

function reset() {
  isRunning = false;
  clearInterval(timerInterval);
  display.textContent = "00:00:00.00";
  elapsedTime = 0;
  lapList.innerHTML = "";
}

function recordLap() {
  if (!isRunning) return;
  const lapTime = timeToString(elapsedTime);
  const li = document.createElement("li");
  li.textContent = `Lap ${lapList.children.length + 1}: ${lapTime}`;
  lapList.appendChild(li);
}

// Button Event Listeners
document.getElementById("start").addEventListener("click", start);
document.getElementById("pause").addEventListener("click", pause);
document.getElementById("reset").addEventListener("click", reset);
document.getElementById("lap").addEventListener("click", recordLap);
