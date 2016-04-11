'use strict';

import { CrewMember } from '../crew-member'

// comms officer operates like a switch-board for ship communications
// possible functions:
// hailing other entities
// opening a line of communication with a ship
// translating
// interfacing with traffic control at a starport
export class CommsOfficer extends CrewMember {
	constructor(args) {
		super(args);
	}
}