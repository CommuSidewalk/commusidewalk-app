import _ from 'lodash';
/**
 * @param {import('$lib/types').EventGeneral[]} evPoints
 */
export function createEvent2Color(evPoints) {
	const maxEv = _.maxBy(evPoints, (ev) => {
		return deathAndInjury2Severity(ev.number_of_deaths, ev.number_of_injuries);
	});
	const minEv = _.minBy(evPoints, (ev) => {
		return deathAndInjury2Severity(ev.number_of_deaths, ev.number_of_injuries);
	});
	const maxSeverity = deathAndInjury2Severity(maxEv.number_of_deaths, maxEv.number_of_injuries);
	const minSeverity = deathAndInjury2Severity(minEv.number_of_deaths, minEv.number_of_injuries);

	/**
	 * @param {import("$lib/types").EventPoint} event
	 */
	const event2Color = (event) => {
		const severity = deathAndInjury2Severity(event.number_of_deaths, event.number_of_injuries);
		// const norm = logNormalization(maxSeverity, severity);
		const norm = minMaxNormalization(maxSeverity, minSeverity, severity);
		const round = Math.round(255 - norm * 220);
		const B = round.toString(16);

		if (event.accident_category_name === 'A1') {
			return '#' + 'CC' + '00' + B;
		} else {
			return '#' + '00' + 'CC' + B;
		}
	};
	return event2Color;
}

function minMaxNormalization(max, min, val) {
	return (val - min) / (max - min);
}

function logNormalization(max, val) {
	return Math.log(val + 1) / Math.log(max + 1);
}

function deathAndInjury2Severity(deathNum, injuryNum) {
	return deathNum * 3 + injuryNum * 1;
}
