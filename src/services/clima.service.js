// const API_KEY = process.env.API_KEY;

// const getWeather = async (city) => {

//     const url = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`;

//     const response = await fetch(url);

//     if (!response.ok) {
//         throw new Error('Error al consultar la API');
//     }

//     const data = await response.json();

//     if (data.error) {
//         throw new Error('Localidad no encontrada');
//     }

//     return {
//         city: data.location.name,
//         country: data.location.country,
//         temperature: data.current.temperature,
//         description: data.current.weather_descriptions[0],
//         humidity: data.current.humidity,
//         windSpeed: data.current.wind_speed,
//         icon: data.current.weather_icons[0]
//     };
// };

// module.exports = {
//     getWeather
// };

const API_KEY = process.env.API_KEY;

const getWeather = async (city) => {

    // Codificar ciudad
    const query = encodeURIComponent(city);

    // IMPORTANTE:
    // En el plan free Weatherstack usa HTTP
    const url = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${query}`;

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Error al consultar el servicio');
        }

        const data = await response.json();

        console.log(data);

        // Validar errores de la API
        if (data.success === false || data.error) {

            throw new Error(
                data.error?.info || 'Localidad no encontrada'
            );
        }

        // Validar estructura
        if (!data.location || !data.current) {
            throw new Error('No se encontraron datos climáticos');
        }

        return {
            city: data.location.name,
            country: data.location.country,
            temperature: data.current.temperature,
            description: data.current.weather_descriptions[0],
            humidity: data.current.humidity,
            windSpeed: data.current.wind_speed,
            icon: data.current.weather_icons[0]
        };

    } catch (error) {

        console.error('ERROR WEATHERSTACK:', error.message);

        throw error;
    }
};

module.exports = {
    getWeather
};