'use strict';

import { Transform } from './transform';

// GameObject is the base class for all objects that need to operate
// within the rules of the game
export class GameObject {
	constructor(properties, transform) {
		this.name = properties.name;
		// we might not want all game objects to automatically have a transform
		this.transform = transform || new Transform(properties.position);
	}
}
