module.exports = (type) => {
	return {
		name: type,
		speed: 5,
		crewMax: 20,
		food: 0,
		oxy: 0,
		water: 0,
		captain: null,
		comms: null,
		nav: null,
		quartermaster: null
	};
}