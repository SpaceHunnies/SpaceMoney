'use strict';

import { CrewMember } from './crew-member';
import { HelmsOfficer } from './crew/helms-officer';
import { CommsOfficer } from './crew/comms-officer';
import { Captain } from './crew/captain';
import { Quartermaster } from './crew/quartermaster';
import _ from "lodash";

export class Tavern {
	constructor(properties) {
		console.log("created a tavern")
		this.properties = properties;
    this.crewType = {
      civilian: 0,
      quartermaster: 1,
      comms: 2,
      helms: 3,
      captain: 4
    };
	}

	generateCrew(_type) {
		let props = {}
    props.full_name = this.generateFullName();
    console.log("spawning a crew member with properties:\n " + props);
    let type = _type ? _type : null;
    switch(type) {
      case this.crewType.civilian:
        return new CrewMember(props);
      break;

      case this.crewType.quartermaster:
        return new Quartermaster(props);
      break;

      case this.crewType.comms:
        return new CommsOfficer(props);
      break;

      case this.crewType.helms:
        return new HelmsOfficer(props);
      break;

      case this.crewType.captain:
        return new Captain(props);
      break;

      default:
        console.warn("Tried to generate a crew type that doesn't exist!");
        return new CrewMember(props);
      break;
    }
	}

  generateFullName() {
    let syllables = [
      "sym", "aes", "cer", "ceph", "zym", "xym", "rus", "ym", "al", "an", "dic",
      "dor", "ges", "ido", "kre", "via", "xeu", "ze", "usu", "ly"
    ]

    let end_syllables = [
      "us", "os", "lu", "er", "id", "ede", "isto", "ea", "ia", "ra", "ike", "eus",
      "ett", "son", "bell"
    ]

    return _.startCase(_.sample(syllables)) + _.sample(end_syllables);
  }
}
