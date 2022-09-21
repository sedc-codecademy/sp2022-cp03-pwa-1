import {
  sessionCardButtons, sessionModals, closeButton, overlayDiv, startButton, cardContainer, sessionCardBodyDiv,
  sessionCardButtonShortBreak, sessionCardButtonsLongBreak, sessionCardButtonTimer, body, settingsButton, settingsDiv, timerElement,
  sessionButtonsDiv, timerInput, addTaskButton, taskForm, timerUpButton, timerDownButton, shortBreakUpButton, shortBreakDownButton,
  longBreakUpButton, longBreakDownButton, addNoteButton, textAreaOfTask, taskTitle, taskDuration, confirmSessionDurationButton,
  shortBreakDurationInput, longBreakDurationInput, shortBreakDiv, longBreakDiv, cancelTimeInput, taskButtonsDiv, selectionFiledPriority,
  selectionFieldPace, saveTaskButton, listOfTasks, taskPriority, taskPace, cancelTaskButton, endSessionButton, clearTaskButton
} from './Variables/selectors.js';

let arrayOfTasks = [];
let arrayOfFinishedTasks = [];
let session = {};
let timenow = new Date().toISOString().slice(0, 10);
let isSessionActive = false;
let startSessionTime;
let suma;

import Timer from "./Classes/timer.js"

function startTimerFunctionality() {
  isSessionActive = true; // Flag za aktivna sesija (koga e true, da ne se aktivni addTask i removeTask)
  buttonsRemoveEvents(); //blokiranje na funkcionalnosta na addTask i removeTask kopchinjata
  document.querySelectorAll(".liOfTasks").forEach(li => li.querySelector(".stopTask").addEventListener("click", finishTask));
  startSessionTime = new Date();
  sessionCardButtonShortBreak.disabled = false;
  sessionCardButtonsLongBreak.disabled = false;
  sessionCardButtonTimer.disabled = false;

  endSessionButton.addEventListener("click", endSessionFunction);
};

// Modals functionality

const closeModalFunction = () => {
  sessionModals.classList.add("hidden");
  overlayDiv.classList.add("hidden");
  taskForm.classList.add("hidden");
  textAreaOfTask.style.display = "none";
  timerInput.value = "1";
  taskTitle.value = "";
};

const openModalFunction = () => {
  sessionModals.classList.add("hidden");
  taskForm.classList.remove("hidden");
};

//EVENT LISTENERS FOR BUTTONS
closeButton.addEventListener("click", closeModalFunction);
overlayDiv.addEventListener("click", closeModalFunction);
addTaskButton.addEventListener("click", closeModalFunction);
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

// SHORT BREAK BUTTON DRYING CODE

function shortBreakDRY() {
  taskForm.style.background = "#598f94";
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
  sessionCardButtonsLongBreak.style.color = "#444";
  sessionCardButtonTimer.style.color = "#444";
  }

shortBreakDiv.style.display = "none";

sessionCardButtonShortBreak.addEventListener("click", () => {
  shortBreakDRY();
});

// LONG BREAK BUTTON DRYING countOfDaysAccessed

function longBreakDRY() {
  taskForm.style.background = "#5079a1";
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
  taskButtonsDiv.style.background = "#2980b9";
  sessionCardButtonTimer.style.color = "white";
  sessionCardButtonShortBreak.style.backgroundColor = "transparent";
  sessionCardButtonsLongBreak.style.backgroundColor = "transparent";
  sessionCardButtonShortBreak.style.color = "#444";
  sessionCardButtonsLongBreak.style.color = "#444";
  listOfTasks.style.display = "flex";
}

// SESSION BUTTON
sessionCardButtonTimer.addEventListener("click", () => {
  sessionTimerDRY();
});

//Add task
addTaskButton.addEventListener("click", adjustClasses);

function adjustClasses() {
  taskForm.classList.remove("hidden");
  overlayDiv.classList.remove("hidden");
  addNoteButton.style.display = "flex";
};

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
  });
}

///ADD TASK FUNCTIONALITY

cancelTaskButton.addEventListener("click", function () {
  resetTaskInputs();
  taskForm.classList.add("hidden");
  overlayDiv.classList.add("hidden");
});

endSessionButton.style.display = "none";

function endSessionFunction() {
  let confirmEnd;
  confirmEnd = confirm("End the session: Have you marked the tasks you have finished as 'Finished'? If yes, press okay.");
  if (confirmEnd) {
      
    if (arrayOfTasks.length > 0) {

      fillSession(session);
      arrayOfTasks = [];
      arrayOfTruths = [];
      new Timer(timerElement, 0, startTimerFunctionality);
      new Timer(shortBreakDiv, 0);
      new Timer(longBreakDiv, 0);
      
      let div = document.createElement("div");
        div.setAttribute("class", "hide");
        document.querySelector("#sessionMain").appendChild(div);
      
      document.querySelectorAll(".liOfTasks").forEach((item) => item.remove());
      if (document.querySelector(".message")) {
        document.querySelector(".message").remove();
      }
      //saveSession();
      //window.location.reload(); // deletes the local storage data after - fixed      
    }
    isSessionActive = false; // Flag za aktivna sesija (koga e true, da ne se aktivni addTask i removeTask)
    startSessionTime = "";
    endSessionButton.disabled = true;
    timerElement.style.display = "flex";
    shortBreakDiv.style.display = "none";
    longBreakDiv.style.display = "none";
    disableAndReset();
    buttonsAddEvents();
    //vrakjanje na funkcionalnosta na addTask i removeTask kopchinjata
  }
}

//Fill the session with date and the tasks
const fillSession = (object) => {
  object.startTime = startSessionTime;
  object.finishTime = new Date();
  object.sessionTasks = [...arrayOfTasks];
  object.sessionLength = diffBetweenTimes(object.startTime, object.finishTime);
  console.log(object);
};

const diffBetweenTimes = (date1, date2) => {
  return Math.abs(date2 - date1) / 1000;
}

const clearAll = () => {
  arrayOfTasks = [];
  resetTaskInputs();
};

let clearHelper = clearTaskButton.addEventListener("click", clearTasks);

document.querySelectorAll(".values").forEach((item) => {
  item.addEventListener("click", function (e) {
    endSessionButton.style.display = "flex";
    // Time Stamp must be inside of event listener so it will print a new time every time it has been called, if its outside it will be fired only once.

    if (document.querySelectorAll(".orderedListOfTasks li").length < 5) //zamena za (arrayOfTasks < 5)
    {
      let idOfTask = createTask();

      sessionButtonsDiv.addEventListener("click", (e) => {
        if (e.target == sessionCardButtonShortBreak || e.target == sessionCardButtonsLongBreak) {
          saveTimer(timerElement);
        }
        if (e.target == sessionCardButtonTimer) {
          saveTimer(shortBreakDiv);
          saveTimer(longBreakDiv);
        }
        if (e.target == sessionCardButtonShortBreak) {
          saveTimer(longBreakDiv);
        }
        if (e.target == sessionCardButtonsLongBreak) {
          saveTimer(shortBreakDiv);
        }

      })

      new Timer(shortBreakDiv, shortBreakDurationInput.value * 60);
      new Timer(longBreakDiv, longBreakDurationInput.value * 60);

      if (e.target === saveTaskButton) {
        resetTaskInputs();
        closeModalFunction();
        sessionCardButtonShortBreak.disabled = false;
        sessionCardButtonsLongBreak.disabled = false;
        sessionCardButtonTimer.disabled = false;
        //Update the Timer based on total sum of tasks' assigned durations
        let updateTimer = arrayOfTasks
          .reduce((sum, current) => sum + current.time[0], 0);
        new Timer(timerElement, updateTimer, startTimerFunctionality);
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

// ============================ CLEAR TASKS BUTTON
function resetTaskDurationValue() {
  taskDuration.value = 0;
  suma = 0;
}

function clearTasks() {
  let confirmAction;
  if (!listOfTasks.innerHTML.trim() == "") {
    confirmAction = confirm("Are you sure you want to clear the tasks list?");
    if (confirmAction) {
      
      listOfTasks.innerHTML = "";
      new Timer(timerElement, resetTaskDurationValue(), startTimerFunctionality);
      new Timer(shortBreakDiv, 0);
      new Timer(longBreakDiv, 0);
      arrayOfTasks = [];
      arrayOfFinishedTasks = [];
      
      shortBreakDiv.style.display = "flex";
      let div = document.createElement("div");
        div.setAttribute("class", "hide");
        document.querySelector("#sessionMain").appendChild(div);

      disableAndReset();
      console.log("List successfully deleted");
      console.log(arrayOfTasks);

    }
  } else console.log("The list is empty");
}

function disableAndReset() {
    sessionCardButtonShortBreak.disabled = true;
    sessionCardButtonsLongBreak.disabled = true;
    sessionCardButtonTimer.disabled = true;
    sessionCardButtonShortBreak.style.backgroundColor = "transparent";
    sessionCardButtonTimer.style.backgroundColor = "transparent";
    sessionCardButtonsLongBreak.style.backgroundColor = "transparent";
    sessionCardButtonShortBreak.style.color = "#444";
    sessionCardButtonsLongBreak.style.color = "#444";
    sessionCardButtonTimer.style.color = "#444";
}

//funkcija za trganje eventListeneri od addTask i removeTask kopchinjata koga kje se pochne sesijata i se povikuva vo samata klasa na tajmerot
function buttonsRemoveEvents() {
  addTaskButton.removeEventListener("click", adjustClasses);
  //addTaskButton.removeEventListener("click", closeModalFunction);
  addTaskButton.removeEventListener("click", openModalFunction);
  clearTaskButton.removeEventListener("click", clearTasks);

  let removeButtons = document.querySelectorAll(".removeTaskButton");
  for (let i = 0; i < removeButtons.length; i++) {
    removeButtons[i].removeEventListener("click", removeTaskFunctionality);
  }
}

function buttonsAddEvents() {
  addTaskButton.addEventListener("click", adjustClasses);
  addTaskButton.addEventListener("click", openModalFunction);
  clearTaskButton.addEventListener("click", clearTasks);
}
//funkcijava originalno beshe vo kolbasata od kod, kako anonimna vo eventListenerot na removeTaskButton. Ja izvadiv nadvor
//za da mozham da ja povikam vo funkcijata buttonsFunctionality(nad ovaa odma)
function removeTaskFunctionality() {
  let confirmAction;
  confirmAction = confirm("Are you sure you want to remove this task?");
  if (confirmAction) {

    for (let i = 0; i < arrayOfTasks.length; i++) {
      if (arrayOfTasks[i].id == this.parentElement.querySelector(".idOfCard").innerText) {
        // i.finished = "false";
        arrayOfTasks.splice(i, 1);
        arrayOfFinishedTasks.splice(i, 1);
      }
      if(arrayOfTasks.length == 0) {
        disableAndReset();
        let div = document.createElement("div");
        div.setAttribute("class", "hide");
        document.querySelector("#sessionMain").appendChild(div);
      } 
    }
   
    this.parentElement.remove();

    let updateTimer = arrayOfTasks
      .reduce((sum, current) => sum + current.time[0], 0);
    new Timer(timerElement, updateTimer, startTimerFunctionality);

    if (arrayOfFinishedTasks.length === arrayOfTasks.length) {
      
      new Timer(timerElement, 0, startTimerFunctionality);
    } else {
      const timer18 = new Timer(timerElement, updateTimer, startTimerFunctionality);
    }
  }
}

function timeStamp() {
  const now = new Date();
  const timeStamp = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(now);
};

function createId() {
  return Date.now();
}

function createElementFunction(name, dis, attr, attrName, inner, where, type) {
  name = document.createElement(type);
  name.style.display = dis;
  name.setAttribute(attr, attrName) //option 1
  where.appendChild(name);
  name.innerText = inner;
  let returnVar = name;
  return returnVar;
}

function createTask() {
  timeStamp();
  endSessionButton.disabled = false;
  if(document.querySelector(".hide")) {
    document.querySelector(".hide").remove();
  }
  shortBreakDiv.style.display = "none";
  
  if (
    taskTitle.value &&
    taskDuration.value &&
    taskPriority.options[taskPriority.selectedIndex].value &&
    taskPace.options[taskPace.selectedIndex].value
  ) {
    
    let number = createId();

    let li = document.createElement("li");
    li.setAttribute("class", "liOfTasks"); // option 3
    //li innerHTML - take out in separate function
    li.innerHTML += `<b>Title</b>: ${taskTitle.value
      } <br><b>Duration</b>: ${taskDuration.value
      } min <br> <b>Priority</b>: ${taskPriority.options[taskPriority.selectedIndex].value
      }<br> <b>Pace</b>: ${taskPace.options[taskPace.selectedIndex].value
      } <br> <div id="timeStampValue" style="display: none">${timeStamp}</div>`;

    let activeCardMarker = document.createElement("div");
    activeCardMarker.setAttribute("class", "card_timer_container"); //option 2
    li.appendChild(activeCardMarker);

    //set FLAG to the <li> - CHECK THE LOGIC FOR THE FLAG AND ADJUST IF NEEDED
    let flagParagraph = createElementFunction("flagParagraph", "none", "contentEditable", "false", '', li, "p");
    flagParagraph.setAttribute("class", "flag_paragraph");
    createElementFunction("paragraphId", "none", "class", "idOfCard", number, li, "p");

    //FINISH TASK BUTTON NEW LOGIC (12.09.2022)
    let finishedTaskButton = createElementFunction("finishedTaskButton", "flex", "class", "stopTask", "Finish task", li, "button");

    //finishedTaskButton.addEventListener("click", finishTask);

    if (!textAreaOfTask.value == "") {

      let noteContainer = createElementFunction("noteHolderDiv", "none", "class", "showNoteDiv", textAreaOfTask.value, li, "div");
      let showNote = createElementFunction("showNoteButton", "flex", "class", "showNoteButton", "Show note", li, "button");

      showNote.addEventListener("click", function () {
        noteContainer.style.display = "flex";
        let hideNoteBtn = createElementFunction("hideNoteButton", "flex", "class", "hideNoteButton", "Hide note", noteContainer, "button");

        hideNoteBtn.addEventListener("click", function () {
          noteContainer.style.display = "none";
        });
      });

      // If div note is active change inherit color from active UI - SEt them in functions outside
      styleBackgroundColor(sessionCardButtonsLongBreak, noteContainer, "#5079a1");
      styleBackgroundColor(sessionCardButtonShortBreak, noteContainer, "#598f94");
      
      styleBackgroundColor(sessionCardButtonTimer, noteContainer, "#2980b9");
    }
    let removeTaskButton = createElementFunction("removeTaskButton", "flex", "class", "removeTaskButton", "x", li, "button");

    listOfTasks.appendChild(li);

    removeTaskButton.addEventListener("click", removeTaskFunctionality);

    //da se izvadi nadvor vo funkcija ama prvo da se proveri funkcionalnosta??
    listOfTasks.addEventListener("click", (e) => {
      const click = e.target.closest(".liOfTasks");
      if (!click) return;

      li.classList.remove("active");
      if (!click.classList.contains("active")) {
        activeCardMarker.classList.add("hidden");
      }
      click.classList.add("active");
      let getNewDiv = click.getElementsByClassName("hidden");
      activeCardMarker.classList.remove("hidden");
    })

    setColor(li);
    getPriority(li);
    //Take the object creation out in function
    let test = {
      title: taskTitle.value,
      assignedTaskDuration: taskDuration.value,
      timeNow: timeStamp,
      time: [],
      id: number,
      finished: flagParagraph.contentEditable,
      priority: taskPriority.value,
      pace: taskPace.value
    };

    arrayOfTasks.push(test);
    test.time.push(parseInt(taskDuration.value * 60));

    suma = arrayOfTasks
      .flatMap((parameter) => parameter.time)
      .reduce((sum, current) => sum + current, 0);
  }
}

function styleBackgroundColor(onWhat, where, value) {
  onWhat.addEventListener("click", () => {
    where.style.backgroundColor = value;
  });
}

let arrayOfTruths = [];

function finishTask() {
  this.parentElement.querySelector(".flag_paragraph").contentEditable = true;
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == this.parentElement.querySelector(".idOfCard").innerText) {
      arrayOfTasks[i].finished = "true";
      arrayOfTruths.push(arrayOfTasks[i]);
    }
    if (arrayOfTasks.length == arrayOfTruths.length) {
      saveTimer(timerElement);
      disableAndReset();
      
      shortBreakDiv.style.display = "none";
      longBreakDiv.style.display = "none";
      timerElement.style.display = "flex";
      
      let message = document.createElement("div");
      message.setAttribute("class", "message");
      document.querySelector("#sessionMain").appendChild(message);
      let h1 = document.createElement("h1");
      let h1_duration = document.createElement("h1");
      h1_duration.innerText = `Session duration: ${suma / 60} minutes`;
    
      if (document.querySelector(".timer__part--minutes").innerText == "00" && document.querySelector(".timer__part--seconds").innerText == "00") {
        h1.innerText = "Not all tasks were completed on time";
      } else {
        h1.innerText = "Well done, All tasks finished on time";
      }
      message.appendChild(h1);
      message.appendChild(h1_duration);
    }
  }

  this.parentElement.style.opacity = "0.6";
  let marker = document.createElement("div");
  // marker.style.display = "flex";
  marker.setAttribute("class", "MarkerContainer") //option 1
  this.parentElement.appendChild(marker);
  marker.innerHTML += `
  <svg xmlns="http://www.w3.org/2000/svg" class="svg-success" viewBox="0 0 24 24">
    <g stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10">
      <circle class="success-circle-outline" cx="12" cy="12" r="11.5"/>
      <circle class="success-circle-fill" cx="12" cy="12" r="11.5"/>
      <polyline class="success-tick" points="17,8.5 9.5,15.5 7,13"/>
    </g>
  </svg>
  `;
  this.parentElement.querySelector(".stopTask").style.display = "none";
  this.parentElement.querySelector(".removeTaskButton").style.display = "none";
  if(this.parentElement.querySelector(".showNoteButton")) {
    this.parentElement.querySelector(".showNoteButton").style.display = "none";
  }
}

function saveTimer(element) {
  let secondsArray = element.innerText.split('');
  let arrayOfNumbers = [];
  let sumOfTimer;
  for (let i = 0; i < secondsArray.length; i++) {
    let parsedCharacter = parseInt(secondsArray[i]);
    if (typeof parsedCharacter == "number" && isNaN(parsedCharacter) == false) {
      arrayOfNumbers.push(parsedCharacter);
    }
  }
  sumOfTimer = arrayOfNumbers[0] * 60 * 10 + arrayOfNumbers[1] * 60 + arrayOfNumbers[2] * 10 + arrayOfNumbers[3];
  new Timer(element, sumOfTimer, startTimerFunctionality);
  console.log("gg");
  }
