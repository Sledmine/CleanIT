//HTML functions
window.onload = function () {
	var weekTemp = "Optimo";
	var dailyTemp = "Actual temperature: 24 C";

	document.getElementById("waterLevel").innerText = weekTemp;
	$('#loadingModal').modal({
		show: false
	})
};
