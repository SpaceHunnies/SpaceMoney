'use strict';

import { Transform } from './transform';

export class GameObject {
	constructor(properties) {
		this.name = properties.name;
		this.transform = new Transform(properties.position);
	}
}