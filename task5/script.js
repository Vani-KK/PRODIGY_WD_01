const apiKey = '021e0c2a9428e58a7d38bfde96141e43'; // Replace with your OpenWeatherMap API key

function getWeatherByCity() {
  const city = document.getElementById('cityInput').value;
  if (city.trim() === '') {
    alert('Please enter a city name.');
    return;
  }
  fetchWeather(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
}

function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      fetchWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`);
    }, () => {
      alert('Unable to retrieve your location.');
    });
  } else {
    alert('Geolocation is not supported by your browser.');
  }
}

function fetchWeather(url) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Weather data not found.');
      }
      return response.json();
    })
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      document.getElementById('weatherDisplay').innerHTML = `<p>${error.message}</p>`;
    });
}

function displayWeather(data) {
  const weatherHtml = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
    <p><strong>Weather:</strong> ${data.weather[0].main}</p>
    <p><strong>Description:</strong> ${data.weather[0].description}</p>
    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
    <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
  `;
  document.getElementById('weatherDisplay').innerHTML = weatherHtml;
}
