let locationTimezone = document.querySelector(".location");
let img = document.querySelector(".image");
let temperatureDescription = document.querySelector(".description");
let temperatureDegree = document.querySelector(".temperature");
let maxTemperature = document.querySelector(".max_temp");
let minTemperature = document.querySelector(".min_temp");
let windSpeed = document.querySelector(".windspeed");
var lat;
var long;
 
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async position => {
        long = position.coords.longitude;
        lat = position.coords.latitude;
        const data = await getWeatherdata(lat, long);
 
 
        // Map related Code
        var map = L.map('map').setView([20.9716, 80.5946], 5);
 
        L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=OdpemAaV0raJvYO6cUSS', {
            attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        }).addTo(map);
 
        var marker = L.marker([lat, long]).addTo(map);
        marker.bindPopup(data.name).openPopup();
 
 
        map.on('click', async function(e) {
            console.log("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
 
        const data = await getWeatherdata(e.latlng.lat, e.latlng.lng);
 
            marker.setLatLng([e.latlng.lat, e.latlng.lng]);
            marker.bindPopup(data.name).openPopup();
        });
 
 
    })
}
 
 
async function getWeatherdata(lat,long) {
        const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=ddfaba4398b491fa4ef3e29a5e934c6e`;
 
        let response = await fetch(api);
        let data = await response.json();
 
        weatherDataHandler(data);
        return data;
}
 
function weatherDataHandler(data) {
    const { temp } = data.main;
    const { description } = data.weather[0];
    const { temp_max } = data.main;
    const { temp_min } = data.main;
    const { speed } = data.wind;
 
    temperatureDegree.textContent = temp + '\xB0' + ' C';
    temperatureDescription.textContent = description;
    locationTimezone.textContent = data.name;
    maxTemperature.textContent = 'Max: ' + temp_max + '\xB0' + ' C';
    minTemperature.textContent = 'Min: ' + temp_min + '\xB0' + ' C';
    windSpeed.textContent = 'Wind Speed: ' + speed + ' m/s';
 
}