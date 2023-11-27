const clock = document.querySelector('.clock');

let dateSpan = document.getElementById('date')
let daySpan = document.getElementById('day');
let monthSpan = document.getElementById('month');
let yearSpan = document.getElementById('year')
let hourSpan = document.getElementById('hour');
let minutSpan = document.getElementById('minut')
let secondSpan = document.getElementById('second')
let milisecondSpan = document.querySelector('#milisecond');

let inputDay = document.getElementById('dayInput');
let inputMonth = document.getElementById('monthInput');
let inputYear = document.getElementById('yearInput');

let hourValue = 0;
let minutValue = 0;
let secondValue = 0;
let milisecondValue = 0;

let currentInterval;
let currentButton;
let menu = false;

const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'wednesday', 'Thursday', 'Friday', 'Saturday']
const monthString = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// Functions
function formatValue(value){
    return ("0" + value).slice(-2);
}

function valueIsNull(value){
    if(value === ''){
        value = 0;
    } else {
    parseInt(value);
    }
    return value;
}

// Menu
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

// Date and Hour
function date(){
    currentInterval = setInterval(() => {
        let today = new Date();
        dateSpan.textContent = dayOfWeek[today.getDay()]
        daySpan.textContent = formatValue(today.getUTCDate())
        monthSpan.textContent = monthString[today.getMonth()]
        yearSpan.textContent = today.getFullYear()
        hourSpan.textContent = formatValue(today.getHours())
        minutSpan.textContent = formatValue(today.getMinutes())
        secondSpan.textContent = formatValue(today.getSeconds())
    }, 1000);
}

// Chronometer
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
    clearInterval(currentInterval);

    try {
        stopChronometer()
    } catch (error) {

    }
    
    milisecondValue = 0;
    milisecondSpan.textContent = "00";
    secondValue = 0;
    secondSpan.textContent = "00";
    minutValue = 0;
    minutSpan.textContent = "00";
    hourValue = 0;
    hourSpan.textContent = "00";
}

// Timer
function startTimer(){
    event.preventDefault();

    const hour = valueIsNull(event.target.hour.value);
    const minute = valueIsNull(event.target.minute.value);
    const second = valueIsNull(event.target.second.value);

    clockButton = document.querySelector('.clock-controls');
    clockButton.innerHTML = '';
    button = document.createElement('button');
    button.type = 'button';
    button.style.backgroundColor = 'red';
    button.textContent = 'Stop';
    button.onclick = () => stopTimer();
    clockButton.appendChild(button);
    hourSpan.textContent = formatValue(hour);
    minutSpan.textContent = formatValue(minute);
    secondSpan.textContent = formatValue(second);
    hourValue = hour;
    secondValue = second;
    minutValue = minute;

    // if(hourValue == null){
    //     console.log('entro');
    // }

    currentInterval = setInterval(() => {
        if(secondValue === 0){
            if(minutValue === 0){
                if(hourValue === 0){
                    stopTimer();
                } else {
                    hourValue--;
                    minutValue = 59;
                    secondValue = 59;
                }
            } else {
                minutValue--;
                secondValue = 59;
            }
            // console.log(minutValue)
        } else {
            secondValue--;
        }
        secondSpan.textContent = formatValue(secondValue);
        minutSpan.textContent = formatValue(minutValue);
        hourSpan.textContent = formatValue(hourValue);
    }, 1000);
}

function stopTimer(){
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
    clockButton.appendChild(button);
}

// Time for
function timeFor(day, month, year) {
    month = month - 1;
    currentInterval = setInterval(() => {
        let today = new Date();

        if(year === undefined) {
            year = today.getFullYear()
        }
        if(month === undefined) {
            month = today.getMonth()
        }
        if(day === undefined) {
            day = today.getDate()
        }

        let date = new Date(year, month, day);
        let forDate = date.getTime() - today.getTime()

        let miliseconds = forDate % 1000
        let secondsForDate = (forDate - miliseconds) / 1000;        
        let seconds = secondsForDate % 60;
        let minutsForDate = (secondsForDate - seconds) / 60
        let minuts = minutsForDate % 60;
        let hoursForDate = (minutsForDate - minuts) / 60
        let hours = hoursForDate % 24;
        let daysForDate = (hoursForDate - hours) / 24
        let days = daysForDate % 30;
        let monthsForDate = (daysForDate - days) / 30
        let months = monthsForDate % 12
        let yearsForDate = (monthsForDate - months) / 12
    
        yearSpan.textContent = yearsForDate;
        monthSpan.textContent = months;
        daySpan.textContent = days;
        hourSpan.textContent = hours;
        minutSpan.textContent = minuts;
        secondSpan.textContent = seconds;
    })
}

function dateMain(){
    let dateMain = document.getElementById('selectForDate')
    console.log(dateMain.value)
    clearInterval(currentInterval);

    inputDay = document.getElementById('dayInput');
    inputMonth = document.getElementById('monthInput');
    inputYear = document.getElementById('yearInput');

    inputDay.value = ''
    inputMonth.value = ''
    inputYear.value = ''

    switch (dateMain.value) {
        case 'christmas':
            timeFor(24, 12);
            break;
        case 'birthday':
            timeFor(16, 12);
            break;
        case 'endYear':
            timeFor(31, 12);
            break;
        case 'princessDay':
            timeFor(18, 1);
            break;
        default:
            break;
    }
}

function setDate(){
    let today = new Date;
    
    inputDay = document.getElementById('dayInput');
    inputMonth = document.getElementById('monthInput');
    inputYear = document.getElementById('yearInput');

    let setDay = parseInt(inputDay.value) || today.getDate();
    let setMonth = parseInt(inputMonth.value) || today.getMonth() + 1;
    let setYear = parseInt(inputYear.value) || today.getFullYear();

    console.log(setDay, setMonth, setYear)

    clearInterval(currentInterval);
    timeFor(setDay, setMonth, setYear)
}

// Execute clocks
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

function executeForDate(){
    stopTimer();
    resetChronometer();

    clock.innerHTML = `
    <h1>Time until</h1> 
    <div class="clock-digital">
        <div><h6>Years</h6><span id="year">00</span></div>
        <div><h6>Months</h6><span id="month">00</span></div>
        <div><h6>Days</h6><span id="day">00</span></div>
    </div>
    <div class="clock-digital">
        <div><h6>Hours</h6><span id="hour">00</span></div>
        <div><h6>Minuts</h6><span id="minut">00</span></div>
        <div><h6>Seconds</h6><span id="second">00</span></div>
    </div>
    <form action="submit" class="formControls">
        <div class="clock-inputs">
            <input onchange="setDate()" id="dayInput" type="text" placeholder="Day">
            <input onchange="setDate()" id="monthInput" type="text" placeholder="Month">
            <input onchange="setDate()" id="yearInput" type="text" placeholder="Year">
        </div>
    </form>
    <select onchange="dateMain()" id="selectForDate" name="forDate" id="">
        <option value="christmas">Christmas</option>
        <option value="birthday">Krloz's birthday</option>
        <option value="endYear">End of year</option>
        <option value="princessDay">Princess's Day</option>
    </select>
    <div class="clock-controls"></div>
    `

    yearSpan = document.getElementById('year');
    monthSpan = document.getElementById('month');
    daySpan = document.getElementById('day');
    hourSpan = document.getElementById('hour');
    secondSpan = document.getElementById('second');
    minutSpan = document.getElementById('minut');

    timeFor(24, 12)
}

// Init
date()
