'use strict';

import { Ship } from './ship';
import { Tavern } from "./tavern"

export class Shipyard {
	constructor(properties) {
		console.log("created a shipyard")
		this.properties = properties;
		this.shipList = [];
		let tavern = new Tavern(); // hack?
		this.shipTemplate = {
			name: 'prototypeShip',
			parameters: {
				
			},
			payload: {
				food: 0,
				oxygen: 0,
				water: 0
			},
			modules: {
				engine: {},
				lifesupport: {}
			},
			crew: {
				captain: tavern.generateCrew(),
				comms: tavern.generateCrew(),
				quartermaster: tavern.generateCrew(),
				navigator: tavern.generateCrew()
			}
		};
	}

	buildShip(properties) {
		console.log("spawning a ship with properties:\n " + properties.name);
		let s = new Ship(properties);
		this.shipList.push(s);
		return s;
	}
}
