const electron = require('electron');

document.getElementById("yeet").innerHTML = "yeet";
console.log(document);
var allTimers = [];


document.getElementById("newTimerButton").addEventListener("click", newTimer);


class timer {
	constructor(time, color, name) {
		self.alarmTime = time;
		self.alarmColor = color;
		self.alarmName = name;
		return self;
	}

}

function newTimer() {
	let alarmTimeInMin = document.getElementById("timerTime").value;
	let alarmName = document.getElementById("timerName").value;
	let alarmColor = document.getElementById("timerColor").value;

	console.log(alarmTimeInMin);
	console.log(alarmName);
	console.log(alarmColor);
}
function writeTimers() {

}