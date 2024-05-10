import request from 'supertest';
import express from 'express';
import getWeatherData from '../../utils/yrWeatherApi.js';
import validateCoordinates from '../../validation/coordinates.js';
import routes from '../../startup/routes.js';

const app = express();
jest.mock('../../validation/coordinates.js');
jest.mock('../../utils/yrWeatherApi.js');

routes(app);

describe('Weather Route', () => {
  let mockGetWeatherData;

  beforeEach(() => {
    mockGetWeatherData = jest.fn();
    getWeatherData.mockImplementation(mockGetWeatherData);
  });

  it('should return 400 if getWeatherData returns an error', async () => {
    validateCoordinates.mockReturnValue({ error: false });
    mockGetWeatherData.mockResolvedValueOnce({ message: 'error', result: 'test error' });
    const res = await request(app).get('/api/weather?lat=55.751244&long=37.618423');
    expect(res.statusCode).toBe(400);
    expect(mockGetWeatherData).toHaveBeenCalledWith(expect.any(String), expect.any(String));
  });

  it('should return weather data if getWeatherData succeeds', async () => {
    validateCoordinates.mockReturnValue({ error: false });
    mockGetWeatherData.mockResolvedValueOnce({ message: '', result: 'test result' });
    const res = await request(app).get('/api/weather?lat=55.751244&long=37.618423');
    expect(res.statusCode).toBe(200);
    expect(mockGetWeatherData).toHaveBeenCalledWith(expect.any(String), expect.any(String));
    expect(res.text).toBe('test result');
  });

});
