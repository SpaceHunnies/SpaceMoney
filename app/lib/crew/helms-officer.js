'use strict';

import { CrewMember } from '../crew-member'
// import { Ship } from '../ship'
import { Engine } from '../ship_modules/engine'

export class HelmsOfficer extends CrewMember {
	constructor(args) {
		super(args);
	}

	sendInstructionToEngine(fromShip, request) {
		return fromShip.modules.get("engine").doWork(request);
	}

	// methods
}