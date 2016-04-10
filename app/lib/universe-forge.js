'use strict';

import { Transform } from './transform';

const linearAlgebra = require('linear-algebra')(),
	Vector = linearAlgebra.Vector,
	Matrix = linearAlgebra.Matrix;

export class UniverseForge {
	constructor(howMany, x, y, z) {
		this.howMany = howMany;
		this.x = x;
		this.y = y;
		this.z = z;
		this.universe = this.generateUniverse();
	}

	generateVec3() {
		return new Transform(new Matrix([
			Math.floor(Math.random() * 2 * this.x) - this.x,
			Math.floor(Math.random() * 2 * this.y) - this.y,
			Math.floor(Math.random() * 2 * this.z) - this.z,
			]));
	}

	generateUniverse() {
		let universe = [];
		for (var i = 0; i < this.howMany; i++) {
			universe.push(this.generateVec3());
		}
		return universe;
	}
}