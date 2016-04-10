// Here is the starting point for your application code.
// All stuff below is just to show you how it works. You can delete all of it.

// Use new ES6 modules syntax for everything.
import os from 'os'; // native node.js module
import { remote } from 'electron'; // native electron module
import jetpack from 'fs-jetpack'; // module loaded from npm
import env from './env';

import { GameManager } from './lib/game-manager'

let fps = 4
let framerate = 1000 / 4;

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

function mainLoop() {
	update();
	draw();
}

// all game functionality routes through the game manager
function update () {
	gm.update(framerate / 1000);
}

function draw () {
	document.getElementById("pos-name").innerHTML = gm.ship.transform.position.data;

	let list = '';
	for (var i = gm.universe.length - 1; i >= 0; i--) {
		if (gm.universe[i].position.data[0] == gm.ship.transform.position.data[0] &&
			gm.universe[i].position.data[1] == gm.ship.transform.position.data[1] &&
			gm.universe[i].position.data[2] == gm.ship.transform.position.data[2]
			) { break };
			//thanks javascript
		list += gm.universe[i].position.data;
		list += "\n";
	}

	document.getElementById("destinations").innerHTML = list;
}

setInterval(mainLoop, framerate);
