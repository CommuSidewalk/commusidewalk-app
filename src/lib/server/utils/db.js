import postgres from 'postgres';
import { DB_URL } from '$env/static/private';

const sql = postgres(DB_URL, { ssl: 'require' });

export default sql;
