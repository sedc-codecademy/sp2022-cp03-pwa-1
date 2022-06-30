// let myChart = document.getElementById('dynamicChart').getContext('2d');

//     // Global Options
//     Chart.defaults.global.defaultFontFamily = '"Barlow", sans-serif';
//     Chart.defaults.global.defaultFontSize = 16;
//     Chart.defaults.global.defaultFontColor = '#777';

//     let massPopChart = new Chart(myChart, {
//       type:'horizontalBar', // other possible forms: bar, horizontalBar, pie, line, doughnut, radar, polarArea
//       data:{
//         labels:['6-Jun', '7-Jun', '8-Jun', '9-Jun', '10-Jun', '11-Jun', '12-Jun'],
//         datasets:[{
//         //   label:'Hours per Day', //refers to label in the legend
//           data:[
//             5,
//             4,
//             6.5,
//             2,
//             1,
//             0.5,
//             3.5,
//           ],
//           backgroundColor:[
//             'rgb(191,206,226)',
//             'rgb(191,206,226)',
//             'rgb(191,206,226)',
//             'rgb(191,206,226)',
//             'rgb(191,206,226)',
//             'rgb(191,206,226)',
//             'rgb(191,206,226)'
//           ],

//           borderWidth:1,
//           borderColor:'rgb(12, 106, 143)',
//           hoverBorderWidth:3,
//           hoverBorderColor:'rgb(12, 106, 143)'
//         }]
//       },
//       options:{
//         title:{
//           display:false,// if true -> title of the chart will be displayed
//           text:'Hours per Day',
//           fontSize:16,
//         },
//         legend:{
//           display:false,//if true -> legend of the chart will be displayed
//           position:'right',
//           labels:{
//             fontColor:'#000'
//           }
//         },
//         layout:{
//           padding:{
//             left:50,
//             right:0,
//             bottom:0,
//             top:0
//           }
//         },
//         tooltips:{
//           enabled:true
//         }
//       }
//     });

let startingDate = document.getElementById("startDate");
let endingDate = document.getElementById("endDate");
startingDate.value=new Date(new Date().getTime()-60*60*24*1000*6).toISOString().slice(0, 10);
endingDate.value = new Date().toISOString().slice(0, 10);

function startingArrayOfChartDates(){
    let arrayOfDates = [];
    let currentDate = new Date().toISOString().slice(0, 10);
    for (let i = 6; i > 0; i--) {
    let daysBefore = new Date(new Date().getTime()-60*60*24*1000*i).toISOString().slice(0, 10); 
    arrayOfDates.push(daysBefore);
 }
    arrayOfDates.push(currentDate);
    return arrayOfDates;
 }

function numberOfDailyHours(){ //temporary solution
    let arrayOfHoursPerDay =[];
    for (let i=1; i<32; i++){
        let randomNumber = Math.floor(Math.random() * 16);
        arrayOfHoursPerDay.push(randomNumber)
    }
    return arrayOfHoursPerDay;
} 

const dates = startingArrayOfChartDates();
const datepoints = numberOfDailyHours();
const data = {
    labels: dates,
    datasets: [{
        label: 'Daily Activity',
        data: datepoints,
        backgroundColor: [
            'rgba(41, 128, 185, 0.6)',
        ],
        borderColor: [
            'rgba(69, 68, 173, 1)'
        ],
        borderWidth: 1
    }]
};
const config = {
    type: 'bar',
    data,
    options: {
        scales: {
            y: {
                beginAtZero: true

            }
        }
    }
};
const myChart = new Chart(
    document.getElementById('myChart'),
    config
);

let focusHours = document.getElementById("dynamicFocusHours");
// let accessDays = document.getElementById("dynamicAccessedDays");
// let streakDays = document.getElementById("dynamicStreakDays");

// let count=0;
// for (let i=0; i < 7; i++){
//     if(datepoints[i] != 0){
//     count++
//     };
//     }
// accessDays.innerHTML = count;

// let count2=0;
// let arrStreakDays = [];
// for (let i=0; i < 7; i++){ 
//     count2++;
//     if(datepoints[i] == 0){
//     count2=0;   
//         }
//         arrStreakDays.push(count2);
//     }
// streakDays.innerHTML = Math.max(...arrStreakDays);

let sum=0;
for (let i=0; i<7; i++){
    sum+=datepoints[i];
};
focusHours.innerHTML = sum;

function filterDate() {
    const dynamicDates = [];
    const startDate = document.getElementById('startDate');
    const endDate = document.getElementById('endDate');

    const newStartDate = new Date(startDate.value); // 2022-06-08
    const newEndeDate = new Date(endDate.value);

    const numberOfDates = (newEndeDate.getTime()-newStartDate.getTime())/(1000 * 3600 * 24); //4
    let dateToBeFormated = newStartDate;

    for (let i = 0; i <= numberOfDates; i++) {
        const formatedDate = `${dateToBeFormated.toISOString().slice(0, 10)}`;

        const nextDay = dateToBeFormated.getDate() + 1;
        const nextDate = new Date(formatedDate);
        nextDate.setDate(nextDay);

        dynamicDates.push(formatedDate);
        dateToBeFormated = nextDate;
    }

    myChart.config.data.labels = dynamicDates;
    if (numberOfDates > 31) {
        alert("For better visibility of your chart, we highly recommend you to choose a time period that does not exceed 31 days! Please try again!");
     }
    else{myChart.update()
    };
}

function updateSummary(){
    const startDate2 = document.getElementById('startDate');
    const endDate2 = document.getElementById('endDate');
    const newStartDate2 = new Date(startDate2.value); // 2022-06-08
    const newEndeDate2 = new Date(endDate2.value);
    const numberOfDates2 = (newEndeDate2.getTime()-newStartDate2.getTime())/(1000 * 3600 * 24);
    let sum = 0;
    // let count = 0;
    // let count2 = 0;
    // let arrStreakDays =[];

    // for (let i=0; i < numberOfDates2+1; i++){
    // if(datepoints[i] != 0){
    // count++
    // };
    // }
    // accessDays.innerHTML = count;
    // for (let i=0; i < numberOfDates2+1; i++){ 
    // count2++;
    // if(datepoints[i] == 0){
    // count2=0;   
    // }
    // arrStreakDays.push(count2);
    // }
    // streakDays.innerHTML = Math.max(...arrStreakDays);
    for (let i=0; i<=numberOfDates2; i++){
    sum+=datepoints[i];
    }
    focusHours.innerHTML = sum;
    if (numberOfDates2 > 31) {
        focusHours.innerHTML=null;
        // streakDays.innerHTML=null;
        // accessDays.innerHTML=null;
    };
};

document.getElementById("startDate").addEventListener("change", updateSummary);
document.getElementById("endDate").addEventListener("change", updateSummary);



