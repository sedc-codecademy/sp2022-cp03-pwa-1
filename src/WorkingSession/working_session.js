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
const body = document.querySelector("body");
const settingsButton = document.querySelector("#sessionSettings");
const settingsDiv = document.querySelector(".settingsDiv");
const timerElement = document.querySelector("#timerDiv");

const timerInput = document.querySelector("#inputForTimeOfTask");
const addTaskButton = document.querySelector("#addTaskBtn");
const taskForm = document.querySelector(".taskFormDiv");
const timerUpButton = document.querySelector("#arrowUp");
const timerDownButton = document.querySelector("#arrowDown");
const shortBreakUpButton = document.querySelector("#arrowUpShortBreak");
const shortBreakDownButton = document.querySelector("#arrowDownShortBreak");
const longBreakUpButton = document.querySelector("#arrowUpLongBreak");
const longBreakDownButton = document.querySelector("#arrowDownLongBreak");
const addNoteButton = document.querySelector("#noteForTaskBtn");
const textAreaOfTask = document.querySelector("#taskText");
const taskTitle = document.querySelector("#inputForTaskTitle");
const taskDuration = document.querySelector("#inputForTimeOfTask");
const confirmSessionDurationButton = document.querySelector(
  "#startingTimerValueButton"
);
const shortBreakDurationInput = document.querySelector(
  "#startingShortBreakValueInput"
);
const longBreakDurationInput = document.querySelector(
  "#startingLongBreakValueInput"
);

const shortBreakDiv = document.querySelector("#shortBreakDiv");
const longBreakDiv = document.querySelector("#longBreakDiv");

const cancelTimeInput = document.querySelector("#cancelTimerValueButton");
const taskButtonsDiv = document.querySelector("#taskButtons");
const selectionFiledPriority = document.querySelector("#priority");
const selectionFieldPace = document.querySelector("#pace");

settingsButton.style.display = "none";

// Class Timer
class Timer {
  constructor(root, timer) {
    root.innerHTML = Timer.getHTML();

    this.el = {
      minutes: root.querySelector(".timer__part--minutes"),
      seconds: root.querySelector(".timer__part--seconds"),
      control: root.querySelector(".timer__btn--control"),
      goToBreak: root.querySelector(".timer__btn--break"),
    };

    this.interval = null;
    this.remainingSeconds = 0;

    this.el.control.addEventListener("click", () => {
      if (this.interval === null) {
        this.start();
      } else {
        this.stop();
      }
    });

    this.el.goToBreak.addEventListener("click", () => {
      if (this.interval === null || typeof favDialog.showModal === "function") {
        this.stop();
        favDialog.showModal();
      } else {
        this.stop();
        outputBox.value =
          "Sorry, the <dialog> API is not supported by this browser.";
      }
    });

    selectEl.addEventListener("change", function onSelect(e) {
      confirmBtn.value = selectEl.value;
    });

    favDialog.addEventListener("close", function onClose() {
      switch (favDialog.returnValue) {
        case "Short Break":
          shortBreakDRY();
          break;
        case "Long Break":
          longBreakDRY();
          break;
        case "Session":
          sessionTimerDRY();
          break;
        default:
          break;
      }
    });

    const inputMinutes = String(timer);

    if (inputMinutes < 60) {
      this.stop();
      this.remainingSeconds = inputMinutes * 60;
      this.updateInterfaceTime();
    }
  }

  updateInterfaceTime() {
    const minutes = Math.floor(this.remainingSeconds / 60);
    const seconds = this.remainingSeconds % 60;

    this.el.minutes.textContent = minutes.toString().padStart(2, "0");
    this.el.seconds.textContent = seconds.toString().padStart(2, "0");
  }

  updateInterfaceControls() {
    if (this.interval === null) {
      this.el.control.innerHTML = `<button id="startSessionBtn">&#x23f5;</button>`;
      this.el.control.classList.add("timer__btn--start");
      this.el.control.classList.remove("timer__btn--stop");
    } else {
      this.el.control.innerHTML = `<button id="stopSessionBtn">&#x23f8;</button>`;
      this.el.control.classList.add("timer__btn--stop");
      this.el.control.classList.remove("timer__btn--start");
    }
  }

  start() {
    if (this.remainingSeconds === 0) return;

    this.interval = setInterval(() => {
      this.remainingSeconds--;
      this.updateInterfaceTime();

      if (this.remainingSeconds === 0) {
        this.stop();
      }
    }, 1000);

    this.updateInterfaceControls();
  }

  stop() {
    clearInterval(this.interval);

    this.interval = null;

    this.updateInterfaceControls();
  }

  static getHTML() {
    return `
            <span class="timer__part timer__part--minutes">00</span>
            <span class="timer__part">:</span>
            <span class="timer__part timer__part--seconds">00</span>
            <button type="button" class="timer__btn timer__btn--control timer__btn--start"></button>
            <button type="button" class="timer__btn timer__btn--break">
                    <span class="fa fa-forward"></span>
                  </button>
            
            `;
  }
}
// Dialog for Short & Long Break options

const favDialog = document.getElementById("favDialog");
const outputBox = document.querySelector("output");
const selectEl = favDialog.querySelector("select");
const confirmBtn = favDialog.querySelector("#confirmBtn");

// Modals functionality

const closeModalFunction = () => {
  sessionModals.classList.add("hidden");
  overlayDiv.classList.add("hidden");
  taskForm.classList.add("hidden");
  settingsDiv.classList.add("hidden");
  textAreaOfTask.style.display = "none";
  timerInput.value = "1";
  taskTitle.value = "";
};

const openModalFunction = () => {
  sessionModals.classList.remove("hidden");
  overlayDiv.classList.remove("hidden");
  taskForm.classList.remove("hidden");
  settingsDiv.classList.remove("hidden");

  //sessionCardButtonSetting.classList.remove("hidden");
};

// Exit from dev of timers set

cancelTimeInput.addEventListener("click", function () {
  settingsDiv.classList.add("hidden");
  closeModalFunction();
});

// FOR LONG BREAK SESSION
confirmSessionDurationButton.addEventListener("click", () => {
  settingsDiv.classList.add("hidden");
  settingsDiv.classList.add("hidden");
  timerElement.style.display = "none";
  shortBreakDiv.style.display = "flex";
  body.style.background =
    "linear-gradient(120deg, rgba(89,143,148,1) 42%, rgba(68,144,173,1) 100%)";
  sessionCardButtonShortBreak.style.backgroundColor = "#598f94";
  sessionCardButtonShortBreak.style.color = "white";
  taskForm.style.background = "#598f94";
  taskButtonsDiv.style.background = "#598f94";
  sessionCardButtonSetting.style.color = "#444";
  sessionCardButtonSetting.style.backgroundColor = "transparent";
  closeModalFunction();
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
  shortBreakDiv.style.display = "none";
  longBreakDiv.style.display = "none";
  timerElement.style.display = "flex";
  // cardContainer.style.backgroundColor = "white";
  sessionCardButtonsLongBreak.style.backgroundColor = "transparent";
  sessionCardButtonShortBreak.style.backgroundColor = "transparent";
  sessionCardButtonTimer.style.backgroundColor = "transparent";
  sessionCardButtonTimer.style.color = "#444";
  sessionCardButtonsLongBreak.style.color = "#444";
  sessionCardButtonShortBreak.style.color = "#444";
  body.style.background =
    "linear-gradient(120deg, rgba(41, 128, 185, 1) 49%, rgba(69, 68, 173, 1) 98%)";
  taskForm.style.background = "#2980b9";
  taskButtonsDiv.style.background = "#2980b9";
  settingsDiv.style.backgroundImage = "#2980b9";
});

// SHORT BREAK BUTTON DRYING CODE

function shortBreakDRY() {
  taskForm.style.background = "#598f94";
  favDialog.style.background = "#598f94";
  taskButtonsDiv.style.background = "#598f94";
  sessionModals.classList.add("hidden");
  overlayDiv.classList.add("hidden");
  shortBreakDiv.classList.remove("hidden");
  timerElement.style.display = "none";
  longBreakDiv.style.display = "none";
  shortBreakDiv.style.display = "flex";
  body.style.background =
    "linear-gradient(120deg, rgba(89,143,148,1) 42%, rgba(68,144,173,1) 100%)";
  sessionCardButtonShortBreak.style.backgroundColor = "#598f94";
  sessionCardButtonShortBreak.style.color = "white";
  sessionCardButtonsLongBreak.style.backgroundColor = "transparent";
  sessionCardButtonTimer.style.backgroundColor = "transparent";
  sessionCardButtonSetting.style.backgroundColor = "transparent";
  sessionCardButtonsLongBreak.style.color = "#444";
  sessionCardButtonTimer.style.color = "#444";
  sessionCardButtonSetting.style.color = "#444";
}

shortBreakDiv.style.display = "none";

sessionCardButtonShortBreak.addEventListener("click", () => {
  shortBreakDRY();
});

// LONG BREAK BUTTON DRYING countOfDaysAccessed

function longBreakDRY() {
  taskForm.style.background = "#5079a1";
  favDialog.style.background = "#5079a1";
  taskButtonsDiv.style.background = "#5079a1";
  sessionModals.classList.add("hidden");
  overlayDiv.classList.add("hidden");
  longBreakDiv.classList.remove("hidden");
  timerElement.style.display = "none";
  shortBreakDiv.style.display = "none";
  longBreakDiv.style.display = "flex";
  body.style.background =
    "linear-gradient(120deg, rgba(80,121,161,1) 42%, rgba(68,151,173,1) 100%)";
  sessionCardButtonsLongBreak.style.backgroundColor = "rgb(80, 121, 161)";
  sessionCardButtonsLongBreak.style.color = "white";
  sessionCardButtonShortBreak.style.backgroundColor = "transparent";
  sessionCardButtonTimer.style.backgroundColor = "transparent";
  sessionCardButtonSetting.style.backgroundColor = "transparent";
  sessionCardButtonSetting.style.color = "#444";
  sessionCardButtonShortBreak.style.color = "#444";
  sessionCardButtonTimer.style.color = "#444";
}
longBreakDiv.style.display = "none";

sessionCardButtonsLongBreak.addEventListener("click", () => {
  longBreakDRY();
});

function sessionTimerDRY() {
  sessionModals.classList.add("hidden");
  overlayDiv.classList.add("hidden");
  timerElement.style.display = "flex";
  shortBreakDiv.style.display = "none";
  longBreakDiv.style.display = "none";
  body.style.background =
    "linear-gradient(120deg, rgba(41, 128, 185, 1) 49%, rgba(69, 68, 173, 1) 98%)";
  sessionCardButtonTimer.style.backgroundColor = "#2980b9";
  taskForm.style.background = "#2980b9";
  favDialog.style.background = "#2980b9";
  taskButtonsDiv.style.background = "#2980b9";
  sessionCardButtonTimer.style.color = "white";
  sessionCardButtonShortBreak.style.backgroundColor = "transparent";
  sessionCardButtonsLongBreak.style.backgroundColor = "transparent";
  sessionCardButtonSetting.style.backgroundColor = "transparent";
  sessionCardButtonShortBreak.style.color = "#444";
  sessionCardButtonsLongBreak.style.color = "#444";
  sessionCardButtonSetting.style.color = "#444";
}

// SESSION BUTTON
sessionCardButtonTimer.addEventListener("click", () => {
  sessionTimerDRY();
});

settingsButton.addEventListener("click", () => {
  settingsDiv.classList.remove("hidden");
  overlayDiv.classList.remove("hidden");
  sessionModals.classList.add("hidden");
  // resetInputValuesForTimer();
});

//Add task
addTaskButton.addEventListener("click", () => {
  taskForm.classList.remove("hidden");
  overlayDiv.classList.remove("hidden");
  addNoteButton.style.display = "flex";
});

//Arrows up and down
timerUpButton.addEventListener("click", () => {
  timerInput.value++;
});

timerDownButton.addEventListener("click", () => {
  timerInput.value > 0 ? timerInput.value-- : (timerInput.value = 0);
});

shortBreakUpButton.addEventListener("click", () => {
  shortBreakDurationInput.value++;
});

shortBreakDownButton.addEventListener("click", () => {
  shortBreakDurationInput.value > 0
    ? shortBreakDurationInput.value--
    : (shortBreakDurationInput.value = 0);
});

longBreakUpButton.addEventListener("click", () => {
  longBreakDurationInput.value++;
});

longBreakDownButton.addEventListener("click", () => {
  longBreakDurationInput.value > 0
    ? longBreakDurationInput.value--
    : (longBreakDurationInput.value = 0);
});

//Add note in task form button
if ((textAreaOfTask.style.display = "none")) {
  addNoteButton.addEventListener("click", function () {
    textAreaOfTask.style.display = "block";
    // addNoteButton.style.display = "none";
  });
}

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
});
let sessions = [];
let arrayOfTasks = [];
let suma;
// let arrayOfDurationTimes = [];
// const sumValues = arrayOfDurationTimes.reduce((partialSum, a) => partialSum + a, 0);
// console.log(sumValues);

// const durationInputValues = {
//     times: [1, "hi", 3, true, 5]
// };

// const test = [...durationInputValues.times];
// console.log(test);

// let test = {
//     element: li,
//     time: parseInt(taskDuration.value),
//     id: arrayOfTasks.length + 1
// }

// const data = [
//     { type: "foo", id: "123" },
//     { type: "bar", id: "124" },
// ]
// const update = (data, value) => {
//     console.log('Updating/Inserting', value);
//     const existingItem = data.find(item => item.id === value.id);
//     if (existingItem === undefined) {
//         data.push(value);
//     } else {
//         existingItem.type = value.type;
//     }
// }
function reset() {
  localStorage.removeItem("sessions");
}
// reset();
function getLocalStorage() {
  const data = JSON.parse(localStorage.getItem("sessions"));
  if (!data) return;

  sessions = data;

  const something = sessions.forEach((element) => {
    for (let key in element) {
      console.log(`${key} ${element[key]}`);
    }
  });
  console.log(something);
}
// getLocalStorage();
const saveSession = () => {
  const allSessions = Json.parse(localStorage.getItem("sessions"));
  allSessions.push(session);
  localStorage.setItem("sessions", JSON.stringify(allSessions));
};
let counterForCard = 0;
let anotherCounterForCard = 0;

document.querySelectorAll(".values").forEach((item) => {
  item.addEventListener("click", function (e) {
    favDialog.style.background = "#2980b9";
    // Time Stamp must be inside of event listener so it will print a new time every time it has been called, if its outside it will be fired only once.
    const now = new Date();
    const timeStamp = new Intl.DateTimeFormat("en-GB", {
      dateStyle: "full",
      timeStyle: "long",
    }).format(now);

    //TODO - Take the input values from the form and add them to listOfTasks in a <li> dynamically - done
    //close the AddTasks form upon clicking Save and return all values to empty - done
    //Each task in the list should have the added note visible as well as the assigned duration for the task - wtf?-done
    //Include also the priority and pace, once they are added to the Add Task form - done
    //Add validation that makes sure priority, name, time and pace have values assigned by the user - done
    if (arrayOfTasks.length < 5) {
      const taskInputs = [
        taskTitle.value,
        taskDuration.value,
        taskPriority.options[taskPriority.selectedIndex].value,
        taskPace.options[taskPace.selectedIndex].value,
      ];
      //validateInputs();

      if (
        taskTitle.value &&
        taskDuration.value &&
        taskPriority.options[taskPriority.selectedIndex].value &&
        taskPace.options[taskPace.selectedIndex].value
      ) {
        settingsButton.style.display = "flex";
        let number = Math.floor(Math.random() * 100);
        //console.log(number);
        counterForCard++;
        anotherCounterForCard++;
        console.log(counterForCard);
        $(document).ready(function () {
          let li = document.createElement("li");
          li.setAttribute("class", "liOfTasks");
          li.innerHTML += `<b>Title</b>: ${
            taskTitle.value
          } <br><b>Duration</b>: ${
            taskDuration.value
          } min <br> <b>Priority</b>: ${
            taskPriority.options[taskPriority.selectedIndex].value
          }<br> <b>Pace</b>: ${
            taskPace.options[taskPace.selectedIndex].value
          } <br> <div id="timeStampValue" style="display: none">${timeStamp}</div>
                     <br> <div class='timer_block_${counterForCard}'>
                     <div class='controls_${counterForCard}'>
                         <button class="start_${counterForCard}" id="start_${counterForCard}">Play</button>
                         <button class="cancel_${counterForCard}" id='cancel_${counterForCard}'>Pause</button>               
                     </div>
                     <span id='timer_${counterForCard}' class='timer_${counterForCard}'></span>
                 </div> 
                     `;

          let paragraphId = document.createElement("p");
          paragraphId.setAttribute("class", "idOfCard");
          paragraphId.innerText = `${number}`;
          //console.log("hello");
          paragraphId.style.display = "none";
          li.appendChild(paragraphId);

          if (!textAreaOfTask.value == "") {
            //   console.log("hello");
            let newDiv = document.createElement("div");
            li.appendChild(newDiv);

            newDiv.setAttribute("class", "showNoteDiv");
            newDiv.style.display = "none";
            newDiv.innerText = `${textAreaOfTask.value}`;
            let showNoteButton = document.createElement("button");
            showNoteButton.setAttribute("class", "showNoteButton");
            showNoteButton.innerText = "Show note";

            li.appendChild(showNoteButton);
            showNoteButton.addEventListener("click", function () {
              newDiv.style.display = "flex";

              let hideNoteButton = document.createElement("button");
              hideNoteButton.setAttribute("class", "hideNoteButton");
              hideNoteButton.innerText = "Hide note";
              newDiv.appendChild(hideNoteButton);

              hideNoteButton.addEventListener("click", function () {
                newDiv.style.display = "none";
              });
            });

            // If div note is active change inherit color from active UI
            sessionCardButtonsLongBreak.addEventListener("click", () => {
              newDiv.style.backgroundColor = "#5079a1";
            });
            sessionCardButtonShortBreak.addEventListener("click", () => {
              newDiv.style.backgroundColor = "#598f94";
            });
            sessionCardButtonSetting.addEventListener("click", () => {
              newDiv.style.backgroundColor = "#2980b9";
            });
            sessionCardButtonTimer.addEventListener("click", () => {
              newDiv.style.backgroundColor = "#2980b9";
            });
          }

          // arrayOfDurationInputValues.push(taskDuration.value);
          // for (i = 0; i < arrayOfDurationInputValues.length; i++) {
          //     let helper = `${arrayOfDurationInputValues[i].time}`;
          //     sum2 += helper;
          // }
          // console.log(sum2);
          // for (const value of arrayOfDurationInputValues) {
          //     sum1 += +value;
          // }

          // const sumWithInitial = arrayOfDurationTimes.reduce(
          //     (previousValue, currentValue) =>
          //         previousValue + currentValue, 0
          // );
          // console.log(sumWithInitial);

          //     let helper = `${arrayOfDurationInputValues[i].time}`;
          //     sum2 += helper;

          let removeTaskButton = document.createElement("button");
          removeTaskButton.setAttribute("class", "removeTaskButton");
          removeTaskButton.innerText = "x";
          li.appendChild(removeTaskButton);

          removeTaskButton.addEventListener("click", function () {
            let confirmAction;
            confirmAction = confirm(
              "Are you sure you want to remove this task?"
            );
            if (confirmAction) {
              this.parentElement.remove();

              for (let i = 0; i < arrayOfTasks.length; i++) {
                if (arrayOfTasks[i].id == paragraphId.innerText) {
                  arrayOfTasks.splice(i, 1);
                }
              }
            }
          });

          listOfTasks.appendChild(li);
          //console.log(taskPriority.options[taskPriority.selectedIndex].value, taskPace.options[taskPace.selectedIndex].value);
          setColor(li);
          getPriority(li);

          // var start = $("#start_" + counterForCard)
          // var cancel = $("#cancel_" + counterForCard)
          // var reset = $("#reset_" + counterForCard)
          // var timer = $("#timer_" + counterForCard)

          // function getKey(jQObject) {
          //     for (const [key, value] of Object.entries(jQObject)) {

          //         console.log(`this is the value: ${value}`);

          //     }

          // }

          // getKey(start);
          // getKey(cancel);
          // getKey(reset);
          // getKey(timer);

          // let startDynamicVariable = `start_${counterForCard++}`;
          // let cancelDynamicVariable = `cancel_${counterForCard++}`;
          // let resetDynamicVariable = `reset_${counterForCard++}`;
          // let timerDynamicVariable = `timer_${counterForCard++}`;

          // $(".timerCard").html("<div></div>").addClass("timer_block");
          // $(".timer_block").append($("<div></div>").addClass("controls"));
          // $(".controls").append($("<a>Start</a>").addClass("start_btn").attr("id", "start_0").attr("href", "javascript:void(0)"));
          // $(".controls").append($("<a>Cancel</a>").addClass("cancel_btn").attr("id", "cancel_0").attr("href", "javascript:void(0)"));
          // $(".controls").append($("<a>Reset</a>").addClass("reset_btn").attr("id", "reset_0").attr("href", "javascript:void(0)"));
          // $(".timer_block").append($("<span>value placeholder</span>").addClass("timer").attr("id", "timer_0"));
        });

        counter = 0;

        let test = {
          title: taskTitle.value,
          assignedTaskDuration: taskDuration.value,
          timeNow: timeStamp,
          time: [],
          id: number,
        };

        $(`#timer_${counterForCard}`).backward_timer({
          seconds: test.assignedTaskDuration * 60,
        });
        $(`#start_${counterForCard}`).click(function () {
          if ($(`#timer_${counterForCard}`).backward_timer("start")) {
            test1.start();
          }
        });
        $(`#cancel_${counterForCard}`).click(function () {
          if ($(`#timer_${anotherCounterForCard}`).backward_timer("cancel")) {
            test1.stop();
          }
        });
        // <button class="reset_${counterForCard}" id='reset_${counterForCard}'>Reset</button>
        // $(`#reset_${counterForCard}`).click(function () {
        //   $(`#timer_${counterForCard}`).backward_timer("reset");
        // });
        // arrayOfDurationInputValues.push(parseInt(taskDuration.value));
        arrayOfTasks.push(test);

        test.time.push(parseInt(taskDuration.value));

        suma = arrayOfTasks
          .flatMap((parameter) => parameter.time)
          .reduce((sum, current) => sum + current, 0);
        // console.log(suma);
        function setLocalStorage() {
          localStorage.setItem("sessions", JSON.stringify(arrayOfTasks));
        }

        //setLocalStorage();
      } else {
      }

      // for (i = 0; i < arrayOfTasks.length; i++) {

      // }

      //let sum2 = 0;
      // for (i = 0; i < arrayOfDurationInputValues.length; i++) {
      //     let helper = `${arrayOfDurationInputValues[i].time}`;
      //     sum2 += arrayOfDurationInputValues[i];
      // }
      // console.log(sum2);

      // const sum3 = arrayOfDurationInputValues.reduce((partialSum, a) => partialSum + a, 0);
      // console.log(sum3);

      // timerElement.innerText = `${inputMinutes.padStart(2, 0)} : 00`;
      // inputMinutes = inputMinutes * 60;
      // startButton.addEventListener("click", startTimer);

      const test1 = new Timer(timerElement, suma);

      new Timer(shortBreakDiv, shortBreakDurationInput.value);

      new Timer(longBreakDiv, longBreakDurationInput.value);

      // const timeCard = document.querySelector("#timerCard");
      // new Timer(timeCard, taskDuration.value);

      if (e.target === saveTaskButton) {
        resetTaskInputs();
        closeModalFunction();
      }
    } else alert("You can't have more than 5 tasks at a time!");
  });
});

// Setting each note window color based on priority
function getPriority(element) {
  switch (taskPriority.options[taskPriority.selectedIndex].value) {
    case "Low":
      element.style.background =
        "linear-gradient(180deg, rgba(236,202,202,0.8763655975085347) 0%, rgba(246,208,48,1) 100%)";
      break;
    case "Medium":
      element.style.background =
        "linear-gradient(180deg, rgba(236,202,202,0.8763655975085347) 0%, rgba(246,105,48,1) 100%)";
      break;
    case "High":
      element.style.background =
        "linear-gradient(180deg, rgba(236,202,202,0.8763655975085347) 0%, rgba(246,48,48,1) 100%)";
      break;
  }
}

function resetTaskInputs() {
  taskTitle.value = "";
  taskPriority.selectedIndex = "";
  taskPace.selectedIndex = "";
  textAreaOfTask.value = "";
  textAreaOfTask.style.display = "none";
  textAreaOfTask.innerText = "";
}

function setColor(element) {
  if (element.classList.contains("red")) element.style.backgroundColor = "red";
  if (element.classList.contains("yellow"))
    element.style.backgroundColor = "yellow";
  if (element.classList.contains("orange"))
    element.style.backgroundColor = "orange";
}

function Priority(title, priority, color, description, pace) {
  this.title = title;
  this.priority = priority;
  this.color = color;
  this.description = description;
  this.pace = pace;
}

// =================================================================== CLEAR TASKS BUTTON
function resetTaskDurationValue() {
  taskDuration.value = 0;
  suma = 0;
}
const clearTaskButton = document.querySelector("#clearTasksBtn");

let clearHelper = clearTaskButton.addEventListener("click", function () {
  let confirmAction;
  if (!listOfTasks.innerHTML.trim() == "") {
    confirmAction = confirm("Are you sure you want to clear the tasks list?");
    if (confirmAction) {
      listOfTasks.innerHTML = "";
      new Timer(timerElement, resetTaskDurationValue());
      arrayOfTasks = [];
      console.log("List successfully deleted");
      console.log(arrayOfTasks);
    }
  } else console.log("The list is already empty.");
});

// function validateInputs() {
//     if (!taskTitle.value) {
//         return alert("Please enter a task title!");
//     }
//     if (taskPriority.selectedIndex == 0) {
//         return alert("Please choose a task priority!");
//     }
//     if (taskPace.selectedIndex == 0) {
//         return alert("Please choose a pace for the task!");
//     }
//     return true;
// }

// let hrBorder = document.getElementById("hr");
// if (!startButton.style.display == "none" ||
//     !stopButton.style.display == "none" ||
//     !goToBreak.style.display == "none" ||
//     !startShortBreakButton.style.display == "none" ||
//     !stopShortBreakButton.style.display == "none" ||
//     !startLongBreakButton.style.display == "none" ||
//     !stopLongBreakButton.style.display == "none" ||
//     !backToSession.style.display == "none") {
//     hrBorder.style.marginTop = "0vh";
// }
