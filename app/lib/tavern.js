'use strict';

import { CrewMember } from './crew-member';
import { RoleBase } from './crew/roles/role-base'
import { Navigate } from './crew/roles/navigate-role'
import _ from "lodash";

// The tavern is the crew factory
// Locations can have Tavern objects with modified params and functions
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
    let abilities = new Map();
    let crew = new CrewMember(props, abilities);
    switch(type) {
      case this.crewType.civilian:
        crew.abilities.set('key', value);
      break;

      case this.crewType.quartermaster:
      break;

      case this.crewType.comms:
      break;

      case this.crewType.helms:
        crew.abilities.set('helm', new Navigate(crew))
      break;

      case this.crewType.captain:
      break;

      default:
        console.warn("Tried to generate a crew type that doesn't exist!");
        return new CrewMember(props);
      break;
    }
    return crew;
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
