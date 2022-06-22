const ACTIVITY_DETAILS_KEY = 'activityDetails';
let dynamicAccessedDaysParagraph = document.getElementById("dynamicAccessedDays");
let dynamicStreakDaysParagraph = document.getElementById("dynamicStreakDays");
document.addEventListener('load', updateAccessedDays());


function updateAccessedDays() {
    let activityDetails = getObjectFromLocalStorage(ACTIVITY_DETAILS_KEY);
    const currentAccessedDate = new Date().toISOString().slice(0, 10);
    if (!activityDetails?.hasValues) {
        createDefaultActivityDetails();
        activityDetails = getObjectFromLocalStorage(ACTIVITY_DETAILS_KEY);
    }

    if (activityDetails.hasValues == false ) {

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
