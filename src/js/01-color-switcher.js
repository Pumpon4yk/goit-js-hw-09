const refs = {
    body: document.querySelector('body'),
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
};

let timerId = null;

refs.startBtn.addEventListener('click', onStart);
refs.stopBtn.addEventListener('click', onStop);

function onStart() {
    refs.startBtn.setAttribute('disabled', 'disabled');
    refs.stopBtn.removeAttribute('disabled');
    timerId = setInterval(bodyBg, 1000);
}

function onStop() {
    clearInterval(timerId);
    refs.startBtn.removeAttribute('disabled');
    refs.stopBtn.setAttribute('disabled', 'disabled');
}

function bodyBg() {
    refs.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
