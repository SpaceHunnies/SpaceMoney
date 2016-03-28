'use strict';

let linearAlgebra = require('linear-algebra')(),
	Vector = linearAlgebra.Vector,
	Matrix = linearAlgebra.Matrix;

export class Transform {
	constructor(position) {
		position ? this.position = position : this.position = new Matrix([0, 0, 0]);
	}

	translate(translation) {
		this.position = this.position.plus(translation);
	}

	translate(x, y, z) {
		this.position = this.position.plus(new Matrix([x, y, z]));
		return this.position.toArray()
	}
}