'use strict';
const app = require('app');
const BrowserWindow = require('browser-window');
const togglify = require('../');
const shortcuts = require('electron-shortcut-loader')('./demo/shortcuts');
const ipc = require('ipc');

// report crashes to the Electron project
require('crash-reporter').start();

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// prevent window being garbage collected
let mainWindow;

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow() {
	var win;

	win = togglify(new BrowserWindow({
		width: 600,
		height: 480
	}), {
		animation: 'scale'
	});

	win.loadUrl(`file://${__dirname}/index.html`);
	win.on('closed', onClosed);

	return win;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate-with-no-open-windows', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow();
	shortcuts.register();
});

app.on('will-quit', function () {
  shortcuts.unregister();
});

app.on('shortcut-press', function (e) {
	mainWindow.toggle();
});

ipc.on('change-animation', function(e, animation) {
	togglify.changeAnimation(mainWindow, animation);
});
