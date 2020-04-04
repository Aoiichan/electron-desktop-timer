# Desktop timers

This is a small desktop timer application built using the electron framework, in html, css and javascript. Built as a final project for a web development course.<br>
You can create a timer for x amount of minutes (decimals are supported), with a specific name and color. You will get alerted by a desktop notification when the timer expires. Both current and expired times are shown in the app.<br>


# Installation instructions
You must have node.js installed on your local machine, and npm added in your path.<br>
1. Clone the repo to your local drive <br>
2. run `npm install` inside the repository root folder<br>
3. Start the program with `npm start`



# Files
main.js - handles the electron window creation and exiting of the app<br>
mainScript.js - all of the actual code happens here, this gets loaded by index.html<br>
index.html - the default page, and the only one in the program. gets loaded by main.js<br>
mainStyle.css - all of the custom styles, loaded in index.html<br>
run.bat - a batch file that starts the electron process with main.js as the file argument.<br>
run.lnk - a link to the aforementioned batch file.<br>


