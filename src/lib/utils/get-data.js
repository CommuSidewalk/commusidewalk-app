import { browser } from "$app/environment";

let data;
let countyData;

export async function getData(fetch) {
  if (data) {
    return { data };
  }

  try {
    const response = await fetch("/api/data");
    const json = await response.json();
    if (response.status === 200) {
      data = json.data.map((item) => {
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
      return { data };
    } else {
      return { error: json.error };
    }
  } catch (error) {
    return { error };
  }
}

export async function getCountyData(fetch) {
  if (countyData) {
    return { data: countyData };
  }

  try {
    const response = await fetch("/api/county-data");
    const json = await response.json();
    if (response.status === 200) {
      countyData = json.data;
      return { data: countyData };
    } else {
      return { error: json.error };
    }
  } catch (error) {
    return { error };
  }
}
