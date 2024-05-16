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

        const timeData = response.data.properties.timeseries;


        const exactDate = timeData.filter(entry => {
            const date = new Date(entry.time);
            return date.getUTCHours() === 14;
        });
        const temperaturesByDay = exactDate.map(entry => {
            return {
                date: entry.time,
                temperature: entry.data.instant.details.air_temperature
            };
        });

        const interpolateArrayData = timeData.filter(entry => {
            const date = new Date(entry.time);
            if ((entry.time > exactDate[exactDate.length - 1].time) && (date.getUTCHours() === 12 || date.getUTCHours() === 18)) {

                return entry;
            }
        });

        for (let i = 1; i < interpolateArrayData.length - 1; i++) {
            const prev = interpolateArrayData[i];
            const next = interpolateArrayData[i + 1];
            const prevHour = new Date(prev.time).getUTCHours();
            const prevTemp = prev.data.instant.details.air_temperature;
            const nextHour = new Date(next.time).getUTCHours();
            const nextTemp = next.data.instant.details.air_temperature;

            const dateTime = new Date(prev.time);
            dateTime.setUTCHours(dateTime.getUTCHours() + 2);

            const temp14 = prevTemp + (nextTemp - prevTemp) * (14 - prevHour) / (nextHour - prevHour)

            temperaturesByDay.push({
                date: dateTime.toISOString().slice(0, 19) + 'Z',
                temperature: parseFloat(temp14.toFixed(1))
            })

            i++;

        }

        return { message: "success", result: temperaturesByDay };
    } catch (error) {
        return { message: "error", result: error.message };
    };
};

export default getWeatherData;