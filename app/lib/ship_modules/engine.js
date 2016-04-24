'use strict';

import { ShipModule } from './ship-module';
const linearAlgebra = require('linear-algebra')(),
	Vector = linearAlgebra.Vector,
	Matrix = linearAlgebra.Matrix;

import { Transform } from '../transform';

export class Engine extends ShipModule {
	constructor(properties) {
		super(properties);
		this.fuelRatio = 0.1; // units of fuel per unit of movement (fuel / distance)
		this.speed = 40; // units of time to move one unit (time / distance)
		this.output = null;
	}

	// onRequest: { target: transform, origin: transform }
	// right now assuming you always use one unit of time
	doWork(onRequest, callback, caller) {
		var _output = {}; // newPosition, fuelUse, dist
		var origin = onRequest.origin;
		var target = onRequest.target;
		var distance = origin.distance(target);
		if (distance <= 0) {
			console.log('[Engine] Arrived at target');
			this.output = { newPosition: origin, fuelUse: 0, distance: 0 };
			if (callback) callback(caller);
			return;
		}
		_output.distance = distance;
		var direction = target.position.minus(origin.position).mulEach(1 / distance);

		if (this.ship.payload.fuel < 1) {
			console.log('[Engine] Out of fuel!');
			_output.fuelUse = 0;
			_output.newPosition = origin.position;
		} else {
			if (distance < this.speed ) {
				// using less than max, so we need to calculate

				var fraction = distance / this.speed;
				_output.fuelUse = this.fuelRatio * this.speed * fraction;
				_output.newPosition = target.position; //onRequest.origin.position.plus(direction.mulEach(this.speed * fraction));
			} else {
				// target is too far, go as far as possible
				_output.fuelUse = this.fuelRatio * this.speed;
				_output.newPosition = onRequest.origin.position.plus(direction.mulEach(this.speed));
			}
		}
		this.output = _output;
		this.moveTransform();
		if (callback) callback(caller);
	}

	moveTransform() {
		if (!this.output.newPosition) return;

		this.debugPrint();
		this.ship.transform.position = this.output.newPosition;
		this.ship.payload.fuel = this.ship.payload.fuel - this.output.fuelUse;

	}

	debugPrint() {
		let a = this.ship.transform.position.toArray();
		let b = this.output.newPosition.toArray();
		let f = 1;
		for (var i = a[0].length - 1; i >= 0; i--) {
			a[0][i] = Math.round(a[0][i] * f) / f;
			b[0][i] = Math.round(b[0][i] * f) / f;
		}
		console.log('[Engine] Ship moved from <' + a + '> to <' + b + '> with ' + this.ship.payload.fuel + ' fuel remaining');
		let ticks = Math.round(this.output.distance / this.speed);
		let totalFuel = Math.round(this.output.distance / this.speed * this.output.fuelUse);
		console.log('[Engine] Distance to target = ' + Math.round(this.output.distance) + ' with est. fuel use @ ' + totalFuel + ' (' + ticks + ' ticks)');
	}
}