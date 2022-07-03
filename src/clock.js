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

let reminderId = 1;
let inputReminderName = 0;
let inputReminderDate = 0;
let inputReminderTime = 0;
let inputReminderPriority = 0; 
let remindersContainer = [];

reminderBtn.addEventListener("click", function() {
    gettingAllReminders();
    createReminderObject();
    renderTable(remindersTable);
    console.log(remindersContainer);
});

clearBtn.addEventListener("click", ClearReminders);

//function for getting inputs for reminder
function gettingReminderInput(elem) {
    console.log(elem.value)
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
    remindersContainer.push(reminder);
    reminderId++;
}

//function for rendering the table of reminders
function renderTable(elem) {
    let table = '<table><tr><th>#</th><th>Task</th><th>Date</th><th>Time</th><th>Priority</th></tr>';
    for (const reminderData of remindersContainer) {
        table +=` <tr>`
        table += `<td>${reminderData.id}</td>`
    table += `<td>${reminderData.name}</td>`
    table += `<td>${reminderData.date}</td>`
    table += `<td>${reminderData.time}</td>`
    table += `<td>${reminderData.priority}</td>`
    table += `</tr>`
    }

    table += `</table>`

    elem.innerHTML = table
}

function getTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${
        hours < 10 ? `0${hours}` : hours
    }:${
        minutes < 10 ? `0${minutes}` : minutes
    }:${
        seconds < 10 ? `0${seconds}` : seconds
    }`;
}

function init() {
    getTime();
    setInterval(getTime, 1000);
}
init();

function CreateNewReminder(){
}

function ClearReminders(){
    while (reminderWrapper.firstChild){
        reminderWrapper.removeChild(reminderWrapper.firstChild);
    }
}