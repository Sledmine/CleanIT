//Materialize functions
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
});

//Chart.js functions
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [{
            label: 'Average temperature (Celcius)',
            borderColor: 'rgb(56, 142, 60)',
            backgroudColor: 'rgb(255, 255, 255)',
            pointRadius: 6,
            pointBackgroundColor: 'rgb(56, 142, 60)',
            data: [30, 50, 25.1, 27.5, 28, 26.7, 26.5]
        }]
    },

    // Configuration options go here
    options: {}
});

//HTML functions
window.onload = function(){
    var weekTemp = 'Weekly temperature: 27 C'
    var dailyTemp = 'Actual temperature: 24 C'

    document.getElementById('weekTemp').innerHTML = weekTemp
    document.getElementById('dailyTemp').innerHTML = dailyTemp
}