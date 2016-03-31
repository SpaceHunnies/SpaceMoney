// Here is the starting point for your application code.
// All stuff below is just to show you how it works. You can delete all of it.

// Use new ES6 modules syntax for everything.
import os from 'os'; // native node.js module
import { remote } from 'electron'; // native electron module
import jetpack from 'fs-jetpack'; // module loaded from npm
import { greet } from './hello_world/hello_world'; // code authored by you in this project
import env from './env';

import { GameManager } from './lib/game-manager'

let framerate = 1000 / 60

let gm = new GameManager();

console.log('Loaded environment variables:', env);

var app = remote.app;
var appDir = jetpack.cwd(app.getAppPath());

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('ship-name').innerHTML = gm.ship.name;
  document.getElementById("pos-name").innerHTML = gm.ship.transform.position.data;
});

document.addEventListener("keypress", function () {
	console.log("keypress!");
	gm.update();
});

function update () {
	gm.update(framerate);
};

function draw () {
	document.getElementById("pos-name").innerHTML = gm.ship.transform.position.data;
};

setInterval(update, framerate);
setInterval(draw, framerate * 60);
