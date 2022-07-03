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

let inputReminderName = 0;
let inputReminderDate = 0;
let inputReminderTime = 0;
let inputReminderPriority = 0; 
let remindersContainer = [];

reminderBtn.addEventListener("click", function() {
    gettingAllReminders();
    renderTable(remindersTable);
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


//function for rendering the table of reminders
function renderTable(elem) {
    let table = '<table><tr><th>#</th><th>Task</th><th>Date</th><th>Time</th><th>Priority</th></tr><tr>';
    table += '<td>1</td>'
    table += `<td>${inputReminderName}</td>`
    table += `<td>${inputReminderDate}</td>`
    table += `<td>${inputReminderTime}</td>`
    table += `<td>${inputReminderPriority}</td>`

    table += `</tr></table>`

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
    /*${condition ? return1 : return2}
    if (condition) {
        return1;
    } else {
        return2;
    }
    */
}

function init() {
    getTime();
    setInterval(getTime, 1000);
    //setInterval(function, runTime(ms));
}
init();

function CreateNewReminder(){
    // let reminderInput = prompt("Insert reminder");
    // const newReminder = document.createElement('div');

    // newReminder.className = "createdReminder"
    // newReminder.innerHTML = reminderInput;
    // reminderWrapper.appendChild(newReminder);
    // let timeInput = prompt("Insert time");
    // const newTime = document.createElement('div');
    // newTime.className = "createdReminderTime"
    // newTime.innerHTML = timeInput;
    // reminderWrapper.appendChild(newTime);

    // <div class = "tasksListButtonDiv">                            
    // <div class="taskFormDiv hidden ">
    //     <input id="inputForTaskTitle" type="text" placeholder="What are you up to?">
    //     <p><b>Est Productivity APP SEDC'22</b></p>
    //     <input id="inputForTimeOfTask" type="number" min="0" step = "1" value="1">
    //     <button id="arrowUp" class="upAndDown">▲</button>
    //     <button id="arrowDown" class="upAndDown">▼</button>
    //     <br>
    //     <textarea name="Task description" id="taskText" cols="30" rows="3" placeholder="Text description here please"></textarea>
    //     <br>
    //     <button id="noteForTaskBtn">+ Add note</button>
    //     <div id="finalizeTaskDiv">
    //         <button id ="cancelTaskButton">Cancel</button>
    //         <button id ="saveTaskButton">Save</button>
    //     </div>
    // </div>
    
//     <button id="addTaskBtn">Add task</button>  
// </div> 
}

function ClearReminders(){
    while (reminderWrapper.firstChild){
        reminderWrapper.removeChild(reminderWrapper.firstChild);
    }
}