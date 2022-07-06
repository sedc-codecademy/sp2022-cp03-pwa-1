// AS -> Activity Summary

const ACTIVITY_DETAILS_KEY = 'activityDetails';
const SESSIONS_KEY = 'sessions';
let dynamicAccessedDaysParagraph = document.getElementById("dynamicAccessedDays");
let dynamicStreakDaysParagraph = document.getElementById("dynamicStreakDays");
let sessionCardButtonLongBreak1 = document.getElementById("longBreak");
let sessionCardButtonShortBreak1 = document.getElementById("shortBreak");
let activityCards = document.getElementsByClassName("activityCard");
let chartBox = document.getElementsByClassName("chartBox");
let sessionButton = document.getElementById("timer");
let sessionSettingsButton = document.getElementById("sessionSettings");
document.addEventListener('load', updateAccessedDays());
const AS_favDialog = document.getElementById("favDialog");


function updateAccessedDays() {
    let activityDetails = getObjectFromLocalStorage(ACTIVITY_DETAILS_KEY);
    const currentAccessedDate = new Date().toISOString().slice(0, 10);
    if (!activityDetails?.hasValues) {
        createDefaultActivityDetails();
        activityDetails = getObjectFromLocalStorage(ACTIVITY_DETAILS_KEY);
    }

    if (activityDetails.hasValues == false) {

        activityDetails.previousDate = currentAccessedDate;
        activityDetails.countOfDaysAccessed = 1;
        activityDetails.countOfDaysStreak = 1;
        activityDetails.hasValues = true;

    } else if (currentAccessedDate > activityDetails.previousDate) {
        const previousDateToCompare = new Date(activityDetails.previousDate);
        previousDateToCompare.setDate(previousDateToCompare.getDate() + 1);
        const formatedPreviousDateToCompare = previousDateToCompare.toISOString().slice(0, 10);
        console.log(formatedPreviousDateToCompare);

        console.log(`currentAccessedDate == formatedPreviousDateToCompare`, currentAccessedDate == formatedPreviousDateToCompare);
        if (currentAccessedDate == formatedPreviousDateToCompare) {
            console.log(`streakDaysValidation(activityDetails.previousDate)`, streakDaysValidation(activityDetails.previousDate));
            if (streakDaysValidation(activityDetails.previousDate)) {
                activityDetails.countOfDaysStreak++;
            }
        }
        else {
            activityDetails.countOfDaysStreak = 1;
        }

        activityDetails.previousDate = currentAccessedDate;
        activityDetails.countOfDaysAccessed++;

    }
    console.log(activityDetails.countOfDaysStreak)
    saveObjectToLocalStorage(ACTIVITY_DETAILS_KEY, activityDetails);
    dynamicAccessedDaysParagraph.innerHTML = activityDetails.countOfDaysAccessed;
    dynamicStreakDaysParagraph.innerHTML = activityDetails.countOfDaysStreak;
};

function createDefaultActivityDetails() {
    const activityDetails = {
        'previousDate': new Date().toISOString().slice(0, 10),
        'countOfDaysAccessed': null,
        'countOfDaysStreak': null,
        'hasValues': false
    };

    saveObjectToLocalStorage(ACTIVITY_DETAILS_KEY, activityDetails);
}

function getObjectFromLocalStorage(key) {
    const json = localStorage.getItem(key);
    const object = JSON.parse(json);

    return object;
}

function saveObjectToLocalStorage(key, someObject) {
    localStorage.setItem(key, JSON.stringify(someObject));
}

function streakDaysValidation(previousDate) {
    const sessions = getObjectFromLocalStorage(SESSIONS_KEY);
    for (const session of sessions) {
        console.log(`Session Object : `, session);

        if (session.sessionDate === previousDate) {
            console.log("I am true! session.sessionDate = previousDate");

            for (const sessionTask of session.sessionTasks) {
                console.log(`Session Task:`, sessionTask)

                if (sessionTask.time.length > 0) {
                    return true;
                }
            }
        }
    }
}

// ======================= change colors =======================


function changeColor(backgroundColor, borderColor, backgroundImage) {
    data.datasets[0].backgroundColor = [backgroundColor];
    data.datasets[0].borderColor = [borderColor];
    chartBox[0].style.borderColor = borderColor;
    myChart.update();
    for (const card of activityCards) {
        card.style.backgroundImage = backgroundImage;
        card.style.borderColor = borderColor;
    }
}

sessionCardButtonShortBreak1.addEventListener("click",
    () => {
        changeColor(
            "rgba(89,143,148,0.6)",
            "rgba(68,144,173,1)",
            "linear-gradient(120deg, rgba(89,143,148,1) 42%, rgba(68,144,173,1) 100%)"
        )
    }
);

sessionCardButtonLongBreak1.addEventListener("click",
    () => {
        changeColor(
            "rgba(80,121,161,0.6)",
            "rgba(68,151,173,1)",
            "linear-gradient(120deg, rgba(80,121,161,1) 42%, rgba(68,151,173,1) 100%)"
        )
    });

function resetColors() {
    changeColor(
        "rgba(41, 128, 185, 0.6)",
        "rgba(69, 68, 173, 1)",
        "linear-gradient(120deg, rgba(41, 128, 185, 1) 49%, rgba(69, 68, 173, 1) 98%)"
    );
}

AS_favDialog.addEventListener("close", function onClose() {
    console.info(`Clicked...`);
    switch (AS_favDialog.returnValue) {
        case "Short Break":
            changeColor(
                "rgba(89,143,148,0.6)",
                "rgba(68,144,173,1)",
                "linear-gradient(120deg, rgba(89,143,148,1) 42%, rgba(68,144,173,1) 100%)"
            )
            break;
        case "Long Break":
            changeColor(
                "rgba(80,121,161,0.6)",
                "rgba(68,151,173,1)",
                "linear-gradient(120deg, rgba(80,121,161,1) 42%, rgba(68,151,173,1) 100%)"
            )
            break;
        case "Session":
            changeColor(
                "rgba(41, 128, 185, 0.6)",
                "rgba(69, 68, 173, 1)",
                "linear-gradient(120deg, rgba(41, 128, 185, 1) 49%, rgba(69, 68, 173, 1) 98%)"
            );
            break;
        default:
            break;
    }
});

sessionButton.addEventListener("click", resetColors);
sessionSettingsButton.addEventListener("click", resetColors);
document.addEventListener('load', resetColors);


