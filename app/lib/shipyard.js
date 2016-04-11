'use strict';

import { Ship } from './ship';
import { Tavern } from "./tavern"
import { Engine } from './ship_modules/engine'

// The shipyard is the ship factory
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
				water: 0,
				fuel: 100,
			},
			modules:
				new Map([
						['engine', new Engine({name: 'engine' })]
					]),
			crew:
				new Map ([
						['captain', tavern.generateCrew(tavern.crewType.civilian)],
						['comms', tavern.generateCrew(tavern.crewType.comms)],
						['quartermaster', tavern.generateCrew(tavern.crewType.quartermaster)],
						['helms', tavern.generateCrew(tavern.crewType.helms)]
					])
		};
		// we should probably not use the role as the key in the crew map; what if we need multiple crew with the same role?
	}

	buildShip(properties) {
		console.log("spawning a ship with properties:\n " + properties.name);
		let s = new Ship(properties);
		this.shipList.push(s);
		return s;
	}
}
