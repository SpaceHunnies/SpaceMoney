'use strict';

import { GameObject } from './game-object';
import { Engine } from './ship_modules/engine'
import { ShipModule } from './ship_modules/ship-module'
import { Captain } from './crew/roles/captain-role'
import _ from "lodash";

// The base ship object is basically a container for other modules that work like plugins
export class Ship extends GameObject {
	constructor(template) {
		super(template);
		this.crew = template.crew; 						// just a container for the crew objects; ship defines rules
		this.payload = template.payload; 				// a manifest of items and weight; ship defines rules
		this.modules = template.modules;				// engine(s); life support; cargo hatches; etc. -- defines performance
		this.parameters = template.parameters;			// extra stuff
		console.log("created a ship with name " + template.name);
		this.connectModules();
		this.connectCrew();
		this.nextTick = {}; // container for storing results of all calculations this tick;
		this.universe = null;
		this.targetSystem = null;
	}

	connectModules() {
		for (var v of this.modules.values()) {
			v.ship = this;
		}
	}

	connectCrew() {
		for (var v of this.crew.values()) {
			v.ship = this;
			for (var a of v.abilities.values()) {
				a.ship = this;
			}
		}
	}

	update() {
		// apply results of this.nextTick
		// resolve conflicts between modules
	}

	translate (x, y, z) {
		this.transform.translate(x, y, z);
	}
}
