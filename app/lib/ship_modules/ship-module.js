'use strict';

export class ShipModule {
	constructor(properties) {
		this.name = properties.name;
		this.ship = null; 
		// setting this reference is done after construction currently 
		// because the ship is constructed via a template object that 
		// can't store the reference.
	}
}