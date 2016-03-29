'use strict';

const linearAlgebra = require('linear-algebra')(),
	Vector = linearAlgebra.Vector,
	Matrix = linearAlgebra.Matrix;

Matrix.sqrDistance = function (fromVector, toVector) {
	let displacement = fromVector.minus(toVector);
	let sqrDist = displacement.map(function(v) {
		return v * v;
	});
	return sqrDist.getSum();
};

Matrix.distance = function(fromVector, toVector) {
	return Math.sqrt(Matrix.sqrDistance(fromVector, toVector));
};

export class Transform {
	constructor(position) {
		position ? this.position = position : this.position = new Matrix([0, 0, 0]);
	}

	translate(translation) {
		this.position = this.position.plus(translation);
		return this.position.toArray();
	}

	translate(x, y, z) {
		this.position = this.position.plus(new Matrix([x, y, z]));
		return this.position.toArray();
	}

	moveTo(x, y, z) {
		this.position = new Matrix([x, y, z]);
	}
}