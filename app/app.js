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

document.onkeydown = function(event) {
	// console.log(event);
	if (event.keyCode == 32) gm.update();
	if (event.keyCode == 82) gm.ship.payload.fuel = 1000;
}

render(
  <ShipView data={gm.ship} />,
  document.getElementById("root")
)


// ShipView
//   PropertiesList
//     PropertyView
//   CrewList
//     CrewMemberView
//   PayloadList
//     PayloadView
//   ModuleList
//     ModuleView
