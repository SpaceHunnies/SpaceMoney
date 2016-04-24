'use strict';

import { Role } from './role-base'
import { Transform } from '../../transform'
import { Navigate } from './navigate-role'

// Captain is going to function like a switchboard right now
// will also function a bit like a reference for other roles to know target locations
// or other information
export class Captain extends Role {
	constructor(person) {
		super(person);
	}

	setTargetLocation(targetTransform) {
		this.ship.targetTransform = targetTransform;
		// do other stuff ??
	}

	doMove() {
		if (!this.ship.crew.has("nav")) {
			console.log('[Captain] No navigator!');
			return;
		}
		this.ship.crew.get('nav').abilities.get('nav').navigate();
	}
}