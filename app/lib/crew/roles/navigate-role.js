'use strict';
import { Role } from './role-base'
import { Engine } from '../../ship_modules/engine'

export class Navigate extends Role {
	constructor(person) {
		super(person);
	}

	sendInstructionToEngine(fromShip, request) {
		return fromShip.modules.get("engine").doWork(request);
	}


	// methods
}