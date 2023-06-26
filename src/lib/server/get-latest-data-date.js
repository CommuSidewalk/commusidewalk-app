import { parseData } from './parse-data';

export async function getLatestDataDate() {
	const data = await parseData();
	return data[data.length - 1].createdAt.toLocaleDateString('zh-TW');
}
