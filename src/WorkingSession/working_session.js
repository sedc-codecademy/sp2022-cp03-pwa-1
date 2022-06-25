//const sessionMain = document.getElementById("sessionMain");
const sessionCardButtons = document.querySelectorAll(".sessionButtons");
const sessionModals = document.querySelector(".sessionPopUpModals");
const closeButton = document.querySelector(".closeSessionModal");
const overlayDiv = document.querySelector(".sessionOverlayDiv");
const startButton = document.querySelector("#startSessionBtn");
const cardContainer = document.querySelector("#sessionMain");
const sessionCardBodyDiv = document.querySelector("#sessionCardBody");

//buttons variables
const sessionCardButtonSetting = document.querySelector(
    ".sessionButtonSetting"
);
const sessionCardButtonShortBreak = document.querySelector(
    ".sessionButtonShortBreak"
);
const sessionCardButtonsLongBreak = document.querySelector(
    ".sessionButtonLongBreak"
);
const sessionCardButtonTimer = document.querySelector(".sessionButtonTimer");
const stopButton = document.querySelector("#stopSessionBtn");
const body = document.querySelector("body");
const settingsButton = document.querySelector("#sessionSettings");
const settingsDiv = document.querySelector(".settingsDiv");
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
const confirmSessionDurationButton = document.querySelector(
    "#startingTimerValueButton"
);
const sessionDurationInput = document.querySelector("#startingTimerValueInput");
const shortBreakDurationInput = document.querySelector(
    "#startingShortBreakValueInput"
);
const longBreakDurationInput = document.querySelector(
    "#startingLongBreakValueInput"
);

const shortBreakDiv = document.querySelector("#shortBreakDiv");
const longBreakDiv = document.querySelector("#longBreakDiv");
const startShortBreakButton = document.querySelector(
    "#startShortBreakSessionBtn"
);
const stopShortBreakButton = document.querySelector(
    "#stopShortBreakSessionBtn"
);
const startLongBreakButton = document.querySelector(
    "#startLongBreakSessionBtn"
);
const stopLongBreakButton = document.querySelector("#stopLongBreakSessionBtn");
const goToBreak = document.querySelector("#goToBreak");
const backToSession = document.querySelector("#backToSession");

// Dialog for Short & Long Break options

const favDialog = document.getElementById("favDialog");
const outputBox = document.querySelector("output");
const selectEl = favDialog.querySelector("select");
const confirmBtn = favDialog.querySelector("#confirmBtn");





//  ResetInputValues
function resetInputValuesForTimer() {
    sessionDurationInput.value = "";
    shortBreakDurationInput.value = "";
    longBreakDurationInput.value = "";
}

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
};

const openModalFunction = () => {
    sessionModals.classList.remove("hidden");
    overlayDiv.classList.remove("hidden");
    taskForm.classList.remove("hidden");
    settingsDiv.classList.remove("hidden");

    //sessionCardButtonSetting.classList.remove("hidden");
};

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
        if (timerIsPaused === true) {
            // 09 : 57 == 57 + 09*60 = 597
            let remainingSecs =
                parseInt(timerElement.textContent.slice(-2)) +
                parseInt(timerElement.textContent.slice(2, 0) * 60);
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
    stopShortBreakTimer();
    stopLongBreakTimer();
    clearInterval(timer);
    clearInterval(shortBreakTimer);
    clearInterval(longBreakTimer);
    startButton.style.zIndex = "1";
    stopButton.style.zIndex = "-1";
};

const play = () => (timerIsPaused = false);
const stop = () => (timerIsPaused = true);

// display none for start 

if (!time) {
    startButton.style.display = "none";
    startShortBreakButton.style.display = "none";
    startLongBreakButton.style.display = "none";
    stopButton.style.display = "none";
    stopShortBreakButton.style.display = "none";
    stopLongBreakButton.style.display = "none";
}

// SHORT BREAK TIMER

let shortBreakTimer;
let shortBreakTimerIsPaused = false;
let shortBreakTime;

const startShortBreakTimer = () => {
    //let time;
    const tickTock = () => {
        //Functionality if the timer is paused or not
        if (shortBreakTimerIsPaused === true) {
            // 09 : 57 == 57 + 09*60 = 597
            let remainingSecs =
                parseInt(shortBreakDiv.textContent.slice(-2)) +
                parseInt(shortBreakDiv.textContent.slice(2, 0) * 60);
            let shortBreakTime = remainingSecs;

            const min = String(Math.trunc(shortBreakTime / 60)).padStart(2, 0);
            const sec = String(shortBreakTime % 60).padStart(2, 0);

            shortBreakDiv.textContent = `${min} : ${sec}`;

            if (shortBreakTime === 0) {
                clearInterval(shortBreakTimer);
                shortBreakDiv.style.fontSize = "35px";
                shortBreakDiv.textContent = "Short break is over!";
            }
            startShortBreakButton.style.zIndex = "-1";
            stopShortBreakButton.style.zIndex = "1";
            shortBreakTime--;
        } else {
            const min = String(Math.trunc(shortBreakTime / 60)).padStart(2, 0);
            const sec = String(shortBreakTime % 60).padStart(2, 0);

            // In each call, print the remaining time to UI
            shortBreakDiv.textContent = `${min}:${sec}`;

            // When 0 seconds, stop timer and print message
            if (shortBreakTime === 0) {
                clearInterval(shortBreakTimer);
                shortBreakDiv.style.fontSize = "35px";
                shortBreakDiv.textContent = "Short break is over!";
            }

            // hide start , show stop button
            startShortBreakButton.style.zIndex = "-1";
            stopShortBreakButton.style.zIndex = "1";
            // Decrease 1s
            shortBreakTime--;
        }
    };

    tickTock();
    playShortBreak();

    // Call the timer every second
    shortBreakTimer = setInterval(tickTock, 1000);
    return shortBreakTimer;
};

const stopShortBreakTimer = () => {
    stopShortBreak();
    clearInterval(shortBreakTimer);
    startShortBreakButton.style.zIndex = "1";
    stopShortBreakButton.style.zIndex = "-1";
};

const playShortBreak = () => (shortBreakTimerIsPaused = false);
const stopShortBreak = () => (shortBreakTimerIsPaused = true);

// LONG BREAK TIMER

let longBreakTimer;
let longBreakTimerIsPaused = false;
let longBreakTime;

const startLongBreakTimer = () => {
    //let time;
    const tickTock = () => {
        //Functionality if the timer is paused or not
        if (longBreakTimerIsPaused === true) {
            // 09 : 57 == 57 + 09*60 = 597

            let remainingSecs =
                parseInt(longBreakDiv.textContent.slice(-2)) +
                parseInt(longBreakDiv.textContent.slice(2, 0) * 60);
            let longBreakTime = remainingSecs;

            const min = String(Math.trunc(longBreakTime / 60)).padStart(2, 0);
            const sec = String(longBreakTime % 60).padStart(2, 0);

            longBreakDiv.textContent = `${min} : ${sec}`;

            if (longBreakTime === 0) {
                clearInterval(longBreakTimer);
                longBreakDiv.style.fontSize = "35px";
                longBreakDiv.textContent = "Long break is over!";
            }
            startLongBreakButton.style.zIndex = "-1";
            stopLongBreakButton.style.zIndex = "1";
            longBreakTime--;
        } else {
            const min = String(Math.trunc(longBreakTime / 60)).padStart(2, 0);
            const sec = String(longBreakTime % 60).padStart(2, 0);

            // In each call, print the remaining time to UI
            longBreakDiv.textContent = `${min}:${sec}`;

            // When 0 seconds, stop timer and print message
            if (longBreakTime === 0) {
                clearInterval(longBreakTimer);
                longBreakDiv.style.fontSize = "35px";
                longBreakDiv.textContent = "Long break is over!";
            }

            // hide start , show stop button
            startLongBreakButton.style.zIndex = "-1";
            stopLongBreakButton.style.zIndex = "1";

            // Decrease 1s
            longBreakTime--;
        }
    };

    tickTock();
    playLongBreak();
    // Call the timer every second
    longBreakTimer = setInterval(tickTock, 1000);
    return longBreakTimer;
};

const stopLongBreakTimer = () => {
    stopLongBreak();
    clearInterval(longBreakTimer);
    startLongBreakButton.style.zIndex = "1";
    stopLongBreakButton.style.zIndex = "-1";
};

const playLongBreak = () => (longBreakTimerIsPaused = false);
const stopLongBreak = () => (longBreakTimerIsPaused = true);



// if ((timerElement.innerText.slice(2, 0) === "00") && (timerElement.innerText.slice(-2) === "00")) {

if (isNaN(timerElement.innerText)) {
    console.log("user unfriendly");
} else {
    startButton.addEventListener("click", startTimer);
}

if (isNaN(shortBreakDiv.innerText)) {
    console.log("user unfriendly");
} else {
    startShortBreakButton.addEventListener("click", startShortBreakTimer);
}

if (isNaN(longBreakDiv.innerText)) {
    console.log("user unfriendly");
} else {
    startLongBreakButton.addEventListener("click", startLongBreakTimer);
}

// TIMER VALUES
// FOR SESSION TIMER
confirmSessionDurationButton.addEventListener("click", () => {
    time = sessionDurationInput.value;
    timerElement.innerText = `${time.padStart(2, 0)} : 00`;
    time = time * 60;
    settingsDiv.classList.add("hidden");

    closeModalFunction();
    startButton.addEventListener("click", startTimer);
});
// FOR SHORT BREAK SESSION
confirmSessionDurationButton.addEventListener("click", () => {
    shortBreakTime = shortBreakDurationInput.value;
    shortBreakDiv.innerText = `${shortBreakTime.padStart(2, 0)} : 00`;
    shortBreakTime = shortBreakTime * 60;
    settingsDiv.classList.add("hidden");

    closeModalFunction();
    startShortBreakButton.addEventListener("click", startShortBreakTimer);
});
// FOR LONG BREAK SESSION
confirmSessionDurationButton.addEventListener("click", () => {
    longBreakTime = longBreakDurationInput.value;
    longBreakDiv.innerText = `${longBreakTime.padStart(2, 0)} : 00`;
    longBreakTime = longBreakTime * 60;
    settingsDiv.classList.add("hidden");
    if (sessionDurationInput.value < 1) {
        stopTimer();
    }
    if (shortBreakDurationInput.value < 1) {
        stopTimer();
    }
    if (longBreakDurationInput.value < 1) {
        stopTimer();
    }
    resetInputValuesForTimer();
    closeModalFunction();

    timerElement.style.display = "flex";
    body.style.backgroundColor = "rgb(165, 178, 233)";
    sessionCardButtonTimer.style.backgroundColor = "rgb(165, 178, 233)";
    sessionCardButtonTimer.style.color = "white";
    sessionCardButtonSetting.style.color = "#444";
    sessionCardButtonSetting.style.backgroundColor = "transparent";

    if (!time || timerElement.innerContent == "Your time is up!") {
        startButton.style.display = "none";
        stopButton.style.display = "none";
        startLongBreakButton.style.display = "none";
        stopLongBreakButton.style.display = "none";
        startShortBreakButton.style.display = "none";
        stopShortBreakButton.style.display = "none";
        goToBreak.style.display = "none";
        backToSession.style.display = "none";
    } else {
        startButton.style.display = "flex";
        stopButton.style.display = "flex";
        if (shortBreakTime < 1 || longBreakTime < 1) {
            goToBreak.style.display = "none";
        } else {
            goToBreak.style.display = "flex"
        }

    }

    startLongBreakButton.addEventListener("click", startLongBreakTimer);
});
// if (isNaN(timerElement.innerText)) {
//     console.log("user unfriendly");
// } else {
//     startButton.addEventListener("click", () => {
//         const divArray = [timerElement, shortBreakDiv, longBreakDiv];
//         let currentDiv;
//         for(let i=0; i < divArray.length; i++) {
//             if(i.style.display === "flex") {
//                 currentDiv = i;
//             }
//         }

//     });
// }

// STOP FOR SESSION TIMER

stopButton.addEventListener("click", function () {
    if (!timerIsPaused) clearInterval(timer);

    //   pause_game();
    // hide stop , show start button
    startButton.style.zIndex = "1";
    stopButton.style.zIndex = "-1";
    if (timerElement.innerText === "Your time is up!") {
        startButton.removeEventListener("click", startTimer);
    }
});

// STOP FOR SHORT BREAK TIMER

stopShortBreakButton.addEventListener("click", function () {
    if (!shortBreakTimerIsPaused) {
        shortBreakTime = 0;
        // clearInterval(shortBreakTime);
        stopShortBreakButton.style.display = "none";
        startShortBreakButton.style.display = "none";
        backToSession.style.display = "flex";
        alert("End Break?");
    }

    if (shortBreakDiv.innerText === "Short Break is over!") {
        startShortBreakButton.removeEventListener("click", startShortBreakTimer);
        stopShortBreakButton.removeEventListener("click", stopShortBreakTimer);
    }
});

// STOP FOR LONG BREAK TIMER

stopLongBreakButton.addEventListener("click", function () {
    if (!longBreakTimerIsPaused) {
        longBreakTime = 0;
        // clearInterval(longBreakTimer);
        stopLongBreakButton.style.display = "none";
        startLongBreakButton.style.display = "none";
        backToSession.style.display = "flex";
        alert("End Break?");
    }

    if (longBreakDiv.innerText === "Long Break is over!") {
        startLongBreakButton.removeEventListener("click", startLongBreakTimer);
        stopLongBreakButton.removeEventListener("click", stopLongBreakTimer);
    }
});

// Dialog
// If Browser does not support Dialog
if (typeof favDialog.showModal !== "function") {
    favDialog.hidden = true;
    /* a fallback script to allow this dialog/form to function
         for legacy browsers that do not support <dialog>
         could be provided here.
      */
}

// SKIP TO BREAK
goToBreak.style.display = "none";

goToBreak.addEventListener("click", function onOpen() {
    if (typeof favDialog.showModal === "function") {
        favDialog.showModal();
    } else {
        outputBox.value =
            "Sorry, the <dialog> API is not supported by this browser.";
    }
});

selectEl.addEventListener("change", function onSelect(e) {
    confirmBtn.value = selectEl.value;
});

favDialog.addEventListener("close", function onClose() {
    timerElement.style.display = "none";
    goToBreak.style.display = "none";
    switch (favDialog.returnValue) {
        case "Short Break":
            shortBreakDiv.style.display = "flex";
            sessionCardButtonShortBreak.style.color = "white";
            sessionCardButtonShortBreak.style.backgroundColor = "rgb(89, 143, 148)";
            body.style.backgroundColor = "rgb(89, 143, 148)";
            sessionCardButtonTimer.style.backgroundColor = "transparent";
            sessionCardButtonTimer.style.color = "#444";
            startButton.style.display = "none";
            stopButton.style.display = "none";
            startLongBreakButton.style.display = "none";
            stopLongBreakButton.style.display = "none";
            startShortBreakButton.style.display = "flex";
            stopShortBreakButton.style.display = "flex";
            break;
        case "Long Break":
            longBreakDiv.style.display = "flex";
            timerElement.style.display = "none";
            shortBreakDiv.style.display = "none";
            body.style.backgroundColor = "rgb(80, 121, 161)";
            sessionCardButtonsLongBreak.style.backgroundColor = "rgb(80, 121, 161)";
            sessionCardButtonsLongBreak.style.color = "white";
            sessionCardButtonShortBreak.style.backgroundColor = "transparent";
            sessionCardButtonTimer.style.backgroundColor = "transparent";
            sessionCardButtonSetting.style.backgroundColor = "transparent";
            sessionCardButtonSetting.style.color = "#444";
            sessionCardButtonShortBreak.style.color = "#444";
            sessionCardButtonTimer.style.color = "#444";
            startButton.style.display = "none";
            stopButton.style.display = "none";
            startShortBreakButton.style.display = "none";
            stopShortBreakButton.style.display = "none";
            startLongBreakButton.style.display = "flex";
            stopLongBreakButton.style.display = "flex";
            break;
        default:
            timerElement.style.display = "flex";
            shortBreakDiv.style.display = "none";
            longBreakDiv.style.display = "none";
            body.style.backgroundColor = "rgb(165, 178, 233)";
            sessionCardButtonTimer.style.backgroundColor = "rgb(165, 178, 233)";
            sessionCardButtonTimer.style.color = "white";
            sessionCardButtonShortBreak.style.backgroundColor = "transparent";
            sessionCardButtonsLongBreak.style.backgroundColor = "transparent";
            sessionCardButtonSetting.style.backgroundColor = "transparent";
            sessionCardButtonShortBreak.style.color = "#444";
            sessionCardButtonsLongBreak.style.color = "#444";
            sessionCardButtonSetting.style.color = "#444";
            startButton.style.display = "flex";
            stopButton.style.display = "flex";
            goToBreak.style.display = "flex";
            startShortBreakButton.style.display = "none";
            stopShortBreakButton.style.display = "none";
            startLongBreakButton.style.display = "none";
            stopLongBreakButton.style.display = "none";
            break;
    }

    if (!timerIsPaused) clearInterval(timer);
    startButton.style.zIndex = "1";
    stopButton.style.zIndex = "-1";
    if (timerElement.innerText === "Your time is up!") {
        startButton.removeEventListener("click", startTimer);
    }
});

// BACK TO SESSION

backToSession.style.display = "none";

backToSession.addEventListener("click", function () {
    timerElement.style.display = "flex";
    shortBreakDiv.style.display = "none";
    longBreakDiv.style.display = "none";
    body.style.backgroundColor = "rgb(165, 178, 233)";
    sessionCardButtonTimer.style.backgroundColor = "rgb(165, 178, 233)";
    sessionCardButtonTimer.style.color = "white";
    sessionCardButtonShortBreak.style.color = "#444";
    sessionCardButtonsLongBreak.style.color = "#444";
    sessionCardButtonsLongBreak.style.backgroundColor = "transparent";
    sessionCardButtonShortBreak.style.backgroundColor = "transparent";
    backToSession.style.display = "none";
    startButton.style.display = "flex";
    stopButton.style.display = "flex";
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

// SETTINGS BUTTON
sessionCardButtonSetting.addEventListener("click", () => {
    sessionModals.classList.remove("hidden");
    overlayDiv.classList.remove("hidden");
    sessionCardButtonSetting.style.backgroundColor = "rgba(0, 0, 0, 0.193)";
    cardContainer.style.backgroundColor = "white";
    sessionCardButtonsLongBreak.style.backgroundColor = "transparent";
    sessionCardButtonShortBreak.style.backgroundColor = "transparent";
    sessionCardButtonTimer.style.backgroundColor = "transparent";
    sessionCardButtonTimer.style.color = "#444";
    sessionCardButtonsLongBreak.style.color = "#444";
    sessionCardButtonShortBreak.style.color = "#444";
    body.style.backgroundColor = "rgb(165, 178, 233)";
    if (!time || timerElement.innerContent == "Your time is up!") {
        startButton.style.display = "none";
        stopButton.style.display = "none";
        startLongBreakButton.style.display = "none";
        stopLongBreakButton.style.display = "none";
        startShortBreakButton.style.display = "none";
        stopShortBreakButton.style.display = "none";
        goToBreak.style.display = "none";
        backToSession.style.display = "none";
    } else {
        startButton.style.display = "flex";
        stopButton.style.display = "flex";

    }
    // cardContainer.style.backgroundImage =
    //     "linear-gradient(315deg, #537895 0%, #09203f 74%)";
    // body.style.backgroundImage =
    //     "linear-gradient(315deg, #537895 0%, #09203f 74%)";
});

// SHORT BREAK BUTTON
shortBreakDiv.style.display = "none";

sessionCardButtonShortBreak.addEventListener("click", () => {
    sessionModals.classList.add("hidden");
    overlayDiv.classList.add("hidden");
    shortBreakDiv.classList.remove("hidden");
    timerElement.style.display = "none";
    longBreakDiv.style.display = "none";
    shortBreakDiv.style.display = "flex";
    body.style.backgroundColor = "rgb(89, 143, 148)";
    sessionCardButtonShortBreak.style.backgroundColor = "rgb(89, 143, 148)";
    sessionCardButtonShortBreak.style.color = "white";
    sessionCardButtonsLongBreak.style.backgroundColor = "transparent";
    sessionCardButtonTimer.style.backgroundColor = "transparent";
    sessionCardButtonSetting.style.backgroundColor = "transparent";
    sessionCardButtonsLongBreak.style.color = "#444";
    sessionCardButtonTimer.style.color = "#444";
    sessionCardButtonSetting.style.color = "#444";
    startButton.style.display = "none";
    stopButton.style.display = "none";
    startLongBreakButton.style.display = "none";
    stopLongBreakButton.style.display = "none";
    goToBreak.style.display = "none";
    backToSession.style.display = "flex";
    if (!shortBreakTime || shortBreakDiv.textContent === "Short break is over!") {
        stopShortBreakButton.style.display = "none";
        startShortBreakButton.style.display = "none";
        backToSession.style.display = "none";
    } else {
        startShortBreakButton.style.display = "flex";
        stopShortBreakButton.style.display = "flex";
    }

    // if(stopButton.style.zIndex = "1") {
    //     startButton.style.zIndex = "1";
    //     stopButton.style.zIndex = "-1";
    // }
    // cardContainer.style.backgroundImage =
    //     "linear-gradient(315deg, #20bf55 0%, #01baef 74%)";
    // body.style.backgroundImage =
    //     "linear-gradient(315deg, #20bf55 0%, #01baef 74%)";
});

// LONG BREAK BUTTON
longBreakDiv.style.display = "none";

sessionCardButtonsLongBreak.addEventListener("click", () => {
    sessionModals.classList.add("hidden");
    overlayDiv.classList.add("hidden");
    longBreakDiv.classList.remove("hidden");
    timerElement.style.display = "none";
    shortBreakDiv.style.display = "none";
    longBreakDiv.style.display = "flex";
    body.style.backgroundColor = "rgb(80, 121, 161)";
    sessionCardButtonsLongBreak.style.backgroundColor = "rgb(80, 121, 161)";
    sessionCardButtonsLongBreak.style.color = "white";
    sessionCardButtonShortBreak.style.backgroundColor = "transparent";
    sessionCardButtonTimer.style.backgroundColor = "transparent";
    sessionCardButtonSetting.style.backgroundColor = "transparent";
    sessionCardButtonSetting.style.color = "#444";
    sessionCardButtonShortBreak.style.color = "#444";
    sessionCardButtonTimer.style.color = "#444";
    startButton.style.display = "none";
    stopButton.style.display = "none";
    startShortBreakButton.style.display = "none";
    stopShortBreakButton.style.display = "none";
    goToBreak.style.display = "none";
    if (!longBreakTime || longBreakDiv.textContent === "Long break is over!") {
        stopShortBreakButton.style.display = "none";
        startLongBreakButton.style.display = "none"
        backToSession.style.display = "none";

    } else {
        startLongBreakButton.style.display = "flex";
        stopLongBreakButton.style.display = "flex";
    }


    // if(stopButton.style.zIndex = "1") {
    //     startButton.style.zIndex = "1";
    //     stopButton.style.zIndex = "-1";
    // }

    // cardContainer.style.backgroundImage =
    //     "linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%)";
    // body.style.backgroundImage =
    //     "linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%)";
});

// SESSION BUTTON
sessionCardButtonTimer.addEventListener("click", () => {
    sessionModals.classList.add("hidden");
    overlayDiv.classList.add("hidden");
    timerElement.style.display = "flex";
    shortBreakDiv.style.display = "none";
    longBreakDiv.style.display = "none";
    body.style.backgroundColor = "rgb(165, 178, 233)";
    sessionCardButtonTimer.style.backgroundColor = "rgb(165, 178, 233)";
    sessionCardButtonTimer.style.color = "white";
    sessionCardButtonShortBreak.style.backgroundColor = "transparent";
    sessionCardButtonsLongBreak.style.backgroundColor = "transparent";
    sessionCardButtonSetting.style.backgroundColor = "transparent";
    sessionCardButtonShortBreak.style.color = "#444";
    sessionCardButtonsLongBreak.style.color = "#444";
    sessionCardButtonSetting.style.color = "#444";
    startShortBreakButton.style.display = "none";
    stopShortBreakButton.style.display = "none";
    startLongBreakButton.style.display = "none";
    stopLongBreakButton.style.display = "none";
    backToSession.style.display = "none";
    if (!time || timerElement.innerContent == "Your time is up!") {
        startButton.style.display = "none";
        stopButton.style.display = "none";
        goToBreak.style.display = "none";
    } else {
        startButton.style.display = "flex";
        stopButton.style.display = "flex";
        if (shortBreakTime < 1 || longBreakTime < 1) {
            goToBreak.style.display = "none";
        } else {
            goToBreak.style.display = "flex"
        }

    }

});

settingsButton.addEventListener("click", () => {
    settingsDiv.classList.remove("hidden");
    overlayDiv.classList.add("hidden");
    sessionModals.classList.add("hidden");
    resetInputValuesForTimer();
});

//Add task
addTaskButton.addEventListener("click", () => {
    taskForm.classList.remove("hidden");
    overlayDiv.classList.remove("hidden");
});

//Arrows up and down
timerUpButton.addEventListener("click", () => {
    timerInput.value++;
});

timerDownButton.addEventListener("click", () => {
    timerInput.value > 0 ? timerInput.value-- : (timerInput.value = 0);
});

//Add note in task form button
if ((textAreaOfTask.style.display = "none")) {
    addNoteButton.addEventListener("click", function () {
        textAreaOfTask.style.display = "block";
    });
} //ne e funkcionalno kopcheto koga vekje e otvorena textarea za pishuvanje na note, t.e. raboti samo koga ne e otvorena textArea

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

// userDurationInput(confirmSessionDurationButton, longBreakDurationInput, longBreakDiv);
// userDurationInput(confirmSessionDurationButton, shortBreakDurationInput, shortBreakDiv, startShortBreakTimer);
// userDurationInput(confirmSessionDurationButton, sessionDurationInput, timerElement, startTimer);

// buttonEvent, inputValue, htmlElement



///ADD TASK FUNCTIONALITY



{
    /* <label for="priority">Priority:</label>
      <select id="priority">
          <option value="">---Nothing Selected---</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
      </select> */
}
const saveTaskButton = document.querySelector("#saveTaskButton");
const listOfTasks = document.querySelector(".orderedListOfTasks");
const taskPriority = document.querySelector("#priority");
const taskPace = document.querySelector("#pace");
const cancelTaskButton = document.querySelector("#cancelTaskButton");

cancelTaskButton.addEventListener("click", function () {
    resetTaskInputs();
    taskForm.classList.add("hidden");
    overlayDiv.classList.add("hidden");
})

let arrayOfTasks = [];

saveTaskButton.addEventListener("click", () => {
    //TODO - Take the input values from the form and add them to listOfTasks in a <li> dynamically - done
    //close the AddTasks form upon clicking Save and return all values to empty - done
    //Each task in the list should have the added note visible as well as the assigned duration for the task - wtf?
    //Include also the priority and pace, once they are added to the Add Task form - done
    //Add validation that makes sure priority, name, time and pace have values assigned by the user - done
    if (arrayOfTasks.length < 5) {
        const taskInputs = [taskTitle.value, taskDuration.value, taskPriority.options[taskPriority.selectedIndex].value, taskPace.options[taskPace.selectedIndex].value];

        if (taskTitle.value && taskDuration.value && taskPriority.options[taskPriority.selectedIndex].value && taskPace.options[taskPace.selectedIndex].value) {
            let li = document.createElement("li");
            li.setAttribute("class", "liOfTasks");

            // let liContent = li.appendChild(document.createElement("div"));
            // liContent.setAttribute("class", "divInLi");
            li.innerHTML += `<b>Title</b>: ${taskTitle.value}; <b>Duration</b>: ${taskDuration.value}; <b>Priority</b>: ${taskPriority.options[taskPriority.selectedIndex].value}; <b>Pace</b>: ${taskPace.options[taskPace.selectedIndex].value}`;

            // liContent.setAttribute("class", "divInLi");
            // liContent.innerHTML += `<b>Title</b>: ${taskTitle.value}; <b>Duration</b>: ${taskDuration.value}; <b>Priority</b>: ${taskPriority.options[taskPriority.selectedIndex].value}; <b>Pace</b>: ${taskPace.options[taskPace.selectedIndex].value}`;
            // liContent.innerHTML += `<p class="${getPriority()}"><b>Title</b>: ${taskTitle.value}; <b>Duration</b>: ${taskDuration.value}; <b>Priority</b>: ${taskPriority.options[taskPriority.selectedIndex].value}; <b>Pace</b>: ${taskPace.options[taskPace.selectedIndex].value}</p>`;

            listOfTasks.appendChild(li);
            console.log(taskPriority.options[taskPriority.selectedIndex].value, taskPace.options[taskPace.selectedIndex].value);
            setColor(li);
            getPriority2(li);
            arrayOfTasks.push(li);
            resetTaskInputs();
        }

        console.log(arrayOfTasks);

    }
    else alert("You can't have more than 5 tasks at a time!");
});


function getPriority2(element) {
    switch (taskPriority.options[taskPriority.selectedIndex].value) {
        case "Low":
            element.style.backgroundColor = "yellow";
            break;
        case "Medium":
            element.style.backgroundColor = "orange";
            break;
        case "High":
            element.style.background = "linear-gradient(180deg, rgba(225, 250, 137, 0.3029586834733894) 0%, rgba(2, 0, 36, 1) 0%, rgba(215, 248, 145, 1) 0%, rgba(98, 233, 225, 1) 88%)";
            break;
    }
}

// function getPriority() {
//     switch (taskPriority.options[taskPriority.selectedIndex].value) {
//         case "Low": return "yellow";
//         case "Medium": return "orange";
//         case "High": return "red";
//     }
// }

function setColor(element) {
    if (element.classList.contains("red")) element.style.backgroundColor = "red";
    if (element.classList.contains("yellow")) element.style.backgroundColor = "yellow";
    if (element.classList.contains("orange")) element.style.backgroundColor = "orange";
}

function Priority(title, priority, color, description, pace) {
    this.title = title;
    this.priority = priority;
    this.color = color;
    this.description = description;
    this.pace = pace;
}

function resetTaskInputs() {
    taskTitle.value = "";
    taskPriority.selectedIndex = 0;
    taskDuration.value = 1;
    //colorElem.value = "";
    //description.value = "";
    taskPace.selectedIndex = 0;
}

function validateInputs() {
    if (!titleElem.value) {
        return false;
    }
    if (!priorityElem.value) {
        return false;
    }
    if (!colorElem.value) {
        return false;
    }
    if (!description.value) {
        return false;
    }
    if (!pace.value) {
        return false;
    }

    return true;
}


// if (!validateInputs()) {
//     alert("You must enter all values in the inputs");
//     return;
// }
// for (let i = 0; i < sessionCardButtons.length; i++) {
//     sessionCardButtons[i].addEventListener("click", openModalFunction);
// };

// addTaskButtona
// sessionDurationInputds
// d
// d
// d
// d
// d
// d
// d
// d
// d
// d
// d

// decodeURI
// d
// d
let hrBorder = document.querySelector("#hr");
if (startButton.style.display == "flex" ||
    stopButton.style.display == "flex" ||
    goToBreak.style.display == "flex") {
    hrBorder.style.marginTop = "-10vh";
}


// !startShortBreakButton.style.display == "none" ||
//     !stopShortBreakButton.style.display == "none" ||
//     !startLongBreakButton.style.display == "none" ||
//     !stopLongBreakButton.style.display == "none" ||
//     !backToSession.style.display == "none") {