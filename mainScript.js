const electron = require('electron');
const fs = require('fs');

var allTimers = [];
var expiredTimers = [];

document.getElementById("newTimerButton").addEventListener("click", newTimer);

function newTimer() { //this gets called when 
	allTimers.push({
		time: new Date(document.getElementById("timerTime").value * 60000), //This will keep track of when the alarm should ring (will have a small epoch value), this property WILL be changed
		alarmTime: new Date( Date.now() + document.getElementById("timerTime").value * 60000), //This stores the timestamp of the time when the alarm should ring, property will NOT be changed
		origTime: new Date(new Date(document.getElementById("timerTime").value * 60000) - Date.now()), //Used to tell what the original time was upon alarm expiry
		name: document.getElementById("timerName").value,
		color: document.getElementById("timerColor").value
	});
	writeTimers()
	document.getElementById("timerTime").value = 1;
	document.getElementById("timerName").value = "";
	color: document.getElementById("timerColor").value = "#ffaaaa"
}

function refreshTimers() {
	//Function to refresh all the timer objects internally, gets called by the set interval function every second, does not modify page content
	allTimers.forEach(timer => {
		timer.time = new Date(timer.alarmTime - Date.now());

		if (timer.time < 0) {
			expiredTimers.push(timer);
			let notif = new Notification("Expired timer: " + timer.name, {
				body: "The timer named " + timer.name + " (for " + stringTime(timer.origTime) + ") has expired."
			
			})
			delete (notif);
			allTimers.splice(allTimers.indexOf(timer), 1);
			writeExpiredTimers();
		}
	})
}

function deleteTimer(e) {
	//deletes a timer, eventlistener function of all the "delete timer" buttons
	allTimers.splice(e.id, 1);
	console.log("deleted timer" + e.id);
	writeTimers();
}

function stringTime(time) {
	//parses an epoch value into a string value
	let collect = " "
	if (time.getMinutes() > 0) { collect += time.getMinutes() + "min " }
	if (time.getSeconds() > 0) { collect += time.getSeconds() + "sec " }
	return collect;
}

deleteButtons = []
function writeTimers() {
	//function that refreshes the page's timerDiv with all the timers and their values, called by the set interval function and when the user makes a modification to the timers by creating or deleting one
	document.getElementById("timerDiv").innerHTML =""
	allTimers.forEach(timer => {
		let curTimer = document.getElementById("timerDiv").appendChild(document.createElement("div"));
		curTimer.className = "timer";
		curTimer.innerHTML = ("Timer #" + allTimers.indexOf(timer) +
			": <em>" + timer.name + "</em>, in: " + stringTime(timer.time) +
			("&nbsp;&nbsp;&nbsp;&nbsp;") +
			'<button class="timerDeleter" id="' + allTimers.indexOf(timer) + '">Delete this timer</button>');
		curTimer.style.backgroundColor = timer.color;
	});

	var deleteButtons = Array.prototype.slice.call(document.getElementsByClassName("timerDeleter"))

	deleteButtons.forEach(button => {
		button.addEventListener("click", function () { deleteTimer(button) })
	})
	
}

function writeExpiredTimers() {
	//Appends a new expired timer to the beginning of the expiredTimers div, this gets called by refreshTimers()
	expiredTimers.forEach(timer => {
		let newDeletedTimer = document.getElementById("expiredTimersDiv").insertBefore(document.createElement("div"), document.getElementById("expiredTimersDiv").childNodes[0]);
		newDeletedTimer.innerHTML = "Timer <em>" + timer.name + "</em>, expired at: " + timer.origTime.getHours() + ":" + timer.alarmTime.getMinutes() + ":" + timer.alarmTime.getSeconds()
		expiredTimers.splice(expiredTimers.indexOf(timer), 1);
	})
}

window.setInterval(function () {
	refreshTimers()
	writeTimers();
}, 1000);