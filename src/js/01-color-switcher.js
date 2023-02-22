const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

startBtn.addEventListener('click', onUpdateBgColor);
stopBtn.addEventListener('click', onStopUpdateBgColor);

function onUpdateBgColor() {
  return (id = setInterval(() => {
    document.body.style.backgroundColor = `${getRandomHexColor()}`,

    startBtn.disabled = true;
    stopBtn.disabled = false;
  }, 1000));
}

function onStopUpdateBgColor() {
  clearInterval(id);

  startBtn.disabled = false;
  stopBtn.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
