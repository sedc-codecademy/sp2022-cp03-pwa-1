let calendarMain = document.getElementById('calendarMain');
let renderedYear = document.getElementById('year');
let renderedMonth = document.getElementById('monthName');
let prevYearBtn = document.getElementById('prevYearBtn');
let nextYearBtn = document.getElementById('nextYearBtn');
let prevMonthBtn = document.getElementById('prevMonthbtn');
let nextMonthBtn = document.getElementById('nextMonthbtn');

prevYearBtn.addEventListener('click', function () {
  year --;
  firstDay = new Date(year, month - 1, 1)
  renderYear(year);
  getDaysInMonthFunc(year, month)
  renderCalendar(calendarMain, getDaysInMonth);
});

nextYearBtn.addEventListener('click', function () {
  year ++;
  firstDay = new Date(year, month - 1, 1)
  renderYear(year);
  getDaysInMonthFunc(year, month)
  renderCalendar(calendarMain, getDaysInMonth);
})

prevMonthBtn.addEventListener('click', function () {
if(month > 1) {
  month --;
  firstDay = new Date(year, month - 1, 1)

  renderMonth(monthsNames, month, renderedMonth);
  getDaysInMonthFunc(year, month)
  renderCalendar(calendarMain, getDaysInMonth);
  seeLS();
}})

nextMonthBtn.addEventListener('click', function () {
  if(month <= 11) {
    month ++;
    firstDay = new Date(year, month - 1, 1)
    renderMonth(monthsNames, month, renderedMonth);
    getDaysInMonthFunc(year, month)
    renderCalendar(calendarMain, getDaysInMonth);
  }})

//-----------getting current year-----------
let year;

function getYear() {
  year = new Date().getFullYear();
}

getYear();

//-----------getting current month-----------
let month;

function getMonth() {
  month = new Date().getMonth() + 1;
}

getMonth();

//-----------getting days in month-----------
let getDaysInMonth = 0;

function getDaysInMonthFunc(year, month) {
   getDaysInMonth = new Date(year, month, 0).getDate();
}

getDaysInMonthFunc(year, month);

//-----------Getting first day in month-----------
let date = new Date();
let firstDay = new Date(date.getFullYear(), date.getMonth(), 1)

//-----------adding year between buttons-----------
function renderYear(year) {
  renderedYear.innerText = (year);
}
renderYear(year);

//-----------adding month name between buttons-----------
const monthsNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let currentMonth;

function renderMonth(monthsArray, monthNum, elem) {
  let currentMonth = monthsArray[monthNum - 1]
  
  if(monthNum === 13) {
    month = 0;
  }
  if(monthNum === 0) {
    month = 12;
  }
  elem.innerText = (currentMonth);
}
renderMonth(monthsNames, month, renderedMonth);

// --------Helper Function for getting day as number-----------
function getDay(date) { 
  let day = date.getDay();
  if (day === 0) day = 7; 
  return day - 1;
}

// --------rendering the calendar-----------
function renderCalendar(elem, daysInMonthCallback) {

  let table = '<table id="calendarTable"><tr><th>MO</th><th>TU</th><th>WE</th><th>TH</th><th>FR</th><th>SA</th><th>SU</th></tr><tr>';
  let daysInMonth = daysInMonthCallback;
  let EmptySpacesNum = getDay(firstDay);
  let totalTds = daysInMonth + EmptySpacesNum

for (let i = 0; i < getDay(firstDay); i++) {
      table += '<td></td>';
    }
    
    for (let i = 0; i <= totalTds - (EmptySpacesNum + 1); i++) {
       if ((i + EmptySpacesNum) % 7 === 0 ) {
        table += '</tr><tr>'
        table += `<td id="${i + 1}">${i + 1}</td>`
      } else {
        table += `<td id="${i + 1}">${i + 1}</td>`
      }
    }
    
  table += `</tr></table>`

  elem.innerHTML = table
}

renderCalendar(calendarMain, getDaysInMonth);

// 2nd kind of implementation for render calendar func
// --------rendering the calendar-----------
// function renderCalendar(elem, daysInMonthCallback) {
//   elem.innerHTML = '';
//   let table = document.createElement('table');
//   table.innerHTML += '<table><tr><th>MO</th><th>TU</th><th>WE</th><th>TH</th><th>FR</th><th>SA</th><th>SU</th></tr><tr>';

//   const daysInWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
//   const firstDayInMonth = firstDay.toString().split(' ')[0];
//   const emptySpaces = daysInWeek.indexOf(firstDayInMonth);
//   let emptySpacesCount = emptySpaces;
//   let daysInMonth = daysInMonthCallback + emptySpaces;
//   let newRow = document.createElement('tr');

//   for (let i = 0; i < daysInMonth; i++) {

//     if (i % 7 === 0 && i !== 0) {
//       table.appendChild(newRow);
//       newRow = document.createElement('tr');
//     } 

//     if (!emptySpacesCount) {
//       newRow.innerHTML += `<td>${(i + 1) - emptySpaces}</td>`
//     } else {
//       newRow.innerHTML += `<td></td>`
//       emptySpacesCount--;
//     }

//     if (i === daysInMonth - 1) {
//       table.appendChild(newRow);
//     } 
//   }

//   elem.appendChild(table);
// }

// renderCalendar(calendarMain, getDaysInMonth);

// ----------- REMINDERS ARREA CODE BELLOW ------------

let clockContainer = document.querySelector(".js-clock");
let clockTitle = clockContainer.querySelector("h1");
let reminderBtn = document.querySelector("#reminderBtn");
let clearBtn = document.querySelector('#deleteReminder');
let reminderWrapper = document.querySelector('#remindersWrapper');
let remindersTable = document.querySelector(`#remindersTableId`);
let reminderName = document.querySelector(`#inputForCreatingReminder`);
let reminderDate = document.querySelector('#inputForSettingDateForTask');
let reminderTime = document.querySelector('#inputForTimeOfReminder');
let reminderPriority = document.querySelector('#priorityRem');

const remindersForm = document.querySelector(".AddReminderPopUp");
const remindersFiled = document.querySelector("#remindersTableId");
const sessionCardSettings3 = document.querySelector(".sessionButtonSetting");
const sessionCardSessions3 = document.querySelector(".sessionButtonTimer");
const sessionCardShortBreak3 = document.querySelector(".sessionButtonShortBreak");
const sessionCardLongBreak3 = document.querySelector(".sessionButtonLongBreak");

sessionCardSettings3.addEventListener("click", () => {
    remindersForm.style.backgroundColor = "#2980b9";
    remindersFiled.style.backgroundColor = "#2980b9";
});

sessionCardSessions3.addEventListener("click", () => {
    remindersForm.style.backgroundColor = "#2980b9";
    remindersFiled.style.backgroundColor = "#2980b9";
});

sessionCardShortBreak3.addEventListener("click", () => {
    remindersForm.style.backgroundColor = "#598f94";
    remindersFiled.style.backgroundColor = "#598f94";
});

sessionCardLongBreak3.addEventListener("click", () => {
    remindersForm.style.backgroundColor = "#5079a1";
    remindersFiled.style.backgroundColor = "#5079a1";
});

let reminderId = 1;
let inputReminderName = 0;
let inputReminderDate = 0;
let inputReminderTime = 0;
let inputReminderPriority = 0; 
let reminderMockData = [];

reminderBtn.addEventListener("click", function() {
    gettingAllReminders();
    if (inputReminderName === '' || inputReminderDate === '' || inputReminderTime === '') {
        return alert('Please enter input in all fields!')
    }
    createReminderObject();
    renderTable(remindersTable);
});

clearBtn.addEventListener("click", function() {
    remindersTable.innerHTML = '';
    reminderId = 1;
    inputReminderName = 0;
    inputReminderDate = 0;
    inputReminderTime = 0;

    inputReminderPriority = 0; 
    reminderMockData = [];
});

//function for getting inputs for reminder
function gettingReminderInput(elem) {
    return elem.value;
}

//function for getting all inputs for reminder
function gettingAllReminders() {
    inputReminderName = gettingReminderInput(reminderName);
    inputReminderDate = gettingReminderInput(reminderDate);
    inputReminderTime = gettingReminderInput(reminderTime);
    inputReminderPriority = gettingReminderInput(reminderPriority);
}

//function for deleting all reminders
function ClearAllReminders(elem) {
    elem.innerHTML = "";
}

//function for making objects with reminders
function ReminderObject(id, name, date, time, priority) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.time = time;
    this.priority = priority;
}

function createReminderObject() {
    let reminder = new ReminderObject(
        id = reminderId,
        gettingReminderInput(reminderName),
        gettingReminderInput(reminderDate),
        gettingReminderInput(reminderTime),
        gettingReminderInput(reminderPriority)
    )
    reminderMockData.push(reminder);
    reminderId++;
}

//function for rendering the table of reminders
function renderTable(elem) {
    let table = '<table><tr><th>#</th><th>Task</th><th>Date</th><th>Time</th><th>Priority</th><th>Remove</th></tr>';

    reminderMockData.forEach((reminderItem, index) => {
        table +=` <tr>`
        table += `<td>${index + 1}</td>`
    table += `<td>${reminderItem.name}</td>`
    table += `<td>${reminderItem.date}</td>`
    table += `<td>${reminderItem.time}</td>`
    table += `<td>${reminderItem.priority}</td>`
    table += `<td><button class="removeReminderByIdBtn" onclick="deleteReminderById(${reminderItem.id})">X</button></td>`
    table += `</tr>`
    })

    table += `</table>`
    elem.innerHTML = table
}

//function for deleting reminder by ID from the table
function deleteReminderById(reminderId) {
    const newData = reminderMockData.filter(x => x.id !== reminderId);
    reminderMockData = [...newData];
    renderTable(remindersTable);
}