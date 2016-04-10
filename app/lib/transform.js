'use strict';

const linearAlgebra = require('linear-algebra')(),
	Vector = linearAlgebra.Vector,
	Matrix = linearAlgebra.Matrix;

export class Transform {
	constructor(position) {
		position ? this.position = position : this.position = new Matrix([0, 0, 0]);
	}

	translate(x, y, z) {
		this.position = this.position.plus(new Matrix([x, y, z]));
		return this.position.toArray();
	}

	translateToVector(translation) {
		this.position = this.position.plus(translation);
		return this.position.toArray();
	}

	moveTo(x, y, z) {
		this.position = new Matrix([x, y, z]);
	}

	sqrDistance (toTransform) {
		let displacement = this.position.minus(toTransform.position);
		let sqrDist = displacement.map(function(v) {
			return v * v;
		});
		return sqrDist.getSum();
	}

	distance (toTransform) {
		return Math.sqrt(this.sqrDistance(toTransform));
	}
}