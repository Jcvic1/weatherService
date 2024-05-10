import { Router } from 'express';

import validateCoordinates from '../validation/coordinates.js'
import getWeatherData from '../utils/yrWeatherApi.js';

const router = Router();

router.get('/', async (req, res) => {
    if (Object.keys(req.query).length !== 0) {
        const coordinates = { lat: parseFloat(req.query.lat), long: parseFloat(req.query.long) };
        const { error } = validateCoordinates(coordinates);
        if (error) return res.status(400).send(error.details[0].message);
    }

    const { message, result } = await getWeatherData(req.query.long, req.query.lat);
    if (message === "error") return res.status(400).send(result);
    res.send(result);
});

export default router; 