import { parseData } from '$lib/server/parse-data';
import _ from 'lodash';

let cachedCountyData;

/*
 * compute county, town, village names from data
 */
export async function computeCountyData() {
	if (cachedCountyData) return cachedCountyData;

	const data = await parseData();
	cachedCountyData = _(data)
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

	return cachedCountyData;
}
