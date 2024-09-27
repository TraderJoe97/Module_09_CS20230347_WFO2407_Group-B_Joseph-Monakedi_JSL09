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
                <p>🎯: $${data.market_data.current_price.usd}</p>
                <p>👆: $${data.market_data.high_24h.usd}</p>
                <p>👇: $${data.market_data.low_24h.usd}</p>
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
navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available");
            }
            return res.json();
        })
        .then(data => {
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            document.getElementById("weather").innerHTML = `
                <img src=${iconUrl} />
                <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                <p class="weather-city">${data.name}</p>
            `;
        })
        .catch(err => console.error(err));
});

// Fetch and display the latest developer news
fetch("https://saurav.tech/NewsAPI/top-headlines/category/technology/us.json")
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
