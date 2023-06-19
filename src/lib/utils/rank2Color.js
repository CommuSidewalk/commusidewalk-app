/**
 * @param {number} rank - rankA1 score.
 * @return {string} color - hex color.
 */
export function rank2Color(rank) {
	const turboColors = [
		'#228B22',
		'#2DC42B',
		'#66D83C',
		'#A5E34C',
		'#D7E852',
		'#FFF95D',
		'#FFD43B',
		'#FFA41C',
		'#FF661D',
		'#FF2B1F',
		'#D3022F'
	];

	const index = Math.round(10 - rank);
	return turboColors[index];
}
