const express = require('express');

const router = express.Router();

const { getWeather } = require('../services/clima.service');

// Página principal
router.get('/', (req, res) => {

    res.render('index', {
        weather: null,
        error: null
    });
});

// Consultar clima
router.post('/weather', async (req, res) => {

    const { city } = req.body;

    // Validar ciudad
    if (!city || city.trim() === '') {

        return res.render('index', {
            weather: null,
            error: 'Debes ingresar una localidad.'
        });
    }

    try {

        const weather = await getWeather(city);

        res.render('index', {
            weather,
            error: null
        });

    } catch (error) {

        res.render('index', {
            weather: null,
            error: error.message
        });
    }
});

module.exports = router;