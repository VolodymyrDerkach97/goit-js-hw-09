import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

require('flatpickr/dist/themes/material_red.css');

import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const inputEl = document.querySelector('#datetime-picker');

startBtn.disabled = true;
let selectDate = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const сurrentDate = Date.now();
    selectDate = selectedDates[0].getTime();

    if (сurrentDate >= selectDate) {
      startBtn.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
      return selectDate;
    } else {
      startBtn.disabled = false;
      Notiflix.Notify.success('The date is selected correctly, you can start');
    }
  },
};
flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', onStartTimer);

function onStartTimer() {
  inputEl.disabled = true;
  startBtn.disabled = true;
  const сurrentDate = Date.now();
  let differenceDate = selectDate - сurrentDate;
  updateTimerValue(differenceDate);
}

function updateTimerValue(differenceDate) {
  const id = setInterval(() => {
    differenceDate -= 1000;
    const { days, hours, minutes, seconds } = convertMs(differenceDate);
    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);

    if (differenceDate < 1000) {
      inputEl.disabled = false;
      clearInterval(id), Notiflix.Notify.info('The time is up');
    }
  }, 1000);
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
