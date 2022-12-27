import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    startBtn: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};

const TIME_DELAY = 1000;
let timer = 0;
let id = null

refs.startBtn.addEventListener('click', onStart);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {

        if (selectedDates[0] <= options.defaultDate) {
            return Notify.failure("Please choose a date in the future");;
        }

        timer = selectedDates[0] - new Date();
        refs.startBtn.removeAttribute('disabled');
    },
};

flatpickr('#datetime-picker', options);

function onStart() {
    id = setInterval(setTime, TIME_DELAY);
    console.log("🚀 ~ onStart ~ id", id)
    refs.startBtn.setAttribute('disabled', 'disabled');
}

function setTime(){

    timeRec(timer)
    stopTime(timer)
    const { days, hours, minutes, seconds } = convertMs(timer);
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;
}


function stopTime(params) {
    if (params <= 1000) {
        Notify.success('Timer STOP')
        return clearInterval(id)
    }
}

function timeRec(params) {
    timer = params - TIME_DELAY;
    return timer
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    
    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(
        Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
}
