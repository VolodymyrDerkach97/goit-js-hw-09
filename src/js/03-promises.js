import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

  promise
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}

const form = document.querySelector('.form');
let position = 0;

form.addEventListener('submit', startCreatePromise);

function startCreatePromise(e) {
  e.preventDefault();

  const valueAmount = Number(form.elements.namedItem('amount').value);
  const valueStep = Number(form.elements.namedItem('step').value);
  let valueDelay = Number(form.elements.namedItem('delay').value);

  const id = setInterval(() => {
    position += 1;
    if (position <= valueAmount) {
      createPromise(position, valueDelay);
      valueDelay += valueStep;
    } else {
      position = 0;
      clearInterval(id);
    }
  }, 0);
}
