const electron = require('electron');
const fs = require('fs');

var allTimers = [];
var expiredTimers = [];

document.getElementById("newTimerButton").addEventListener("click", newTimer);



function newTimer() {
	allTimers.push({
		time: new Date(document.getElementById("timerTime").value * 60000), //This will keep track of when the alarm should ring (will have a small epoch value)
		alarmTime: Date.now() + document.getElementById("timerTime").value * 60000, //This stores the timestamp of the time when the alarm should ring
		origTime: new Date(new Date(document.getElementById("timerTime").value * 60000) - Date.now()), //Used to tell what the original time was upon alarm expiry
		name: document.getElementById("timerName").value,
		color: document.getElementById("timerColor").value
	});
	writeTimers()
}

function refreshTimers() {
	allTimers.forEach(timer => {
		timer.time = new Date(timer.alarmTime - Date.now());
		if (timer.time < 0) {
			expiredTimers.push(timer);
			let notif = new Notification("Expired timer: " + timer.name, {
				body: "The timer named " + timer.name + " (for " +  stringTime(timer.origTime) +") has expired."
			})
			delete (notif);
			allTimers.splice(allTimers.indexOf(timer), 1);
		}
	})
}

function deleteTimer(e) {
	allTimers.splice(e.id, 1);
	console.log("deleted timer" + e.id);
	writeTimers();
}

function stringTime(time) {
	let collect = " "
	console.log(typeof time)
	if (time.getMinutes() > 0) { collect += time.getMinutes() + "min " }
	if (time.getSeconds() > 0) { collect += time.getSeconds() + "sec " }
	return collect;
}

deleteButtons = []
function writeTimers() {
	document.getElementById("timerDiv").innerHTML =""
	allTimers.forEach(timer => {
		let curTimer = document.getElementById("timerDiv").appendChild(document.createElement("div"));
		curTimer.className = "timer";
		curTimer.innerHTML = ("Timer #" + allTimers.indexOf(timer) +
			": <em>" + timer.name + "</em>, in: " + stringTime(timer.time)/*(timer.time - Date.now())*/ +
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
	refreshTimers()
	writeTimers();
}, 1000);