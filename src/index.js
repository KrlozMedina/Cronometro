let secondsSpan = document.querySelector('#seconds');
let minutsSpan = document.querySelector('#minuts');
let timerButton = document.querySelector('#timer-button');
const reloj = document.querySelector('#reloj');
let secondsValue = 0;
let minutsValue = 0;
let currentInterval;
let currentButton;

function formatValue(value){
    return ("0" + value).slice(-2);
}

function startChronometer(){
    currentButton = event.target;
    currentButton.disabled = true;
    currentInterval = setInterval(() => {
        secondsValue++;
        if(secondsValue === 60){
            secondsValue = 0;
            minutsValue++;
            minutsSpan.textContent = formatValue(minutsValue);
        }
        secondsSpan.textContent = formatValue(secondsValue);
    }, 1000);
}

function stopChronometer(){
    clearInterval(currentInterval);
    currentButton.disabled = false;
}

function resetChronometer(){
    secondsValue = 0;
    secondsSpan.textContent = "00";
    minutsValue = 0;
    minutsSpan.textContent = "00";
}

function startTimer(){
    event.preventDefault();
    // console.log('start');
    const minutes = parseInt(event.target.minutes.value);
    const seconds = parseInt(event.target.seconds.value);
    // console.log(minutes, seconds);
    minutsSpan.textContent = minutes;
    secondsSpan.textContent = seconds;
    secondsValue = seconds;
    minutsValue = minutes;

    currentInterval = setInterval(() => {
        secondsValue--;
        if(secondsValue === 0){
            secondsValue = 59;
            minutsValue--;
        }
        if(minutsValue === 0 && secondsValue === 0){
            alert('Time is over');
            clearInterval(currentInterval);
        }
        minutsSpan.textContent = formatValue(minutsValue);
        secondsSpan.textContent = formatValue(secondsValue);
    }, 1000);
}

function executeTimer(){
    reloj.innerHTML =`
    <h1>Timer</h1>
    <p>
        <span id="hours">00</span>:<span id="minuts">00</span>:<span id="seconds">00</span>
    </p>
    <div>
    <form onsubmit="startTimer()">
        <input type="number" placeholder="Minuts" id="minutsInput" name="minutes">
        <input type="number" placeholder="Seconds" id="secondsInput" name="seconds">
        <button type="submit">Start</button>
    </form>
    </div>`;
    secondsSpan = document.querySelector('#seconds');
    minutsSpan = document.querySelector('#minuts');
}