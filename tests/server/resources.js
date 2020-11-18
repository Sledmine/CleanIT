//Materialize functions
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
});

//Chart.js functions


//HTML functions
window.onload = function() {
    fetch('data_get.json')
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        document.getElementById('temperature').innerHTML = data['waterTemperature'] + ' °C'
        document.getElementById('pH').innerHTML = 'Water pH is ' + data['waterPh']

        if(data['isWaterFull'] == 1){
            document.getElementById('waterLevel').innerHTML = 'Your water level is below optimal!'
        } else {
            document.getElementById('waterLevel').innerHTML = 'Your water level is optimal'
        }
        
    })
    .catch((err) => {
      console.log(err)  
    })
}