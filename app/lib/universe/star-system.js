'use strict';
import { GameObject } from '../game-object'

export class StarSystem extends GameObject {
	constructor(args, transform) {
		super(args, transform);
		this.starport = args.starport;
		this.name = this.generateName();
	}

	generateName() {
	    var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	    var numbers = "0123456789";

	    let a = "";
	    let b = "";
	    for( var i=0; i < 3; i++ ) {
	        a += letters.charAt(Math.floor(Math.random() * letters.length));
	        b += numbers.charAt(Math.floor(Math.random() * numbers.length));
	    }

	    return a + '-' + b;
	}

	print() {
		let t = this.transform.position.toArray();
		return this.name + ': ' + t + ' starport = ' + this.starport;
	}
	// methods
}