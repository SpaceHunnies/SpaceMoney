'use strict';
import { GameObject } from '../game-object'

export class StarSystem extends GameObject {
	constructor(args, transform) {
		super(args, transform);
		this.starport = args.starport;
	}

	print() {
		let t = this.transform.position.toArray();
		return this.name + ': ' + t + ' starport = ' + this.starport;
	}
	// methods
}