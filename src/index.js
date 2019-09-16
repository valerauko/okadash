"use strict";

const electron = require("electron");
const app = electron.app;
const ipcMain = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;
let mainWindow;
let subWindow;
let isSubOpen = false;

app.on("window-all-closed", function() {
  if (process.platform != "darwin") {
    app.quit();
  }
});

app.on("ready", function() {
  mainWindow = new BrowserWindow({
    webPreferences: {
      transparent: false,
      frame: true,
      resizable: true,
      hasShadow: false,
      alwaysOnTop: false,
      nodeIntegration: true,
      webviewTag: true
    }
  });
  mainWindow.maximize();
  mainWindow.loadURL("file://" + __dirname + "/index.html");

  mainWindow.on("closed", function() {
    mainWindow = null;
  });
});

ipcMain.on("window-open", function() {
  if (isSubOpen) return;
  subWindow = new BrowserWindow({
    width: 1200,
    height: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  });
  isSubOpen = true;
  subWindow.loadURL("file://" + __dirname + "/preference.html");
  subWindow.on("closed", function() {
    subWindow = null;
    isSubOpen = false;
    mainWindow.reload();
  });
});