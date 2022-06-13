let myChart = document.getElementById('dynamicChart').getContext('2d');

    // Global Options
    Chart.defaults.global.defaultFontFamily = '"Barlow", sans-serif';
    Chart.defaults.global.defaultFontSize = 16;
    Chart.defaults.global.defaultFontColor = '#777';

    let massPopChart = new Chart(myChart, {
      type:'horizontalBar', // other possible forms: bar, horizontalBar, pie, line, doughnut, radar, polarArea
      data:{
        labels:['6-Jun', '7-Jun', '8-Jun', '9-Jun', '10-Jun', '11-Jun', '12-Jun'],
        datasets:[{
        //   label:'Hours per Day', //refers to label in the legend
          data:[
            5,
            4,
            6.5,
            2,
            1,
            0.5,
            3.5,
          ],
          backgroundColor:[
            'rgb(191,206,226)',
            'rgb(191,206,226)',
            'rgb(191,206,226)',
            'rgb(191,206,226)',
            'rgb(191,206,226)',
            'rgb(191,206,226)',
            'rgb(191,206,226)'
          ],
          
          borderWidth:1,
          borderColor:'rgb(12, 106, 143)',
          hoverBorderWidth:3,
          hoverBorderColor:'rgb(12, 106, 143)'
        }]
      },
      options:{
        title:{
          display:false,// if true -> title of the chart will be displayed
          text:'Hours per Day',
          fontSize:16,
        },
        legend:{
          display:false,//if true -> legend of the chart will be displayed
          position:'right',
          labels:{
            fontColor:'#000'
          }
        },
        layout:{
          padding:{
            left:50,
            right:0,
            bottom:0,
            top:0
          }
        },
        tooltips:{
          enabled:true
        }
      }
    });
