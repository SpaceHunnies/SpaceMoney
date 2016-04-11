'use strict';

import { CrewMember } from '../crew-member'
import { Engine } from '../ship_modules/engine'

// Helms officer is reponsible for navigation and communicating with Engineering
// or in the case of a ship without engineers, the engine
export class HelmsOfficer extends CrewMember {
	constructor(args) {
		super(args);
	}

	sendInstructionToEngine(fromShip, request) {
		return fromShip.modules.get("engine").doWork(request);
	}

	// methods
}