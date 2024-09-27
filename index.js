// Fetch and display the background image and photographer's name
fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(res => res.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.regular})`
        document.getElementById("author").textContent = `By: ${data.user.name}`
    })
    .catch(err => {
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d)`
        document.getElementById("author").textContent = `By: Dodi Achmad`
    });

// Array of cryptocurrencies to display
const cryptoArray = ['dogecoin', 'bitcoin', 'ethereum'];
const cryptoContainer = document.getElementById("crypto-top");

// Loop through each crypto in the array and fetch its data
cryptoArray.forEach(crypto => {
    fetch(`https://api.coingecko.com/api/v3/coins/${crypto}`)
        .then(res => {
            if (!res.ok) {
                throw Error("Something went wrong");
            }
            return res.json();
        })
        .then(data => {
            // Create a new div for each crypto and append it to the container
            const cryptoDiv = document.createElement('div');
            cryptoDiv.classList.add('crypto-div');
            cryptoDiv.innerHTML = `
                <img src=${data.image.small} />
                <span>${data.name}</span>
                <p>Current Price: R ${data.market_data.current_price.zar}</p>
                <p><span style="color: #26bba4;">▲</span>: R ${data.market_data.high_24h.zar}</p>
                <p><span style="color: #ff6b6b;">▼</span>: R ${data.market_data.low_24h.zar}</p>
            `;
            cryptoContainer.appendChild(cryptoDiv);
        })
        .catch(err => console.error(err));
});

// Display the current time and update every second
function getCurrentTime() {
    const date = new Date();
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", { timeStyle: "short" });
}
setInterval(getCurrentTime, 1000);

// Fetch and display weather data based on the user's location
// Function to get location using onboard sensors and fallback to IP address
function getLocation() {
    // Try to get location using geolocation API
    navigator.geolocation.getCurrentPosition(
        position => {
            // If successful, retrieve latitude and longitude
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherData(lat, lon); // Fetch weather data using the obtained coordinates
        },
        error => {
            // If geolocation fails, log the error and use IP-based geolocation
            console.error("Geolocation error:", error);
            console.log("Attempting to retrieve location using IP address...");

            // Fetch location data using IP address
            fetch('https://ipapi.co/json/')
                .then(res => res.json())
                .then(data => {
                    const lat = data.latitude; // Get latitude from IP API response
                    const lon = data.longitude; // Get longitude from IP API response
                    fetchWeatherData(lat, lon); // Fetch weather data using the obtained coordinates
                })
                .catch(err => {
                    console.error("Error fetching IP-based location data:", err);
                    document.getElementById("weather").innerHTML = `
                        <p>Unable to retrieve location data</p>
                    `;
                });
        }
    );
}

// Function to fetch weather data using Scrimba's OpenWeather API based on latitude and longitude
function fetchWeatherData(lat, lon) {
    // Fetch weather data from Scrimba's OpenWeather API using the given coordinates
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available");
            }
            return res.json();
        })
        .then(data => {
            // Extract weather details from the API response
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            const temp = Math.round(data.main.temp);
            const city = data.name;

            // Display weather information
            document.getElementById("weather").innerHTML = `
                <img src="${iconUrl}" />
                <p class="weather-temp">${temp}ºc</p>
                <p class="weather-city">${city}</p>
            `;
        })
        .catch(err => console.error(err));
});

// Fetch and display the latest developer news
        .catch(err => {
            console.error("Error fetching weather data:", err);
            document.getElementById("weather").innerHTML = `
                <p>Unable to retrieve weather data</p>
            `;
    .then(res => res.json())
    .then(data => {
        let newsHtml = '<h2>Developer News</h2>';
        data.articles.slice(0, 5).forEach(article => {
            newsHtml += `
                <div>
                    <a href="${article.url}" target="_blank">${article.title}</a>
                    <p>${article.description}</p>
                </div>
            `;
        });
        document.getElementById("news-feed").innerHTML = newsHtml;
    })
    .catch(err => console.error(err));
