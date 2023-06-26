/**
 * @param {Date | null} date
 * @returns {string | null}
 */
export function date2ISOString(date) {
	if (date) {
		return date.toISOString().substring(0, 10);
	} else {
		return '';
	}
}

/**
 * @param {string} str
 * @returns {Date | null}
 */
export function ISODateString2Date(str) {
	const date = new Date(str);
	if (date.toString() === 'Invalid Date') {
		return null;
	} else {
		return date;
	}
}

/**
 * @param {any} date
 */
function isValidDate(date) {
	return new Date(date).toString() !== 'Invalid Date';
}

/**
 * @param {any} str
 * @returns {boolean}
 */
export function isValidISODateString(str) {
	const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
	return isoDateRegex.test(str);
}
