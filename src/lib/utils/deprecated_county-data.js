import { parseData } from '$lib/utils/csv';
import _ from 'lodash';

// cache
let countyData;

export async function computeCountyData() {
	if (countyData) return countyData;

	const data = await parseData();
	countyData = _(data)
		.uniqBy('countyName')
		.map((c) => {
			return {
				name: c.countyName,
				towns: _(data)
					.filter({ countyName: c.countyName })
					.uniqBy('townName')
					.map((t) => {
						return {
							name: t.townName,
							villages: _(data)
								.filter({ countyName: c.countyName, townName: t.townName })
								.uniqBy('villName')
								.map((v) => {
									return {
										name: v.villName
									};
								})
								.sortBy('name')
								.value()
						};
					})
					.sortBy('name')
					.value()
			};
		})
		.sortBy('name')
		.value();

	return countyData;
}
