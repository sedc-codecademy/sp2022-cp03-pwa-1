let calendarMain = document.getElementById('calendarMain');
let renderedYear = document.getElementById('year');
let renderedMonth = document.getElementById('monthName');
let prevYearBtn = document.getElementById('prevYearBtn');
let nextYearBtn = document.getElementById('nextYearBtn');
let prevMonthBtn = document.getElementById('prevMonthbtn');
let nextMonthBtn = document.getElementById('nextMonthbtn');

prevYearBtn.addEventListener('click', function () {
  year -= 1;
  renderYear(year);
  getDaysInMonthFunc(year, month)
  renderCalendar(calendarMain, year, month, getDaysInMonth);
});

nextYearBtn.addEventListener('click', function () {
  year += 1;
  renderYear(year);
  getDaysInMonthFunc(year, month)
  renderCalendar(calendarMain, year, month, getDaysInMonth);
})

prevMonthBtn.addEventListener('click', function () {
if(month > 1) {
  month -= 1;
  renderMonth(monthsNames, month, renderedMonth);
  getDaysInMonthFunc(year, month)
  renderCalendar(calendarMain, year, month, getDaysInMonth);
}})

nextMonthBtn.addEventListener('click', function () {
  if(month <= 11) {
    month += 1;
    renderMonth(monthsNames, month, renderedMonth);
    getDaysInMonthFunc(year, month)
    renderCalendar(calendarMain, year, month, getDaysInMonth);
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

// let getDaysInMonth = function (year, month) {
//   return new Date(year, month, 0).getDate();
// }

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
  if (day == 0) day = 7; 
  return day - 1;
}

// --------rendering the calendar-----------
function renderCalendar(elem, year, month, daysInMonthCallback) {

  let table = '<table><tr><th>MO</th><th>TU</th><th>WE</th><th>TH</th><th>FR</th><th>SA</th><th>SU</th></tr><tr>';
  let daysInMonth = daysInMonthCallback;
  let d = new Date();
  console.log(d);

console.log(getDay(d));

for (let i = 0; i < getDay(d); i++) {
      table += '<td></td>';
    }

  for (let j = 0; j < daysInMonth; j++) {

    if ((j) % 7 === 0 || j === 0) {
      table += `<td>${j + 1}</td>`
    } else if ((j) % 7 === 6) {
      table += `<td>${j + 1}</td></tr>`
    } else {
      table += `<td>${j + 1}</td>`
    }

    if (getDay(d) % 6 === 7) { 
            table += '</tr><tr>';
    }
  }
  table += `</table>`

  elem.innerHTML = table
}



renderCalendar(calendarMain, year, month, getDaysInMonth);

// function createCalendar(elem, year, month) {

//   let mon = month - 1; // months in JS are 0..11, not 1..12
//   let d = new Date(year, mon);

//   let table = '<table><tr><th>MO</th><th>TU</th><th>WE</th><th>TH</th><th>FR</th><th>SA</th><th>SU</th></tr><tr>';

//   // spaces for the first row
//   // from Monday till the first day of the month
//   // * * * 1  2  3  4
//   for (let i = 0; i < getDay(d); i++) {
//     table += '<td></td>';
//   }

//   // <td> with actual dates
//   while (d.getMonth() == mon) {
//     table += '<td>' + d.getDate() + '</td>';

//     if (getDay(d) % 7 == 6) { // sunday, last day of week - newline
//       table += '</tr><tr>';
//     }

//     d.setDate(d.getDate() + 1);
//   }

//   // add spaces after last days of month for the last row
//   // 29 30 31 * * * *
//   if (getDay(d) != 0) {
//     for (let i = getDay(d); i < 7; i++) {
//       table += '<td></td>';
//     }
//   }

//   // close the table
//   table += '</tr></table>';

//   elem.innerHTML = table;
// }

// let d = new Date();
// console.log(d);

// function getDay(date) { 
//   let day = date.getDay();
//   if (day == 0) day = 7; 
//   return day - 1;
// }

// console.log(getDay(d));

// createCalendar(calendarMain, year, month);
