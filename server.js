require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

const weatherUrl = (cityName) => (
`http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${cityName}&days=1&aqi=no&alerts=no`
);

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/yehor_kardash/:city_name', async (req, res) => {
  const url = weatherUrl(req.params.city_name);
  console.log(url);
  const weather = await fetch(url);
  const json = await weather.json();
  const response = {
    city: json.location.name,
    lat: json.location.lat,
    lon: json.location.lon,
    temperature: json.current.temp_c,
    student: 'Кардаш Єгор ІС-12'
  }
  res.json(response);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})