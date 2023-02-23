import { parseData } from '$lib/utils/csv';
import _ from 'lodash';

let countyData;

export async function getCountyData() {
	if (countyData) return countyData;

	const L = await import('leaflet');
	const data = await parseData();
	countyData = _(data)
		.uniqBy('countyName')
		.map((c) => {
			return {
				name: c.countyName,
				layer: L.layerGroup(),
				towns: _(data)
					.filter({ countyName: c.countyName })
					.uniqBy('townName')
					.map((t) => {
						return {
							name: t.townName,
							layer: L.layerGroup(),
							villages: _(data)
								.filter({ countyName: c.countyName, townName: t.townName })
								.uniqBy('villName')
								.map((v) => {
									return {
										name: v.villName,
										layer: L.layerGroup()
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
