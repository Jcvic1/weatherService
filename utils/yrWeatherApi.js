import axios from 'axios';

const USER_AGENT = 'https://github.com/Jcvic1/weatherService';
const { get } = axios;

const getWeatherData = async (long = 55.7522, lat = 37.6155) => {
    try {
        const response = await get(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${long}`, {
            headers: {
                'User-Agent': USER_AGENT,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });

        const weatherData = response.data.properties.timeseries.filter(entry => {
            const date = entry.time.split('T')[1].split(":")[0];
            return parseInt(date, 10) === 14;
        });

        const temperaturesByDay = weatherData.map(entry => {
            return {
                date: entry.time,
                temperature: entry.data.instant.details.air_temperature
            };
        });

        return { message: "success", result: temperaturesByDay };
    } catch (error) {
        return { message: "error", result: error.message };
    };
};

export default getWeatherData;