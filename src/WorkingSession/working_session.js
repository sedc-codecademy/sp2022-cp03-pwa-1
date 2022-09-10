//const sessionMain = document.getElementById("sessionMain");
let isSessionActive = false;
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
const sessionCardButtonTimer = document.querySelector(".sessionButtonTimer");
const body = document.querySelector("body");
const settingsButton = document.querySelector("#sessionSettings");
const settingsDiv = document.querySelector(".settingsDiv");
const timerElement = document.querySelector("#timerDiv");
const sessionButtonsDiv = document.querySelector("#sessionCardButtonsDiv"); 
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
const confirmSessionDurationButton = document.querySelector("#startingTimerValueButton");
const shortBreakDurationInput = document.querySelector("#startingShortBreakValueInput");
const longBreakDurationInput = document.querySelector("#startingLongBreakValueInput"); 
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
        isSessionActive = true; // Flag za aktivna sesija (koga e true, da ne se aktivni addTask i removeTask)
        buttonsFunctionality(); //blokiranje na funkcionalnosta na addTask i removeTask kopchinjata
        settingsButton.style.display = "none";
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
 
    const inputSeconds = String(timer);
 
    if (inputSeconds < 100000) {
      this.stop();
      this.remainingSeconds = inputSeconds;
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
    if (this.remainingSeconds == 0) return;//so 3 ednakvi e bag
    
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
                    <span>⇌</span>
                  </button>
 
            `;
  }
}

let initialTaskTime;

// time value of when task was stopped 
let taskTimeLeftWhenStopped;

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
};

// Exit from dev of timers set 
cancelTimeInput.addEventListener("click", function () {
  settingsDiv.classList.add("hidden");
  closeModalFunction();
});

// FOR LONG BREAK SESSION
confirmSessionDurationButton.addEventListener("click", () => {
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
  listOfTasks.style.display = "flex";
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
  listOfTasks.style.display = "flex";
}

// SESSION BUTTON
sessionCardButtonTimer.addEventListener("click", () => {
  sessionTimerDRY();
});

settingsButton.addEventListener("click", () => {
  settingsDiv.classList.remove("hidden");
  overlayDiv.classList.remove("hidden");
  sessionModals.classList.add("hidden");
});

//Add task
addTaskButton.addEventListener("click", adjustClasses);

function adjustClasses(){
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
    // addNoteButton.style.display = "none";
  });
}

///ADD TASK FUNCTIONALITY

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

let arrayOfTasks = [];
let suma;
let arrayOfFinishedTasks = [];

const endSessionButton = document.querySelector("#endSessionButton");
let session = {};

endSessionButton.style.display = "none";

endSessionButton.addEventListener("click", () => {
  let confirmEnd;
  confirmEnd = confirm("Are you sure you want to finish this session?");
  if (confirmEnd) {
    if (arrayOfTasks.length > 0) {
      fillSession(session);
      //saveSession();
      window.location.reload(); // deletes the local storage data after - fixed
    }
  }
});

//Fill the session with date and the tasks
const fillSession = (object) => {
  object.sessionDate = new Date().toISOString().slice(0, 10);
  object.sessionTasks = [...arrayOfTasks];
};

const clearAll = () => {
  arrayOfTasks = [];
  resetTaskInputs();
};

let counterForCard = 0;
let anotherCounterForCard = 0;

let timenow = new Date().toISOString().slice(0, 10);
console.log(timenow);

document.querySelectorAll(".values").forEach((item) => {
  item.addEventListener("click", function (e) {
    favDialog.style.background = "#2980b9";
    endSessionButton.style.display = "flex";
    // Time Stamp must be inside of event listener so it will print a new time every time it has been called, if its outside it will be fired only once.
    
    if (document.querySelectorAll(".orderedListOfTasks li").length < 5) //zamena za (arrayOfTasks < 5)
    {
       let idOfTask = createTask();

      sessionButtonsDiv.addEventListener("click", (e) => {
        if (e.target == sessionCardButtonShortBreak || e.target == sessionCardButtonsLongBreak) {

          let secondsArray2 = timerElement.innerText.split('');
          let arrayOfNumbers2 = [];

          for (let i = 0; i < secondsArray2.length; i++) {
            let parsedCharacter = parseInt(secondsArray2[i]);
            if (typeof parsedCharacter == "number" && isNaN(parsedCharacter) == false) {
              arrayOfNumbers2.push(parsedCharacter);
            }
          }
          let suma203 = arrayOfNumbers2[0] * 60 * 10 + arrayOfNumbers2[1] * 60 + arrayOfNumbers2[2] * 10 + arrayOfNumbers2[3];
          console.log(arrayOfNumbers2);
          console.log(suma203);
          new Timer(timerElement, suma203); 
        }
      })

      new Timer(shortBreakDiv, shortBreakDurationInput.value * 60);

      new Timer(longBreakDiv, longBreakDurationInput.value * 60);

      if (e.target === saveTaskButton) {
        resetTaskInputs();
        closeModalFunction();
        //Update the Timer based on total sum of tasks' assigned durations
        let updateTimer = arrayOfTasks
          //.flatMap((parameter) => parameter.time)
          .reduce((sum, current) => sum + current.time[0], 0);
        new Timer(timerElement, updateTimer);
      }
    }else alert("You can't have more than 5 tasks at a time!");
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
const clearTaskButton = document.querySelector("#clearTasksBtn");

let clearHelper = clearTaskButton.addEventListener("click", clearTasks);

function clearTasks() {
  let confirmAction;
  if (!listOfTasks.innerHTML.trim() == "") {
    confirmAction = confirm("Are you sure you want to clear the tasks list?");
    if (confirmAction) {
      listOfTasks.innerHTML = "";
      new Timer(timerElement, resetTaskDurationValue());
      arrayOfTasks = [];
      arrayOfFinishedTasks = [];
      console.log("List successfully deleted");
      console.log(arrayOfTasks);
    }
  } else console.log("The list is already empty.");
}

console.log(listOfTasks.children.length);
if (!listOfTasks.children.length) {
  sessionCardButtonSetting.style.display = "none";
}

//funkcija za trganje eventListeneri od addTask i removeTask kopchinjata koga kje se pochne sesijata i se povikuva vo samata klasa na tajmerot
function buttonsFunctionality(){
  addTaskButton.removeEventListener("click", adjustClasses);
  addTaskButton.removeEventListener("click", closeModalFunction);
  clearTaskButton.removeEventListener("click", clearTasks);

  let removeButtons = document.querySelectorAll(".removeTaskButton");
  for (let i = 0; i < removeButtons.length; i++){
  removeButtons[i].removeEventListener("click", removeTaskFunctionality);
  }
}
//funkcijava originalno beshe vo kolbasata od kod, kako anonimna vo eventListenerot na removeTaskButton. Ja izvadiv nadvor
//za da mozham da ja povikam vo funkcijata buttonsFunctionality(nad ovaa odma)
function removeTaskFunctionality() {
  let suma3;
  let confirmAction;
  confirmAction = confirm("Are you sure you want to remove this task?");
  if (confirmAction) {

    for (let i = 0; i < arrayOfTasks.length; i++) {
      if (arrayOfTasks[i].id == this.parentElement.querySelector(".idOfCard").innerText) {
        i.finished = "false";
        arrayOfTasks.splice(i, 1);
        arrayOfFinishedTasks.splice(i, 1);
      }
    }
    
    this.parentElement.remove();

    let updateTimer = arrayOfTasks
          .reduce((sum, current) => sum + current.time[0], 0);
        new Timer(timerElement, updateTimer);

    if (arrayOfFinishedTasks.length === arrayOfTasks.length) {
      sessionCardButtonSetting.style.display = "none";
    } 

    if (arrayOfFinishedTasks.length === arrayOfTasks.length) {
      new Timer(timerElement, 0);
    } else {
      const timer18 = new Timer(timerElement, suma3);
    } 
  }
}

function timeStamp(){
  const now = new Date();
  const timeStamp = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(now);
};

function createId(){
  return Math.floor(Math.random() * 10000);
}

function createTask(){
  timeStamp();
  if (
    taskTitle.value &&
    taskDuration.value &&
    taskPriority.options[taskPriority.selectedIndex].value &&
    taskPace.options[taskPace.selectedIndex].value
  ) {
    settingsButton.style.display = "flex";
    let number = createId();

    let li = document.createElement("li");
    li.setAttribute("class", "liOfTasks");
    //li innerHTML - take out in separate function
    li.innerHTML += `<b>Title</b>: ${taskTitle.value
      } <br><b>Duration</b>: ${taskDuration.value
      } min <br> <b>Priority</b>: ${taskPriority.options[taskPriority.selectedIndex].value
      }<br> <b>Pace</b>: ${taskPace.options[taskPace.selectedIndex].value
      } <br> <div id="timeStampValue" style="display: none">${timeStamp}</div>`;

    let activeCardMarker = document.createElement("div");
    activeCardMarker.setAttribute("class", "card_timer_container");
    li.appendChild(activeCardMarker);

    //set FLAG to the <li> - CHECK THE LOGIC FOR THE FLAG AND ADJUST IF NEEDED
    let flagParagraph = document.createElement("p");
    flagParagraph.style.display = "none";
    flagParagraph.setAttribute("contenteditable", "false")
    li.appendChild(flagParagraph);

    let paragraphId = document.createElement("p");
    paragraphId.setAttribute("class", "idOfCard");
    paragraphId.innerText = `${number}`;
    paragraphId.style.display = "none";
    li.appendChild(paragraphId);

    if (!textAreaOfTask.value == "") {
      let noteHolderDiv = document.createElement("div");
      li.appendChild(noteHolderDiv);

      noteHolderDiv.setAttribute("class", "showNoteDiv");
      noteHolderDiv.style.display = "none";
      noteHolderDiv.innerText = `${textAreaOfTask.value}`;
      let showNoteButton = document.createElement("button");
      showNoteButton.setAttribute("class", "showNoteButton");
      showNoteButton.innerText = "Show note";

      li.appendChild(showNoteButton);
      showNoteButton.addEventListener("click", function () {
        noteHolderDiv.style.display = "flex";

        let hideNoteButton = document.createElement("button");
        hideNoteButton.setAttribute("class", "hideNoteButton");
        hideNoteButton.innerText = "Hide note";
        noteHolderDiv.appendChild(hideNoteButton);

        hideNoteButton.addEventListener("click", function () {
          noteHolderDiv.style.display = "none";
        });
      });

      // If div note is active change inherit color from active UI - SEt them in functions outside
      sessionCardButtonsLongBreak.addEventListener("click", () => {
        noteHolderDiv.style.backgroundColor = "#5079a1";
      });
      sessionCardButtonShortBreak.addEventListener("click", () => {
        noteHolderDiv.style.backgroundColor = "#598f94";
      });
      sessionCardButtonSetting.addEventListener("click", () => {
        noteHolderDiv.style.backgroundColor = "#2980b9";
      });
      sessionCardButtonTimer.addEventListener("click", () => {
        noteHolderDiv.style.backgroundColor = "#2980b9";
      });
    }

    //let suma3;
    let removeTaskButton = document.createElement("button");
    removeTaskButton.setAttribute("class", "removeTaskButton");
    removeTaskButton.innerText = "x";
    li.appendChild(removeTaskButton);

    listOfTasks.appendChild(li);

    //var idToDelete = removeTaskFunctionality(paragraphId);
    //Cel event listener da se izvadi nadvor i da se povikuva so parametri - DONE
    // if(removeTaskButton.addEventListener("click", function(){
    //   return removeTaskFunctionality();
    // }));
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
      let getNewDiv = click.getElementsByClassName("hidden"); // Wass is dass??
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
      finished: flagParagraph.contentEditable
    };

    arrayOfTasks.push(test);

    test.time.push(parseInt(taskDuration.value * 60));

    suma = arrayOfTasks
      .flatMap((parameter) => parameter.time)
      .reduce((sum, current) => sum + current, 0);
  }  
}

