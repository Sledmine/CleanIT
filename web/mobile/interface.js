//HTML functions
window.onload = function () {
	var weekTemp = "At optimal value";
	var dailyTemp = "Actual temperature: 24 C";

	document.getElementById("waterLevel").innerText = weekTemp;
	$('#loadingModal').modal({
		show: true
	})
};
