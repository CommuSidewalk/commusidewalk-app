import fetch from "node-fetch";
import Papa from "papaparse";

let cachedData;

async function parse() {
  const response = await fetch(
    "https://commusidewalk-app.vercel.app/data/data.csv",
  );
  const csv = await response.text();
  const results = Papa.parse(csv, {
    skipEmptyLines: true,
    header: true,
  });
  cachedData = results.data.map((item) => {
    return {
      ...item,
      rankA1: parseFloat(item.rankA1),
      rankB1: parseFloat(item.rankB1),
      rankC1: parseFloat(item.rankC1),
      dataTime: new Date(item.dataTime),
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt),
    };
  });
  return cachedData;
}

// read csv file and convert to js object
export async function parseData() {
  return new Promise(async (resolve, reject) => {
    if (cachedData) {
      return resolve(cachedData);
    }
    try {
      const data = parse();
      cachedData = data;
      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
}
