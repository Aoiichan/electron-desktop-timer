const electron = require('electron');
const fs = require('fs');

document.getElementById("yeet").innerHTML = "yeet";
console.log(document);
var allTimers = [];


document.getElementById("newTimerButton").addEventListener("click", newTimer);



function newTimer() {
	/*let alarmTimeInMin = document.getElementById("timerTime").value;
	let alarmName = document.getElementById("timerName").value;
	let alarmColor = document.getElementById("timerColor").value;*/
	allTimers.push({
		time: Date.now() +  document.getElementById("timerTime").value * 60000,
		name: document.getElementById("timerName").value,
		color: document.getElementById("timerColor").value
	});
	writeTimers()

}


function deleteTimer(e) {
	allTimers.splice(e.id, 1);
	console.log("deleted timer" + e.id);
	writeTimers();
}



deleteButtons = []
function writeTimers() {
	document.getElementById("timerDiv").innerHTML =""
	allTimers.forEach(timer => {
		let curTimer = document.getElementById("timerDiv").appendChild(document.createElement("div"));
		curTimer.className = "timer";
		curTimer.innerHTML = ("Timer #" + allTimers.indexOf(timer) +
			": <em>" + timer.name + "</em>, in: " + (timer.time - Date.now()) +
			("&nbsp;&nbsp;&nbsp;&nbsp;") +
			'<button class="timerDeleter" id="' + allTimers.indexOf(timer) + '">Delete this timer</button>');
		curTimer.style.backgroundColor = timer.color;
		//console.log(timer)

	});
	//console.log(Array.prototype.slice.call(document.getElementsByClassName("timerDeleter")));
	var deleteButtons = Array.prototype.slice.call(document.getElementsByClassName("timerDeleter"))
	console.log(deleteButtons);
	deleteButtons.forEach(button => {
		button.addEventListener("click", function () { deleteTimer(button) })
	})
	
}
/*
let myNotification = new Notification('Title', {
	body: 'Lorem Ipsum Dolor Sit Amet'
})
*/
window.setInterval(function () {
	writeTimers();
}, 2000);