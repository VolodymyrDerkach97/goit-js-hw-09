const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

startBtn.addEventListener('click', onUpdateBgColor);
stopBtn.addEventListener('click', onStopUpdateBgColor);
let intervalId = 0;

function onUpdateBgColor() {
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = `${getRandomHexColor()}`;
    startBtn.disabled = true;
    stopBtn.disabled = false;
  }, 1000);
}

function onStopUpdateBgColor() {
  clearInterval(intervalId);

  startBtn.disabled = false;
  stopBtn.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
