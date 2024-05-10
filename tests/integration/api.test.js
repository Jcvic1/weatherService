import axios from 'axios';
import request from 'supertest';
import express from 'express';
import routes from '../../startup/routes.js';
const app = express();

routes(app);


jest.mock('axios');

describe('Integration Tests', () => {
  it('should fetch weather data successfully', async () => {
    const mockResponse = {
      data: {
        properties: {
          timeseries: [
            {
              time: '2024-05-09T14:00:00Z',
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

    const res = await request(app)
      .get('/api/weather')
      .query({ lat: 55.7522, long: 37.6155 });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([{ date: '2024-05-09T14:00:00Z', temperature: 20.5 }]);
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

  it('should handle errors from the API', async () => {
    const errorMessage = 'Network Error';
    axios.get.mockRejectedValue(new Error(errorMessage));

    const res = await request(app)
      .get('/api/weather')
      .query({ lat: 55.7522, long: 37.6155 });

    expect(res.statusCode).toBe(400);
  });
});
