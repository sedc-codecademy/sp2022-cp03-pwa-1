let calendarMain = document.getElementById('calendarMain');
let renderedYear = document.getElementById('year');
let renderedMonth = document.getElementById('monthName');
let prevYearBtn = document.getElementById('prevYearBtn');
let nextYearBtn = document.getElementById('nextYearBtn');
let prevMonthBtn = document.getElementById('prevMonthbtn');
let nextMonthBtn = document.getElementById('nextMonthbtn');
let reminderMockData = [];
const calendarYear1 = document.querySelector(".calendarYear");
const calendarMonth1 = document.querySelector(".calendarMonth");
const sessionCardSettings4 = document.querySelector(".sessionButtonSetting");
const sessionCardSessions4 = document.querySelector(".sessionButtonTimer");
const sessionCardShortBreak4 = document.querySelector(".sessionButtonShortBreak");
const sessionCardLongBreak4 = document.querySelector(".sessionButtonLongBreak");
const calendarOuterWrapper = document.querySelector("#calendarOuterWrapper");


sessionCardSessions4.addEventListener("click", () => {

  calendarYear1.style.backgroundColor = "#2980b9";
  calendarMonth1.style.backgroundColor = "#2980b9";
  calendarMain.style.backgroundColor = "#2980b9";
  calendarOuterWrapper.style.backgroundColor = "#2980b9";
});

sessionCardShortBreak4.addEventListener("click", () => {

  calendarYear1.style.backgroundColor = "#598f94";
  calendarMonth1.style.backgroundColor = "#598f94";
  calendarMain.style.backgroundColor = "#598f94";
  calendarOuterWrapper.style.backgroundColor = "#598f94";
});

sessionCardLongBreak4.addEventListener("click", () => {

  calendarYear1.style.backgroundColor = "#5079a1";
  calendarMonth1.style.backgroundColor = "#5079a1";
  calendarMain.style.backgroundColor = "#5079a1";
  calendarOuterWrapper.style.backgroundColor = "#5079a1";
});

prevYearBtn.addEventListener('click', function () {
  year --;
  firstDay = new Date(year, month - 1, 1)
  renderYear(year);
  getDaysInMonthFunc(year, month)
  renderCalendar(calendarMain, getDaysInMonth, reminderMockData);
});

nextYearBtn.addEventListener('click', function () {
  year ++;
  firstDay = new Date(year, month - 1, 1)
  renderYear(year);
  getDaysInMonthFunc(year, month)
  renderCalendar(calendarMain, getDaysInMonth, reminderMockData);
});

prevMonthBtn.addEventListener('click', function () {
if(month > 1) {
  month --;
  firstDay = new Date(year, month - 1, 1)
  renderMonth(monthsNames, month, renderedMonth);
  getDaysInMonthFunc(year, month)
  renderCalendar(calendarMain, getDaysInMonth, reminderMockData);
}});

nextMonthBtn.addEventListener('click', function () {
  if(month <= 11) {
    month ++;
    firstDay = new Date(year, month - 1, 1)
    renderMonth(monthsNames, month, renderedMonth);
    getDaysInMonthFunc(year, month)
    renderCalendar(calendarMain, getDaysInMonth, reminderMockData);
  }});

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
};

getMonth();

//-----------getting days in month-----------
let getDaysInMonth = 0;

function getDaysInMonthFunc(year, month) {
   getDaysInMonth = new Date(year, month, 0).getDate();
};

getDaysInMonthFunc(year, month);

//-----------Getting first day in month-----------
let date = new Date();
let firstDay = new Date(date.getFullYear(), date.getMonth(), 1)

//-----------adding year between buttons-----------
function renderYear(year) {
  renderedYear.innerText = (year);
};

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
};

renderMonth(monthsNames, month, renderedMonth);

// --------Helper Function for getting day as number-----------
function getDay(date) { 
  let day = date.getDay();
  if (day === 0) day = 7; 
  return day - 1;
};

// --------rendering the calendar-----------
function renderCalendar(elem, daysInMonthCallback, dataArr) {

  const parsedReminderData = dataArr.map((item) => {
    const parsedData = item.date.split('-')
    const newObj = {
      year: parseInt(parsedData[0]),
      month: parseInt(parsedData[1]),
      day: parsedData[2],
    };
    return newObj.year === year && newObj.month === month ? newObj : null;
  }).filter(item => item !== null).map(x => parseInt(x.day));

  let table = '<table id="calendarTable"><tr><th>MO</th><th>TU</th><th>WE</th><th>TH</th><th>FR</th><th>SA</th><th>SU</th></tr><tr class="testTr2">';
  let daysInMonth = daysInMonthCallback;
  let EmptySpacesNum = getDay(firstDay);
  let totalTds = daysInMonth + EmptySpacesNum;

for (let i = 0; i < getDay(firstDay); i++) {
      table += '<td></td>';
    };
    
    for (let i = 0; i <= totalTds - (EmptySpacesNum + 1); i++) {
       if ((i + EmptySpacesNum) % 7 === 0 ) {
        table += '</tr><tr class="testTr2">'
        table += `<td class=" testTd ${parsedReminderData.includes(i + 1) ? "calendarReminderDataDay" : ""}">${i + 1}</td>`
      } else {
        table += `<td class=" testTd ${parsedReminderData.includes(i + 1) ? "calendarReminderDataDay" : ""}">${i + 1}</td>`
      }
    };

  table += `</tr></table>`
  elem.innerHTML = table
};

renderCalendar(calendarMain, getDaysInMonth, reminderMockData);

// ----------- REMINDERS CODE BELLOW ------------

let clockContainer = document.querySelector(".js-clock");
let reminderBtn = document.querySelector("#reminderBtn");
let cancelInput = document.querySelector('#cancelInput');
let reminderWrapper = document.querySelector('#remindersWrapper');
let remindersTable = document.querySelector(`#remindersTableId`);
let reminderName = document.querySelector(`#inputForCreatingReminder`);
let reminderDate = document.querySelector('#inputForSettingDateForTask');
let reminderTime = document.querySelector('#inputForTimeOfReminder');
let reminderPriority = document.querySelector('#priorityRem');
const remindersForm = document.querySelector(".AddReminderPopUp");
let notes = document.querySelector("#reminder-note");
let reminderContainer = document.querySelector(".AddReminderPopUp");

let reminderId = 1;
let inputReminderName = 0;
let inputReminderDate = 0;
let inputReminderTime = 0;
let inputReminderPriority = 0;
let inputReminderNote = 0;
 
cancelInput.addEventListener("click", function() {
  resetValues();
})

reminderBtn.addEventListener("click", function() {
  gettingAllReminders();
    if (inputReminderName === '' || inputReminderDate === '' || inputReminderTime === '') {
        return alert('Please enter input in all fields!')
    };

    createReminderObject();
    renderTable(remindersTable);
    renderCalendar(calendarMain, getDaysInMonth, reminderMockData);
    resetValues();
  });

document.querySelector(".button").addEventListener("click", function() {
    remindersTable.innerHTML = '';
    reminderId = 1;
    inputReminderName = 0;
    inputReminderDate = 0;
    inputReminderTime = 0;
    inputReminderPriority = 0; 
    reminderMockData = [];
    inputReminderNote = 0;
    renderCalendar(calendarMain, getDaysInMonth, reminderMockData);
});

//function for getting inputs for reminder
function gettingReminderInput(elem) {
    return elem.value;
};

//function for resetting values

function resetValues() {
  reminderName.value = "";
  reminderDate.value = "";
  reminderTime.value = "";
  notes.value = "";
}

//function for getting all inputs for reminder
function gettingAllReminders() {
    inputReminderName = gettingReminderInput(reminderName);
    inputReminderDate = gettingReminderInput(reminderDate);
    inputReminderTime = gettingReminderInput(reminderTime);
    inputReminderPriority = gettingReminderInput(reminderPriority);
    inputReminderNote = gettingReminderInput(notes);
    
};

//function for deleting all reminders
function ClearAllReminders(elem) {
    elem.innerHTML = "";
};

//function for making objects with reminders
function ReminderObject(id, name, date, time, priority, note) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.time = time;
    this.priority = priority;
    this.note = note;
};

function createReminderObject() {
    let reminder = new ReminderObject(
        id = reminderId,
        gettingReminderInput(reminderName),
        gettingReminderInput(reminderDate),
        gettingReminderInput(reminderTime),
        gettingReminderInput(reminderPriority),
        gettingReminderInput(notes)
    );

    reminderMockData.push(reminder);
    reminderId++;
};


//function for rendering the table of reminders
function renderTable(elem) {
    
    let cards = "";
    reminderMockData.forEach((reminderItem) => {
      cards += `
    <div class="cards-reminder">
    <div class="header-reminder">
      <h3>REMINDER DETAILS</h3>
      <button class="mark-done">Mark as done</button>
    </div>
    <div class="inside-reminders">
    <b>${reminderItem.name} </b> 
    <br><b>REMIND ME </b> 
    <br><b>${reminderItem.date}, ${reminderItem.time}</b> 
    <br><b>PRIORITY</b>
    <br><b>${reminderItem.priority}</b>
    <br><b>NOTES</b>
    <br><p>${reminderItem.note}</p>
    </div>
    <button class="removeReminderByIdBtn" onclick="deleteReminderById(${reminderItem.id}); 
    renderCalendar(calendarMain, getDaysInMonth, reminderMockData);
    ">Delete reminder</button>
    </div>`;
    });
    elem.innerHTML = cards;
    markAsDone();
};

function markAsDone() {
  let button = document.querySelectorAll(".mark-done");
    
    button.forEach((btn) => {
     btn.addEventListener("click", (e) => {
      e.target.closest(".cards-reminder").classList.add("addOpacity");
      e.target.disabled = true;
      e.target.style.cursor = "default";
      });
    });
    
}

(function() {
  var removeSuccess;

  removeSuccess = function() {
    return $('.button').removeClass('success');
  };

  $(document).ready(function() {
    return $('.button').click(function() {
      $(this).addClass('success');
      return setTimeout(removeSuccess, 3000);
    });
  });

}).call(this);

//function for deleting reminder by ID from the table
function deleteReminderById(reminderId) {
    const newData = reminderMockData.filter(x => x.id !== reminderId);
    reminderMockData = [...newData];
    renderTable(remindersTable);
};