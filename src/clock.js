const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");
const reminderBtn = document.querySelector("#reminderBtn");
const clearBtn = document.querySelector('#deleteReminder');
const reminderWrapper = document.querySelector('#remindersWrapper')

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
    let reminderInput = prompt("Insert reminder");
    const newReminder = document.createElement('div');

    newReminder.className = "createdReminder"
    newReminder.innerHTML = reminderInput;
    reminderWrapper.appendChild(newReminder);
    let timeInput = prompt("Insert time");
    const newTime = document.createElement('div');
    newTime.className = "createdReminderTime"
    newTime.innerHTML = timeInput;
    reminderWrapper.appendChild(newTime);

}

function ClearReminders(){
    while (reminderWrapper.firstChild){
        reminderWrapper.removeChild(reminderWrapper.firstChild);
    }
}



reminderBtn.addEventListener("click", CreateNewReminder);
clearBtn.addEventListener("click", ClearReminders);
