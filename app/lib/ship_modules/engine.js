'use strict';

import { ShipModule } from './ship-module';
const linearAlgebra = require('linear-algebra')(),
	Vector = linearAlgebra.Vector,
	Matrix = linearAlgebra.Matrix;

import { Transform } from '../transform';

export class Engine extends ShipModule {
	constructor(properties) {
		super(properties);
		this.fuelRatio = 1; // units of fuel per unit of movement (fuel / distance)
		this.speed = 4; // units of time to move one unit (time / distance)
		this.output = null;
	}

	// onRequest: { target: transform, origin: transform }
	// right now assuming you always use one unit of time
	doWork(onRequest) {
		var origin = onRequest.origin;
		var target = onRequest.target;
		var distance = origin.distance(target);
		if (distance <= 0) {
			this.output = { newPosition: origin, fuelUse: 0 };
		}
		var direction = origin.position.minus(target.position).mulEach(1 / distance);
		var _output = {}; // newPosition, fuelUse

		if (this.ship.payload.fuel < 1) {
			_output.fuelUse = 0;
			_output.newPosition = origin.position;
		} else {
			if (distance < this.speed ) {
				// using less than max, so we need to calculate
				var fraction = distance / this.speed;
				_output.fuelUse = this.fuelRatio * this.speed * fraction;
				_output.newPosition = onRequest.origin.position.plus(direction.mulEach(this.speed * fraction));
			} else {
				// target is too far, go as far as possible
				_output.fuelUse = this.fuelRatio * this.speed;
				_output.newPosition = onRequest.origin.position.plus(direction.mulEach(this.speed));
			}
		}
		this.output = _output;
	}
}