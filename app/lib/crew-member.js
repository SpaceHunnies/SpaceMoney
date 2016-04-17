'use strict';

import { GameObject } from './game-object';
import { Ship } from './ship'

// notes
/*
// quartermaster oversees the payload
// functions:
//	managing consumables
//	maintain accurate manifests
// 	operate efficiently

// Helms officer is reponsible for navigation and communicating with Engineering
// or in the case of a ship without engineers, the engine

// comms officer operates like a switch-board for ship communications
// possible functions:
// hailing other entities
// opening a line of communication with a ship
// translating
// interfacing with traffic control at a starport


// the captain coordinates the efforts of the crew
// functions:
//	has ultimate say over conflicts
//	motivate crew
//	report to HQ (player)
*/

// Abilities expects a map
export class CrewMember extends GameObject {
	constructor(properties, abilities) {
		super(properties);
		this.full_name = properties.full_name;
		this.abilities = abilities; 
		console.log("created a crew member with full name " + properties.full_name);
	}
}
