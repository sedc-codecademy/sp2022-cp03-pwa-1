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

  let table = '<table><tr><th>MO</th><th>TU</th><th>WE</th><th>TH</th><th>FR</th><th>SA</th><th>SU</th></tr><tr>';
  let daysInMonth = daysInMonthCallback;
  let EmptySpacesNum = getDay(firstDay);
  let totalTds = daysInMonth + EmptySpacesNum
  console.log(totalTds);

for (let i = 0; i < getDay(firstDay); i++) {
      table += '<td></td>';
    }
    
    for (let i = 0; i <= totalTds - (EmptySpacesNum + 1); i++) {
       if ((i + EmptySpacesNum) % 7 === 0 ) {
        table += '</tr><tr>'
        table += `<td>${i + 1}</td>`
      } else {
        table += `<td>${i + 1}</td>`
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