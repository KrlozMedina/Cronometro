// let hourpan = document.querySelector('#hour');
// let minutpan = document.querySelector('#minut');
// let secondpan = document.querySelector('#second');
let milisecondSpan = document.querySelector('#milisecond');


let hourValue = 0;
let minutValue = 0;
let secondValue = 0;
let milisecondValue = 0;

let timerButton = document.querySelector('#timer-button');
const clock = document.querySelector('.clock');
let currentInterval;
let currentButton;
let menu = false;

function handleMenu(){
    const menuSpan = document.getElementById('menu');
    if (menu) {
        menuSpan.classList.remove('header--nav');
        menuSpan.classList.add('header--nav-none');

    } else {
        menuSpan.classList.add('header--nav')
        menuSpan.classList.remove('header--nav-none')
    }
    menu = !menu;
}

function formatValue(value){
    return ("0" + value).slice(-2);
}

let dateSpan = document.getElementById('date')
let daySpan = document.getElementById('day');
let monthSpan = document.getElementById('month');
let yearSpan = document.getElementById('year')
let hourSpan = document.getElementById('hour');
let minutSpan = document.getElementById('minut')
let secondSpan = document.getElementById('second')

const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'wednesday', 'Thursday', 'Friday', 'Saturday']
const monthString = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function date(){
    currentInterval = setInterval(() => {
        let today = new Date();
        dateSpan.textContent = dayOfWeek[today.getDay()]
        // daySpan.textContent = moment().format('DD MMM YYYY');
        daySpan.textContent = formatValue(today.getUTCDate() - 1)
        // clockSpan.textContent = moment().format('H:mm:ss')
        monthSpan.textContent = monthString[today.getMonth()]
        yearSpan.textContent = today.getFullYear()
        hourSpan.textContent = formatValue(today.getHours())
        minutSpan.textContent = formatValue(today.getMinutes())
        secondSpan.textContent = formatValue(today.getSeconds())

        // console.log(today.toString())
    }, 1000);
}

function startChronometer(){
    currentButton = event.target;
    currentButton.disabled = true;
    currentInterval = setInterval(() => {
        milisecondValue++;
        if(milisecondValue === 100){
            milisecondValue = 0;
            secondValue++;
            if(secondValue === 60){
                secondValue = 0;
                minutValue++;
                if(minutValue === 60){
                    minutValue = 0;
                    hourValue++;
                    hourSpan.textContent = formatValue(hourValue);
                }
                minutSpan.textContent = formatValue(minutValue);
            }
            secondSpan.textContent = formatValue(secondValue);
        }
        milisecondSpan.textContent = formatValue(milisecondValue);
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
    milisecondValue = 0;
    milisecondSpan.textContent = "00";
    secondValue = 0;
    secondSpan.textContent = "00";
    minutValue = 0;
    minutSpan.textContent = "00";
    hourValue = 0;
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

    const hour = valueIsNull(event.target.hour.value);
    const minute = valueIsNull(event.target.minute.value);
    const second = valueIsNull(event.target.second.value);

    // console.log(hour, minutes, seconds);

    clockButton = document.querySelector('.clock-controls');
    clockButton.innerHTML = '';
    button = document.createElement('button');
    button.type = 'button';
    button.style.backgroundColor = 'red';
    button.textContent = 'Stop';
    button.onclick = () => stopTimer();
    clockButton.appendChild(button);

    // console.log('start');
    
    // console.log(minutes, seconds);
    hourSpan.textContent = formatValue(hour);
    minutSpan.textContent = formatValue(minute);
    secondSpan.textContent = formatValue(second);

    hourValue = hour;
    secondValue = second;
    minutValue = minute;

    if(hourValue == null){
        console.log('entro');
    }

    currentInterval = setInterval(() => {
        if(secondValue === 0){
            if(minutValue === 0){
                if(hourValue === 0){
                    stopTimer();
                    console.log('El timer ha termiando')
                } else {
                    hourValue--;
                    minutesValue = 59;
                }
            } else {
                minutValue--;
                secondValue = 59;
            }
        } else {
            secondValue--;
        }
        secondSpan.textContent = formatValue(secondValue);
        minutSpan.textContent = formatValue(minutValue);
        hourSpan.textContent = formatValue(hourValue);
    }, 1000);
}

function stopTimer(){
    // event.preventDefault();
    // console.log('stop');
    clearInterval(currentInterval);
    minutSpan.textContent = '00';
    secondSpan.textContent = '00';
    secondValue = 0;
    minutValue = 0;

    clockButton = document.querySelector('.clock-controls');
    clockButton.innerHTML = '';
    button = document.createElement('button');
    button.type = 'submit';
    button.style.backgroundColor = 'green';
    button.textContent = 'Start';
    // button.onclick = () => startTimer();
    clockButton.appendChild(button);
}

function executeChronometer(){
    stopTimer();

    clock.innerHTML =`
    <h1>Chronometer</h1>
    <p class="clock-digital">
        <span id="hour">00</span>:<span id="minut">00</span>:<span id="second">00</span>.<span id="milisecond">00</span>
    </p>
    <div class="clock-controls">
        <button type="button" onclick="startChronometer()" style="background-color: green;">Start</button>
        <button type="button" onclick="stopChronometer()" style="background-color: red;">Stop</button>
        <button type="button" onclick="resetChronometer()" style="background-color: yellow;">Reset</button>
    </div>`

    hourSpan = document.querySelector('#hour');
    secondSpan = document.querySelector('#second');
    minutSpan = document.querySelector('#minut');
    milisecondSpan = document.querySelector('#milisecond');
}

function executeTimer(){
    resetChronometer();
    
    clock.innerHTML =`
    <h1>Timer</h1>
    <p class="clock-digital">
        <span id="hour">00</span>:<span id="minut">00</span>:<span id="second">00</span>
    </p>
    <form class="formControls" onsubmit="startTimer()">
        <div class="clock-inputs">
            <input type="number" placeholder="Hrs" id="hourInput" name="hour">
            <input type="number" placeholder="Min" id="minutInput" name="minute">
            <input type="number" placeholder="Sec" id="secondInput" name="second">
        </div>
        <div class="clock-controls">
            <button type="submit" style="background-color: green;">Start</button>
        </div>
    </form>`;

    hourSpan = document.querySelector('#hour');
    secondSpan = document.querySelector('#second');
    minutSpan = document.querySelector('#minut');
}

date()