// Here is the starting point for your application code.
// All stuff below is just to show you how it works. You can delete all of it.

// Use new ES6 modules syntax for everything.
import os from 'os'; // native node.js module
import { remote } from 'electron'; // native electron module
import jetpack from 'fs-jetpack'; // module loaded from npm
import env from './env';
import ShipView from "./components/ship-view";
import React from 'react';
import { render } from 'react-dom';

import { GameManager } from './lib/game-manager';

var app = remote.app;
let gm = new GameManager();
let rate = 1;
let interval;

document.onkeydown = function(event) {
	// console.log(event);
	if (event.keyCode == 32) {// space
		gm.update();
	}
	if (event.keyCode == 82) gm.ship.payload.fuel = 999999999; //r
	if (event.keyCode == 88) { // x
		for (let i = 0; i < 10; i++) {
			gm.update();
		}
	}
	// key 1
	if (event.keyCode == 49) gm.setRandTarget();
	if (event.keyCode == 187) { // +
		rate *= 2;
		clearInterval(interval);
		interval = setInterval(update, 1000 / rate);
	}
	if (event.keyCode == 189) { // -
		if (rate > 1) {
			rate /= 2;
			clearInterval(interval);
			interval = setInterval(update, 1000 / rate);
		} else {
			clearInterval(interval);
			rate = 1;
		}
	}

	refresh();
}

function update() {
	gm.update();
	refresh();
}

function refresh() {
  render(<ShipView data={gm.ship} rate={rate} />, document.getElementById("root"));	
}

refresh();


// ShipView
//   PropertiesList
//     PropertyView
//   CrewList
//     CrewMemberView
//   PayloadList
//     PayloadView
//   ModuleList
//     ModuleView
