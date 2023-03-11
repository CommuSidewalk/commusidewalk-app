import _ from 'lodash';

export function filterDateRange(data, start = null, last = null) {
	if (start === null && last === null) {
		return _.clone(data);
	}

	const filtered = _.filter(data, (item) => {
		const date = item.createdAt;
		return (!start || date >= start) && (!last || date <= last);
	});
	return _.clone(filtered);
}

// AD = Administrative division
export function filterByAD(data, constraintAD = null) {
	if (constraintAD === null) {
		return _.clone(data);
	}
	const cAD = constraintAD;
	const filtered = _.filter(data, (item) => {
		const county = item.countyName;
		const town = item.townName;
		const vill = item.villName;

		let valid = true;
		valid = valid && (cAD.county === null || county === cAD.county);
		valid = valid && (cAD.town === null || town === cAD.town);
		valid = valid && (cAD.vill === null || vill === cAD.vill);

		return valid;
	});
	return _.clone(filtered);
}

export function filterData(data, config) {
	const { startDate: start, endDate: end } = config;
	let startDate;
	let endDate;

	// guard date
	function isValidDate(d) {
		return d instanceof Date && !isNaN(d);
	}
	startDate = new Date(start);
	if (!isValidDate(startDate)) {
		startDate = null;
	}
	endDate = new Date(end);
	if (!isValidDate(endDate)) {
		endDate = null;
	}
	const { constraintAD } = config;

	let filtered;
	filtered = filterByAD(data, constraintAD);
	filtered = filterDateRange(filtered, startDate, endDate);

	return filtered;
}
