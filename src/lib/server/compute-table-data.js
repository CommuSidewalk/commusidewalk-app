import _ from 'lodash';

/**
 * @param {import('$lib/types').SidewalkPoint[]} data - sidewalk points.
 * @param {number} intervalDays - defines the gap interval between groups.
 */
export async function computeTableData(data, intervalDays) {
	if (data.length < 2) {
		return [];
	}
	const startDate = data[0].createdAt;
	const endDate = data[data.length - 1].createdAt;
	const ranges = divideDateRange(startDate, endDate, intervalDays);
	const groups = groupDataByDateRange(data, ranges);
	groups.forEach((group) => {
		group.meanA1 = calMean(group.data, 'rankA1');
		group.meanA1Value = group.meanA1.toFixed(2); // copy meanA1 for displaying value instead of progress bar
		delete group.data;
	});
	return groups;
}

function divideDateRange(start, end, intervalDays) {
	const ranges = [];
	let current = new Date(start);
	let stop = new Date(end);
	current.setHours(0, 0, 0, 0);
	stop.setHours(0, 0, 0, 0);

	while (current <= stop) {
		const rangeEnd = new Date(current);
		rangeEnd.setDate(rangeEnd.getDate() + intervalDays - 1);
		if (rangeEnd > stop) {
			rangeEnd.setDate(stop.getDate());
		}
		ranges.push({
			start: new Date(current),
			end: rangeEnd
		});
		current.setDate(current.getDate() + intervalDays);
	}

	return ranges;
}

function groupDataByDateRange(data, ranges) {
	const groups = [];

	for (const range of ranges) {
		const group = {
			start: range.start,
			end: range.end,
			data: []
		};
		for (const item of data) {
			const itemDate = new Date(item.createdAt);
			itemDate.setHours(0, 0, 0, 0); // truncate time to midnight
			if (itemDate >= range.start && itemDate <= range.end) {
				group.data.push(item);
			}
		}
		groups.push(group);
	}

	return groups;
}

function groupsDateToString(groups) {
	groups.forEach((group) => {
		group.start = group.start.toISOString().slice(0, 10);
		group.end = group.end.toISOString().slice(0, 10);
	});
}

function calMean(arr, prop) {
	const values = _.map(arr, prop);
	return _.mean(values);
}
