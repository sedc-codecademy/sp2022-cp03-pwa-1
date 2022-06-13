let calendarMain = document.getElementById('calendarMain');
let renderedYear = document.getElementById('year');
let renderedMonth = document.getElementById('monthName');
let prevYearBtn = document.getElementById('prevYearBtn');
let nextYearBtn = document.getElementById('nextYearBtn');
let prevMonthBtn = document.getElementById('prevMonthBtn');
let nextMonthBtn = document.getElementById('nextMonthBtn');

prevYearBtn.addEventListener('click', function () {
  year -= 1;
  renderYear(year);
  renderCalendar(calendarMain, year, month, getDaysInMonth);
});

nextYearBtn.addEventListener('click', function () {
  year += 1;
  renderYear(year);
  renderCalendar(calendarMain, year, month, getDaysInMonth);
})

// prevMonthBtn.addEventListener('click', function () {
//   month -= 1;
//   renderMonth(monthsNames, month, renderedMonth);
//   renderCalendar(calendarMain, year, month, getDaysInMonth);
// })

// nextMonthBtn.addEventListener('click', function () {
//   month += 1;
//   renderMonth(monthsNames, month, renderedMonth);
//   renderCalendar(calendarMain, year, month, getDaysInMonth);
// })

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
function renderMonth(monthsArray, monthNum, elem) {
  let currentMonth = monthsArray[monthNum - 1]
  elem.innerText = (currentMonth);
}
renderMonth(monthsNames, month, renderedMonth);

let elem;

// --------rendering the calendar-----------
function renderCalendar(elem, year, month, daysInMonthCallback) {

  let table = '<table><tr><th>MO</th><th>TU</th><th>WE</th><th>TH</th><th>FR</th><th>SA</th><th>SU</th></tr>';
  let daysInMonth = daysInMonthCallback;

  for (let j = 0; j < daysInMonth; j++) {

    if ((j) % 7 === 0 || j === 0) {
      table += `<tr><td>${j + 1}</td>`
    } else if ((j) % 7 === 6) {
      table += `<td>${j + 1}</td></tr>`
    } else {
      table += `<td>${j + 1}</td>`
    }
  }
  table += `</table>`

  elem.innerHTML = table

  // let theDate = new Date(`${year}-${month}-01`).toString().split(" ")[0];
  // let currentRow;

//   for (let i = 0; i < daysField; i++) {
//     if ( (i + 1) % 7  === 0 || i === 0) {
//       if(currentRow) {
//         table.appendChild(currentRow);
//       }
//       currentRow = document.createElement('tr');
//       let td = document.createElement('td');
//       td.innerText = i + 1;
//       currentRow.appendChild(td);
//     } else {
//       let td = document.createElement('td');
//       td.innerText = i + 1;
//       currentRow.appendChild(td);
//     }
//   }
//   elem.appendChild(table);
// }
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

// function getDay(date) { // get day number from 0 (monday) to 6 (sunday)
//   let day = date.getDay();
//   if (day == 0) day = 7; // make Sunday (0) the last day
//   return day - 1;
// }

// createCalendar(calendarMain, year, month);
