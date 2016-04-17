'use strict';

import { Role } from './role-base'
import { Transform } from '../../transform'
import { Navigator } from './navigate-role'

// Captain is going to function like a switchboard right now
// will also function a bit like a reference for other roles to know target locations
// or other information
export class Captain extends Role {
	constructor(person) {
		super(person);
		this.targetTransform = null;
	}

	setTargetLocation(targetTransform) {
		this.targetTransform = targetTransform;
		// do other stuff ??
	}

	doMove() {
		let navigator = null;
		if (this.ship.crew.has("nav")) {
			navigator = this.ship.crew.get('nav');
		}
		navigator.navigate();
	}
}