//const sessionMain = document.getElementById("sessionMain");
const sessionCardButtons = document.querySelectorAll(".sessionButtons");
const sessionModals = document.querySelector(".sessionPopUpModals");
const closeButton = document.querySelector(".closeSessionModal");
const overlayDiv = document.querySelector(".sessionOverlayDiv");
const startButton = document.querySelector("#startSessionBtn");
const cardContainer = document.querySelector("#sessionMain");
const sessionCardBodyDiv = document.querySelector("#sessionCardBody");

//buttons variables
const sessionCardButtonSetting = document.querySelector(".sessionButtonSetting");
const sessionCardButtonShortBreak = document.querySelector(".sessionButtonShortBreak");
const sessionCardButtonsLongBreak = document.querySelector(".sessionButtonLongBreak");
const stopButton = document.querySelector("#stopSessionBtn");
const body = document.querySelector("body");
const settingsButton = document.querySelector("#sessionSettings");
const settingsDiv = document.querySelector(".settingsDiv")
const timerElement = document.querySelector("#timerDiv");

const timerInput = document.querySelector("#inputForTimeOfTask");
const addTaskButton = document.querySelector("#addTaskBtn");
const taskForm = document.querySelector(".taskFormDiv");
const timerUpButton = document.querySelector("#arrowUp");
const timerDownButton = document.querySelector("#arrowDown");
const addNoteButton = document.querySelector("#noteForTaskBtn");
const textAreaOfTask = document.querySelector("#taskText");
const taskTitle = document.querySelector("#inputForTaskTitle");
const taskDuration = document.querySelector("#inputForTimeOfTask");
const confirmSessionDurationButton = document.querySelector("#startingTimerValueButton");
const sessionDurationInput = document.querySelector("#startingTimerValueInput");

const shortBreakDiv = document.querySelector("#shortBreakDiv");

// Modals functionality

const closeModalFunction = () => {
    sessionModals.classList.add("hidden");
    overlayDiv.classList.add("hidden");
    taskForm.classList.add("hidden");
    settingsDiv.classList.add("hidden");
    textAreaOfTask.style.display = "none";
    timerInput.value = "1";
    taskTitle.value = "";
    //sessionCardButtonSetting.classList.add("hidden");
    //cardContainer.style.backgroundColor = "rgb(255, 154, 117)";
    //body.style.backgroundImage = "var(--clr-neutral-300)";
    //body.style.backgroundColor = "rgb(255, 255, 117)";
}

const openModalFunction = () => {
    sessionModals.classList.remove("hidden");
    overlayDiv.classList.remove("hidden");
    taskForm.classList.remove("hidden");
    settingsDiv.classList.remove("hidden");

    //sessionCardButtonSetting.classList.remove("hidden");
}


//TIMER FUNCTIONALITY
// ================== CHECK LATER ???
// let t;
//     function pause_game() {
//     let lastTime;
//     if (elem.value == "PAUSE") {
//         lastTime = clearInterval(t);
//         elem.value = "RESUME";
//     }
//     if (elem.value == "RESUME") {
//         startTimer(lastTime);
//         elem.value = "PAUSE";
//     }
// }

// TIMER FUNCTIONALITY

let timer;
//let timeDelay = 1000;
let timerIsPaused = false;
let time;

const startTimer = () => {
    //let time;
    const tickTock = () => {
        //Functionality if the timer is paused or not
        if (timerIsPaused === true) {       // 09 : 57 == 57 + 09*60 = 597
            let remainingSecs = parseInt(timerElement.textContent.slice(-2)) + parseInt(timerElement.textContent.slice(2, 0) * 60);
            let time = remainingSecs;

            const min = String(Math.trunc(time / 60)).padStart(2, 0);
            const sec = String(time % 60).padStart(2, 0);

            timerElement.textContent = `${min} : ${sec}`;

            if (time === 0) {
                clearInterval(timer);
                timerElement.style.fontSize = "35px";
                timerElement.textContent = "Your time is up!";
            }
            startButton.style.zIndex = "-1";
            stopButton.style.zIndex = "1";
            time--;

        } else {
            const min = String(Math.trunc(time / 60)).padStart(2, 0);
            const sec = String(time % 60).padStart(2, 0);

            // In each call, print the remaining time to UI
            timerElement.textContent = `${min}:${sec}`;

            // When 0 seconds, stop timer and print message
            if (time === 0) {
                clearInterval(timer);
                timerElement.style.fontSize = "35px";
                timerElement.textContent = "Your time is up!";
            }

            // hide start , show stop button
            startButton.style.zIndex = "-1";
            stopButton.style.zIndex = "1";
            // Decrease 1s
            time--;
        }
    };

    tickTock();
    play();
    // Call the timer every second
    timer = setInterval(tickTock, 1000);
    return timer;
};

const stopTimer = () => {
    stop();
    clearInterval(timer);
    startButton.style.zIndex = "1";
    stopButton.style.zIndex = "-1";
}

const play = () => timerIsPaused = false;
const stop = () => timerIsPaused = true;

//Zakomentiran Kod or prvichna verzija na timer
// const startTimer = () => {

//     const tickTock = () => {

//         const min = String(Math.trunc(time / 60)).padStart(2, 0);
//         const sec = String(time % 60).padStart(2, 0);

//         // In each call, print the remaining time to UI
//         timerElement.textContent = `${min}:${sec}`;

//         // When 0 seconds, stop timer and print message
//         if (time === 0) {
//             clearInterval(timer);
//             timerElement.style.fontSize = "35px";
//             timerElement.textContent = "Your time is up!";
//         }

//         // hide start , show stop button
//         startButton.style.zIndex = "-1";
//         stopButton.style.zIndex = "1";
//         // Decrease 1s
//         time--;

//     };
//     // Set time to 2 minutes
//     let time = 555;
//     // Call the timer every second
//     tickTock();
//     play();

//     timer = setInterval(tickTock, 1000);

//     return timer;
// };

// const stopTimer = () => {
//     if (!timer === null) {

//     }
// }

// if ((timerElement.innerText.slice(2, 0) === "00") && (timerElement.innerText.slice(-2) === "00")) {
if (isNaN(timerElement.innerText)) {
    console.log("user unfriendly");
} else {
    startButton.addEventListener("click", startTimer);
}


stopButton.addEventListener("click", function () {
    if (!timerIsPaused) clearInterval(timer);

    //   pause_game();
    // hide stop , show start button
    startButton.style.zIndex = "1";
    stopButton.style.zIndex = "-1";
    if (timerElement.innerText === "Your time is up!") {
        startButton.removeEventListener("click", startTimer);
    }

    // two problems  show and hide button, pausing the timer
});

//EVENT LISTENERS FOR BUTTONS
closeButton.addEventListener("click", closeModalFunction);
overlayDiv.addEventListener("click", closeModalFunction);
addTaskButton.addEventListener("click", closeModalFunction);
settingsButton.addEventListener("click", closeModalFunction);
shortBreakDiv.addEventListener("click", closeModalFunction);

//dodaden uslov za funkcionalnost samo koga modalite se open
if (!sessionModals.classList.contains("hidden")) {
    document.addEventListener("keydown", function (e) {
        console.log(e.key);
        if (e.key === "Escape" && !sessionModals.classList.contains("hidden")) {
            closeModalFunction();
        }
    });
}

sessionCardButtonSetting.addEventListener("click", () => {
    sessionModals.classList.remove("hidden");
    overlayDiv.classList.remove("hidden");
    // cardContainer.style.backgroundImage =
    //     "linear-gradient(315deg, #537895 0%, #09203f 74%)";
    // body.style.backgroundImage =
    //     "linear-gradient(315deg, #537895 0%, #09203f 74%)";
});

sessionCardButtonShortBreak.addEventListener("click", () => {
    sessionModals.classList.add("hidden");
    overlayDiv.classList.add("hidden");
    shortBreakDiv.classList.remove("hidden");
    //timerElement.classList.add("hidden");

    // cardContainer.style.backgroundImage =
    //     "linear-gradient(315deg, #20bf55 0%, #01baef 74%)";
    // body.style.backgroundImage =
    //     "linear-gradient(315deg, #20bf55 0%, #01baef 74%)";
});

sessionCardButtonsLongBreak.addEventListener("click", () => {
    sessionModals.classList.remove("hidden");
    overlayDiv.classList.remove("hidden");
    // cardContainer.style.backgroundImage =
    //     "linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%)";
    // body.style.backgroundImage =
    //     "linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%)";
});

settingsButton.addEventListener("click", () => {
    settingsDiv.classList.remove("hidden");
    overlayDiv.classList.remove("hidden");
    sessionModals.classList.add("hidden");
})

//Add task
addTaskButton.addEventListener("click", () => {
    taskForm.classList.remove("hidden");
    overlayDiv.classList.remove("hidden");
})

//Arrows up and down 
timerUpButton.addEventListener("click", () => {
    timerInput.value++;
});

timerDownButton.addEventListener("click", () => {
    timerInput.value > 0 ? timerInput.value-- : timerInput.value = 0;
});

//Add note in task form button
if (textAreaOfTask.style.display = "none") {
    addNoteButton.addEventListener("click", function () {
        textAreaOfTask.style.display = "block";
    })
}; //ne e funkcionalno kopcheto koga vekje e otvorena textarea za pishuvanje na note, t.e. raboti samo koga ne e otvorena textArea

//Start session confirm button, po vnesuvanje na vremetraenje na sesija
// confirmSessionDurationButton.addEventListener("click", () => {
//     time = sessionDurationInput.value;
//     console.log(time, typeof time);
//     timerElement.innerText = `${time.padStart(2, 0)} : 00`;
//     console.log(timerElement.innerText, typeof timerElement.innerText);
//     time = time * 60;
//     console.log(time, typeof time);
//     settingsDiv.classList.add("hidden");
//     closeModalFunction();
//     startButton.addEventListener("click", startTimer);
// });
// confirmSessionDurationButton.addEventListener("click", () =>)

userDurationInput(confirmSessionDurationButton, sessionDurationInput, timerElement);
// buttonEvent, inputValue, htmlElement
function userDurationInput(button, inputValue, htmlElement) {
    button.addEventListener("click", () => {
        time = inputValue.value;
        console.log(time, typeof time);
        htmlElement.innerText = `${time.padStart(2, 0)} : 00`;
        console.log(htmlElement.innerText, typeof htmlElement.innerText);
        time = time * 60;
        console.log(time, typeof time);
        settingsDiv.classList.add("hidden");
        closeModalFunction();
        startButton.addEventListener("click", startTimer);
    });
    // buttonEvent.addEventListener("click", () => {
    //     let time = inputValue.value;
    //     //where = 0;
    //     //where = inputValue.value;
    //     htmlElement.innerText = `${time.padStart(2, 0)} : 00`;
    //     time = time * 60;
    //     settingsDiv.classList.add("hidden");
    //     //if (htmlElement.innerText === "Your time is up!" || htmlElement.innerText.slice(2, 0) === 00 && htmlElement.innerText.slice(-2) === "00") {
    //     //buttonEvent.removeEventListener("click", startTimer);
    //     //}
    //     closeModalFunction();
    //     startButton.addEventListener("click", startTimer);
    // }
    // )
};

const saveTaskButton = document.querySelector("#saveTaskButton");
const listOfTasks = document.querySelector(".orderedListOfTasks");

saveTaskButton.addEventListener("click", () => {
    //TODO - Take the input values from the form and add them to listOfTasks in a <li> dynamically
    //close the AddTasks form upon clicking Save and return all values to empty
    //Each task in the list should have the added note visible as well as the assigned duration for the task
    //Include also the priority and pace, once they are added to the Add Task form
    //Add validation that makes sure priority, name, time and pace have values assigned by the user

    const taskInputs = [taskTitle.value, taskDuration.value];

    if (taskTitle.value && taskDuration.value) {
        let li = document.createElement("li");
        li.setAttribute("class", "liOfTasks");
        let liContent = li.appendChild(document.createElement("div"));
        liContent.setAttribute("class", "divInLi");
        liContent.innerHTML += `<p>Title: ${taskTitle.value}</p> </br> <p>Duration: ${taskDuration.value}</p>`

        // liContent.style = "background-color: white";

        // let liDiv = document.createElement("div");
        // liDiv.innerHTML = `<p>${taskTitle.value}</p></br><p>${taskDuration.value}</p>`

        listOfTasks.appendChild(li);
    }
});

// for (let i = 0; i < sessionCardButtons.length; i++) {
//     sessionCardButtons[i].addEventListener("click", openModalFunction);
// };

// SHORT AND LONG BREAK BUTTONS LOGIC
// sessionCardButtonShortBreak
// sessionCardButtonLongBreak

const shortBreakDurationInput = document.querySelector("#startingShortBreakValueInput");
const longBreakDurationInput = document.querySelector("#startingLongBreakValueInput");

// sessionCardButtonShortBreak.addEventListener("click", () => {
//     timerElement.classList.add("hidden");
//     const header = document.createElement("h1");
//     header.innerText = "adssadsada";
//     sessionCardBodyDiv.appendChild(header);
//     header.setAtrribute("class", "blabla headerShortBreak hidden");



// });



