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
			name: this.generateName(),
			parameters: {
				
			},
			payload: {
				food: 0,
				oxygen: 0,
				water: 0,
				fuel: 100000,
			},
			modules:
				new Map([
						['engine', new Engine({ name: 'engine' })]
					]),
			crew:
				new Map ([
						['captain', tavern.generateCrew(tavern.crewType.captain)],
						['comms', tavern.generateCrew(tavern.crewType.comms)],
						['quartermaster', tavern.generateCrew(tavern.crewType.quartermaster)],
						['nav', tavern.generateCrew(tavern.crewType.nav)]
					])
		};
		// we should probably not use the role as the key in the crew map; what if we need multiple crew with the same role?
	}

	buildShip(properties, universe) {
		console.log("spawning a ship with properties:\n " + properties.name);
		let s = new Ship(properties);
		s.universe = universe;
		this.shipList.push(s);
		return s;
	}

	generateName() {
		let names = [
			"GCU Of Course I Still Love You",
			"USS Enterprise",
			"Battleship Yamato",
			"NX-59650 USCSS Prometheus",
			"Serenity",
			"USCSS Nostromo",
			"Executor",
			"Millenium Falcon",
			"LSV Profit Margin",
			"GCU Just Read the Instructions",
			"FP/(D)ROU	The Usual But Etymologically Unsatisfactory"
		];
		return names[Math.floor(Math.random() * names.length)]
	}
}
