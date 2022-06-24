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



reminderBtn.addEventListener("click", CreateNewReminder);
clearBtn.addEventListener("click", ClearReminders);
