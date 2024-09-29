// Fetch and display the background image and photographer's name
async function fetchBackgroundImage() {
    try {
        const res = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=space");
        const data = await res.json();
        document.body.style.backgroundImage = `url(${data.urls.regular})`;
        document.getElementById("author").textContent = `Photo by ${data.user.name}`;
    } catch (err) {
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d)`;
        document.getElementById("author").textContent = `Photo by Dodi Achmad`;
    }
}
fetchBackgroundImage();

// Array of cryptocurrencies to display
const cryptoArray = ['dogecoin', 'bitcoin', 'ethereum'];
const cryptoContainer = document.getElementById("crypto-top");

// Loop through each crypto in the array and fetch its data
async function fetchCryptoData(crypto) {
    try {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${crypto}`);
        if (!res.ok) {
            throw Error("Something went wrong");
        }
        const data = await res.json();

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
    } catch (err) {
        console.error(err);
    }
}

cryptoArray.forEach(crypto => fetchCryptoData(crypto));

// Display the current time and update every second
function getCurrentTime() {
    const date = new Date();
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", { timeStyle: "short" });
}
setInterval(getCurrentTime, 1000);

// Fetch and display weather data based on the user's location
async function fetchWeatherData(lat, lon) {
    try {
        const res = await fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`);
        if (!res.ok) {
            throw Error("Weather data not available");
        }
        const data = await res.json();

        const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        const temp = Math.round(data.main.temp);
        const city = data.name;

        document.getElementById("weather").innerHTML = `
            <img src="${iconUrl}" />
            <p class="weather-temp">${temp}ºc</p>
            <p class="weather-city">${city}</p>
        `;
    } catch (err) {
        console.error("Error fetching weather data:", err);
        document.getElementById("weather").innerHTML = `
            <p>Unable to retrieve weather data</p>
        `;
    }
}

function getLocation() {
    navigator.geolocation.getCurrentPosition(
        position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherData(lat, lon);
        },
        async error => {
            console.error("Geolocation error:", error);
            console.log("Attempting to retrieve location using IP address...");
            try {
                const res = await fetch('https://ipapi.co/json/');
                const data = await res.json();
                const lat = data.latitude;
                const lon = data.longitude;
                fetchWeatherData(lat, lon);
            } catch (err) {
                console.error("Error fetching IP-based location data:", err);
                document.getElementById("weather").innerHTML = `
                    <p>Unable to retrieve location data</p>
                `;
            }
        }
    );
}
getLocation();

// Fetch and display the latest tech news
async function fetchNews() {
    try {
        const res = await fetch("https://saurav.tech/NewsAPI/top-headlines/category/technology/us.json");
        const data = await res.json();

        let newsHtml = '<h2>Tech News</h2>';
        const articlesNum = 10;  // number of articles to display
        data.articles.slice(0, articlesNum).forEach(article => {
            newsHtml += `
                <div>
                    <a href="${article.url}" target="_blank">${article.title}</a>
                    <p>${article.description}</p>
                </div>
            `;
        });
        document.getElementById("news-feed").innerHTML = newsHtml;
    } catch (err) {
        console.error(err);
    }
}
fetchNews();
