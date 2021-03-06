'use strict';
var debug = require('debug')('downfall:app');

/**
 * Downfall
 *
 * Atom-shell application
 */

var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var serverStart = require('./server');

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform != 'darwin')
        app.quit();
});

// This method will be called when atom-shell has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {

    // 
    // TODO:
    // Organize the window and handlers
    //

    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800, 
        height: 600,
        hide: true,
    });

    // Start server
    serverStart(mainWindow, function(/* server */) {

        // and load the index.html of the app.
        debug('start loading window');
        mainWindow.loadUrl('http://localhost:4004');

        // Emitted when the window is closed.
        mainWindow.on('closed', function() {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            debug('goodbye...');
            mainWindow = null;
        });

    });
});
