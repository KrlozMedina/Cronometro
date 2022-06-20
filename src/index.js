let hourSpan = document.querySelector('#hours');
let minutsSpan = document.querySelector('#minuts');
let secondsSpan = document.querySelector('#seconds');
let milisecondsSpan = document.querySelector('#miliseconds');

let hoursValue = 0;
let minutsValue = 0;
let secondsValue = 0;
let milisecondsValue = 0;

let timerButton = document.querySelector('#timer-button');
const clock = document.querySelector('#clock');
let currentInterval;
let currentButton;

function formatValue(value){
    return ("0" + value).slice(-2);
}

function startChronometer(){
    currentButton = event.target;
    currentButton.disabled = true;
    currentInterval = setInterval(() => {
        milisecondsValue++;
        if(milisecondsValue === 100){
            milisecondsValue = 0;
            secondsValue++;
            if(secondsValue === 60){
                secondsValue = 0;
                minutsValue++;
                if(minutsValue === 60){
                    minutsValue = 0;
                    hoursValue++;
                    hourSpan.textContent = formatValue(hoursValue);
                }
                minutsSpan.textContent = formatValue(minutsValue);
            }
            secondsSpan.textContent = formatValue(secondsValue);
        }
        milisecondsSpan.textContent = formatValue(milisecondsValue);
    }, 10);
}

function stopChronometer(){
    clearInterval(currentInterval);
    currentButton.disabled = false;
}

function resetChronometer(){
    // console.log(typeof(currentInterval));

    clearInterval(currentInterval);
    // currentButton.disabled = false;
    milisecondsValue = 0;
    milisecondsSpan.textContent = '00';
    secondsValue = 0;
    secondsSpan.textContent = "00";
    minutsValue = 0;
    minutsSpan.textContent = "00";
    hoursValue = 0;
    hourSpan.textContent = "00";
}

function valueIsNull(value){
    if(value === ''){
        value = 0;
    } else {
    parseInt(value);
    }
    return value;
}

function startTimer(){
    event.preventDefault();

    const hours = valueIsNull(event.target.hours.value);
    const minutes = valueIsNull(event.target.minutes.value);
    const seconds = valueIsNull(event.target.seconds.value);

    // console.log(hours, minutes, seconds);

    containerButton = document.querySelector('.container-controls');
    containerButton.innerHTML = '';
    button = document.createElement('button');
    button.type = 'button';
    button.style.backgroundColor = 'red';
    button.textContent = 'Stop';
    button.onclick = () => stopTimer();
    containerButton.appendChild(button);

    // console.log('start');
    
    // console.log(minutes, seconds);
    hourSpan.textContent = formatValue(hours);
    minutsSpan.textContent = formatValue(minutes);
    secondsSpan.textContent = formatValue(seconds);

    hoursValue = hours;
    secondsValue = seconds;
    minutsValue = minutes;

    if(hoursValue == null){
        console.log('entro');
    }

    currentInterval = setInterval(() => {
        if(secondsValue === 0){
            if(minutsValue === 0){
                if(hoursValue === 0){
                    stopTimer();
                    console.log('El timer ha termiando')
                } else {
                    hoursValue--;
                    minutesValue = 59;
                }
            } else {
                minutsValue--;
                secondsValue = 59;
            }
        } else {
            secondsValue--;
        }
        secondsSpan.textContent = formatValue(secondsValue);
        minutsSpan.textContent = formatValue(minutsValue);
        hourSpan.textContent = formatValue(hoursValue);
    }, 1000);
}

function stopTimer(){
    // event.preventDefault();
    // console.log('stop');
    clearInterval(currentInterval);
    minutsSpan.textContent = '00';
    secondsSpan.textContent = '00';
    secondsValue = 0;
    minutsValue = 0;

    containerButton = document.querySelector('.container-controls');
    containerButton.innerHTML = '';
    button = document.createElement('button');
    button.type = 'submit';
    button.style.backgroundColor = 'green';
    button.textContent = 'Start';
    // button.onclick = () => startTimer();
    containerButton.appendChild(button);
}

function executeChronometer(){
    stopTimer();

    clock.innerHTML =`
    <h1>Chronometer</h1>
    <p class="clock-digital">
        <span id="hours">00</span>:<span id="minuts">00</span>:<span id="seconds">00</span>.<span id="miliseconds">00</span>
    </p>
    <div class="container-controls">
        <button type="button" onclick="startChronometer()" style="background-color: green;">Start</button>
        <button type="button" onclick="stopChronometer()" style="background-color: red;">Stop</button>
        <button type="button" onclick="resetChronometer()" style="background-color: yellow;">Reset</button>
    </div>`

    hourSpan = document.querySelector('#hours');
    secondsSpan = document.querySelector('#seconds');
    minutsSpan = document.querySelector('#minuts');
    milisecondsSpan = document.querySelector('#miliseconds');
}

function executeTimer(){
    resetChronometer();

    clock.innerHTML =`
    <h1>Timer</h1>
    <p class="clock-digital">
        <span id="hours">00</span>:<span id="minuts">00</span>:<span id="seconds">00</span>
    </p>
    <form class="formControls" onsubmit="startTimer()">
        <div class="container-inputs">
            <input type="number" placeholder="Hrs" id="hoursInput" name="hours">
            <input type="number" placeholder="Min" id="minutsInput" name="minutes">
            <input type="number" placeholder="Sec" id="secondsInput" name="seconds">
        </div>
        <div class="container-controls">
            <button type="submit" style="background-color: green;">Start</button>
        </div>
    </form>`;

    hourSpan = document.querySelector('#hours');
    secondsSpan = document.querySelector('#seconds');
    minutsSpan = document.querySelector('#minuts');
}

