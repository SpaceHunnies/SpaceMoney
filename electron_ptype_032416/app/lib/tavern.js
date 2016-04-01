'use strict';

import { CrewMember } from './crew-member';
import _ from "lodash";

export class Tavern {
	constructor(properties) {
		console.log("created a tavern")
		this.properties = properties;
	}

	generateCrew() {
		let props = {}
    props.full_name = this.generateFullName();
    console.log("spawning a crew member with properties:\n " + props);

		return new CrewMember(props);
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
