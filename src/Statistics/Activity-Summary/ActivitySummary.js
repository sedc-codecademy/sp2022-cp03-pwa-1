const ACTIVITY_DETAILS_KEY = 'activityDetails';
let dynamicAccessedDaysParagraph = document.getElementById("dynamicAccessedDays");
let dynamicStreakDaysParagraph = document.getElementById("dynamicStreakDays");
let sessionCardButtonLongBreak1 = document.getElementById("longBreak");
let sessionCardButtonShortBreak1 = document.getElementById("shortBreak");
let activityCards = document.getElementsByClassName("activityCard");
let chartBox = document.getElementsByClassName("chartBox");
let sessionButton = document.getElementById("timer");
let sessionSettingsButton = document.getElementById("sessionSettings");
document.addEventListener('load', updateAccessedDays());


function updateAccessedDays() {
    let activityDetails = getObjectFromLocalStorage(ACTIVITY_DETAILS_KEY);
    const currentAccessedDate = new Date().toISOString().slice(0, 10);
    if (!activityDetails?.hasValues) {
        createDefaultActivityDetails();
        activityDetails = getObjectFromLocalStorage(ACTIVITY_DETAILS_KEY);
    }

    if (activityDetails.hasValues == false) {

        activityDetails.previuosDate = currentAccessedDate;
        activityDetails.countOfDaysAccessed = 1;
        activityDetails.countOfDaysStreak = 1;
        activityDetails.hasValues = true;

    } else if (currentAccessedDate > activityDetails.previuosDate) {
        const previousDateToCompare = new Date(activityDetails.previuosDate)
        previousDateToCompare.setDate(previousDateToCompare.getDate() + 1);
        const formatedPreviousDateToCompare = previousDateToCompare.toISOString().slice(0, 10);
        console.log(formatedPreviousDateToCompare);

        if (currentAccessedDate == formatedPreviousDateToCompare) {
            activityDetails.countOfDaysStreak++;
        }
        activityDetails.previuosDate = currentAccessedDate;
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
console.log(chartBox[0]);
console.log(sessionCardButtonLongBreak1);

sessionCardButtonLongBreak1.addEventListener("click", function () {
    data.datasets[0].backgroundColor = ["rgba(108, 146, 172,0.6)"];
    data.datasets[0].borderColor = ["rgba(108, 146, 172, 1)"]; 
    chartBox[0].style.borderColor = "rgba(108, 146, 172, 1)";
    myChart.update();

    for (const card of activityCards) {
        card.style.backgroundImage = "linear-gradient(27deg, rgba(212,218,222,1) 4%, rgba(142,165,182,1) 24%, rgba(83,120,149,1) 59%)";
        card.style.borderColor = "#537895";
    };  
});

sessionCardButtonShortBreak1.addEventListener("click", function () {
    data.datasets[0].backgroundColor = ["rgba(89, 143, 148,0.6)"];
    data.datasets[0].borderColor = ["rgba(89, 143, 148,1)"]; 
    chartBox[0].style.borderColor = "rgba(89, 143, 148, 1)";
    myChart.update();
    for (const card of activityCards) {
        card.style.backgroundImage = "linear-gradient(27deg, rgba(189,214,217,1) 7%, rgba(101,152,156,1) 40%, rgba(89,143,148,1) 55%)";
        card.style.borderColor = "rgba(89, 143, 148, 1)";
    };  
});

function resetColors(){
    data.datasets[0].backgroundColor = ["rgba(193,202,240,0.6)"];
    data.datasets[0].borderColor = ["rgba(165,178,233,1)"]; 
    chartBox[0].style.borderColor = "rgba(165,178,233,1)";
    myChart.update();
    for (const card of activityCards) {
        card.style.backgroundImage = "linear-gradient(50deg, rgba(193,202,240,1) 16%, rgba(165,178,233,1) 60%)";
        card.style.borderColor = "rgba(165,178,233,1)";
    };  
}

sessionButton.addEventListener("click", resetColors);
sessionSettingsButton.addEventListener("click",resetColors);

