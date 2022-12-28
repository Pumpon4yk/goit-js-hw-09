import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form')

form.addEventListener('submit', submitForm)

function submitForm(e) {
    e.preventDefault();
    const { elements: { delay, step, amount } } = e.currentTarget;
    let d = Number(delay.value);

    for (let i = 1; i <= amount.value; i++) {
        createPromise(i, d)
            .then((yes) => {
                Notify.success(yes)
            })
            .catch((no) => {
                Notify.failure(no)
            })
        d += Number(step.value)
    }
    e.currentTarget.reset()
}

function createPromise(position, delay) {
    const yes = `✅ Fulfilled promise ${position} in ${delay}ms`;
    const no = `❌ Rejected promise ${position} in ${delay}ms`;

    const promise = new Promise((res, rej) => {
        const shouldResolve = Math.random() > 0.3;

        setTimeout(() => {
            if (shouldResolve) {
                // Fulfill
                res(yes);
            } else {
                // Reject
                rej(no);
            }
        }, delay)
    })
    return promise;
}