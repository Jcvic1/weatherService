import axios from 'axios';
import getWeatherData from '../../utils/yrWeatherApi';

jest.mock('axios');

describe('getWeatherData', () => {
  it('fetches weather data successfully', async () => {
    const mockResponse = {
      data: {
        properties: {
          timeseries: [
            {
              time: "2024-05-09T14:00:00Z",
              data: {
                instant: {
                  details: {
                    air_temperature: 20.5
                  }
                }
              }
            }
          ]
        }
      }
    };

    axios.get.mockResolvedValue(mockResponse);

    const result = await getWeatherData(37.6155, 55.7522);

    expect(result).toEqual({ message: 'success', result: [{ date: "2024-05-09T14:00:00Z", temperature: 20.5 }] });
    expect(axios.get).toHaveBeenCalledWith(
      'https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=55.7522&lon=37.6155',
      expect.objectContaining({
        headers: {
          'User-Agent': 'https://github.com/Jcvic1/weatherService',
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
    );
  });

  it('handles errors from the API', async () => {
    const errorMessage = 'Network Error';
    axios.get.mockRejectedValue(new Error(errorMessage));

    const result = await getWeatherData(37.6155, 55.7522);

    expect(result).toEqual({ message: 'error', result: errorMessage });
  });
});