import axios from "axios";
import express from "express";

import type { City } from "../models/city";
import type { ErrorResponse } from "../models/errorResponse";
import type { Weather } from "../models/weather";

import { Cache } from '../utils/cache'

export const routes = express.Router();

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const CITY_API_KEY = process.env.CITY_API_KEY;

const WTFGEO_BASE = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities";
const WEATHER_BASE = "http://api.openweathermap.org/data/2.5/weather";


/**
 * Get weather data
 * Not applying semi-cache here because weather changes more frequently
 */
routes.get("/weather", async (req, res) => {
    const { city, lat, lon, units = 'metric' } = req.query;

    try {
        const queryParams = city ? `q=${city}` : `lat=${lat}&lon=${lon}`;

        if (!city && (!lat || !lon)) {
            res.status(400).json({ error: "[🌧️] Please provide a city or lat/lon coordinates." });
        }

        const weatherResponse = await axios.get<Weather>(
            `${WEATHER_BASE}?${queryParams}&appid=${WEATHER_API_KEY}&units=${units}`
        );

        res.json(weatherResponse.data);
    } catch (error) {
        const err: ErrorResponse = { error: "[🌪️] Error fetching OpenWeatherMap data." }
        if (axios.isAxiosError(error)) err['message'] = error.message
        res.status(500).json(error);
    }
});

/**
 * Get city data via params
 * https://rapidapi.com/wirefreethought/api/geodb-cities/playground/5978313be4b06b85e4b0da1e
 */
routes.get("/cities", async (req, res) => {
    const { query } = req.query;
    const cacheKey = `city:${query}`

    try {
        let city = Cache.get<City>(cacheKey)

        if (!city) {
            const cityResponse = await axios.get(WTFGEO_BASE, {
                params: { namePrefix: query },
                headers: {
                    "X-RapidAPI-Key": CITY_API_KEY,
                    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
                },
            });
            city = Cache.set<City>(cacheKey, cityResponse.data.data)
        }

        res.json(city);
    } catch (error) {
        const err: ErrorResponse = { error: "[🗺️] Error fetching city data" };
        if (axios.isAxiosError(error)) err['message'] = error.message
        res.status(500).json(error);
    }
});


/**
 * [Cache] Fetch or Delete
 */
routes.get("/cache", (_, res) => {
    try {
        res.json(Cache.data)
    } catch (error) {
        res.status(500).json({ error: "[🔄] Error fetching cache" });
    }
})
routes.delete("/cache", (_, res) => {
    try {
        Cache.purge()
        res.json({ message: '[🗑️] Cache Purged' })
    } catch (error) {
        res.status(500).json({ error: "[🗑️] Error purging cache" });
    }
})

