import axios from 'axios';

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
     console.log(country)
    let changeableUrl = url;
    if (country) {
        changeableUrl = `${url}/countries/${country}`
    }
    console.log(changeableUrl);
    try {
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableUrl);
        const modifiedData = { confirmed, recovered, deaths, lastUpdate };
        return modifiedData;
    } catch (error) {

    }
}


export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);
        const modifiedData = data.slice(Math.max(data.length - 30, 0)).map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate
        }));
        return modifiedData;

    } catch (error) {

    }
}


export const fetchCountries = async () => {
    try {
        const { data: { countries } } = await axios.get(`${url}/countries`);
        return countries.map(country => country.name);
    } catch (error) {

    }
}