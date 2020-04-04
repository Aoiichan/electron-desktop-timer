// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')

function createWindow () {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
	width: 400,
	height: 600,
	webPreferences: {
		preload: path.join(__dirname, 'preload.js'),
		nodeIntegration: true
	}
    })
  mainWindow.loadFile('index.html')
}

app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

