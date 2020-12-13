//HTML functions
window.onload = function () {
	document.getElementById("userName").innerHTML = "Mónica Julissa";
	$("#loadingModal").modal({
		show: false,
	});
};

// Make the dashboard widgets sortable Using jquery UI
$(".connectedSortable").sortable({
	placeholder: "sort-highlight",
	connectWith: ".connectedSortable",
	handle: ".card-header, .nav-tabs",
	forcePlaceholderSize: true,
	zIndex: 999999,
});
$(".connectedSortable .card-header").css("cursor", "move");

/*function sendData(led) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("LEDState").innerHTML = this.responseText;
		}
	};
	xhttp.open("GET", "setLED?LEDstate=" + led, true);
	xhttp.send();
}*/

setInterval(function () {
	// Call a function repetatively with 2 Second interval
	getData();
}, 500); //2000mSeconds update rate

/* Chart.js Charts */
// Sales chart
var salesChartCanvas = document.getElementById("revenue-chart-canvas").getContext("2d");
// $('#revenue-chart').get(0).getContext('2d');

var salesChartData = {
	labels: ["Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
	datasets: [
		{
			label: "Current",
			backgroundColor: "rgba(60,141,188,0.9)",
			borderColor: "rgba(60,141,188,0.8)",
			pointRadius: false,
			pointColor: "#3b8bba",
			pointStrokeColor: "rgba(60,141,188,1)",
			pointHighlightFill: "#fff",
			pointHighlightStroke: "rgba(60,141,188,1)",
			data: [66, 59, 86, 27, 100],
		},
		{
			label: "Estimated",
			backgroundColor: "rgba(210, 214, 222, 1)",
			borderColor: "rgba(210, 214, 222, 1)",
			pointRadius: false,
			pointColor: "rgba(210, 214, 222, 1)",
			pointStrokeColor: "#c1c7d1",
			pointHighlightFill: "#fff",
			pointHighlightStroke: "rgba(220,220,220,1)",
			data: [80, 81, 56, 55, 80],
		},
	],
};

var salesChartOptions = {
	maintainAspectRatio: false,
	responsive: true,
	legend: {
		display: false,
	},
	scales: {
		xAxes: [
			{
				gridLines: {
					display: false,
				},
			},
		],
		yAxes: [
			{
				gridLines: {
					display: false,
				},
			},
		],
	},
};

// This will get the first returned node in the jQuery collection.
// eslint-disable-next-line no-unused-vars
var salesChart = new Chart(salesChartCanvas, {
	type: "line",
	data: salesChartData,
	options: salesChartOptions,
});

function getData() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("userName").innerHTML = "Mónica Julissa";
			const data = JSON.parse(this.responseText);
			const waterTemperature = data.waterTemperature;
			const temperatureValue = document.getElementById("temperatureValue");
			temperatureValue.innerHTML = waterTemperature + " °";
			const temperatureBackground = document.getElementById("temperatureBackground");
			if (waterTemperature < 28) {
				console.log("ITS COOOLD");
				temperatureBackground.className = "small-box bg-primary";
			} else {
				temperatureBackground.className = "small-box bg-danger";
			}

			const isWaterEmpty = data.isWaterEmpty;
			const waterLevel = document.getElementById("waterLevel");
			const waterLevelBackground = document.getElementById("waterLevelBackground");
			if (isWaterEmpty == "1") {
				waterLevel.innerHTML = "Bajo";
				waterLevelBackground.className = "small-box bg-red";
			} else {
				waterLevel.innerHTML = "Optimo";
				waterLevelBackground.className = "small-box bg-info";
			}

			const crc = data.crc;
			const crcValue = document.getElementById("crcValue");
			crcValue.innerHTML = crc;

			const waterPh = data.waterPh;
			const waterPhValue = document.getElementById("waterPhValue");
			waterPhValue.innerHTML = waterPh;
		}
	};
	xhttp.open("GET", "http://" + location.hostname + "/data", true);
	xhttp.send();
}

// Sales graph chart
var salesGraphChartCanvas = $("#line-chart").get(0).getContext("2d");
// $('#revenue-chart').get(0).getContext('2d');

var salesGraphChartData = {
	labels: ["Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
	datasets: [
		{
			label: "Digital Goods",
			fill: false,
			borderWidth: 2,
			lineTension: 0,
			spanGaps: true,
			borderColor: "#efefef",
			pointRadius: 3,
			pointHoverRadius: 7,
			pointColor: "#efefef",
			pointBackgroundColor: "#efefef",
			data: [7, 8, 5, 6, 7],
		},
	],
};

var salesGraphChartOptions = {
	maintainAspectRatio: false,
	responsive: true,
	legend: {
		display: false,
	},
	scales: {
		xAxes: [
			{
				ticks: {
					fontColor: "#efefef",
				},
				gridLines: {
					display: false,
					color: "#efefef",
					drawBorder: false,
				},
			},
		],
		yAxes: [
			{
				ticks: {
					stepSize: 1,
					fontColor: "#efefef",
				},
				gridLines: {
					display: true,
					color: "#efefef",
					drawBorder: false,
				},
			},
		],
	},
};

// This will get the first returned node in the jQuery collection.
// eslint-disable-next-line no-unused-vars
var salesGraphChart = new Chart(salesGraphChartCanvas, {
	type: "line",
	data: salesGraphChartData,
	options: salesGraphChartOptions,
});
