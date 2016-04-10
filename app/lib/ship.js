'use strict';

import { GameObject } from './game-object';
import { Engine } from './ship_modules/engine'
import { ShipModule } from './ship_modules/ship-module'
import { HelmsOfficer } from './crew/helms-officer'

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
		this.nextTick = {}; // container for storing results of all calculations this tick;
	}

	connectModules() {
		for (var v of this.modules) {
			v[1].ship = this;
		}
	}

	update() {
		// apply results of this.nextTick
		// resolve conflicts between modules
	}

	translate (x, y, z) {
		this.transform.translate(x, y, z);
	}

	// target: vec3
	move (target) {
		// this will at some point change to query the crew member's instead of the module;
		// the crew then query the modules and get the module to do work
		if (!this.crew.has('helms')) return;
		if (!this.modules.has("engine")) return;
		var response = this.crew.get("helms").sendInstructionToEngine(this, {target: target, origin: this.transform});
		// var response = this.modules.get("engine").doWork({target: target, origin: this.transform});
		
		if (response.newPosition) {
			this.transform.position = response.newPosition;
			this.payload.fuel = this.payload.fuel - response.fuelUse;
		}
	}

}
