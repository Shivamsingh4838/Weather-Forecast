console.log("hello bhai");
const API_KEY = "c00fa2cd9c4754322be713d873c030f8";

function renderWeatherInfo(data) {
    let newPara = document.createElement('p');
    newPara.textContent = `${data?.main?.temp.toFixed(2)} °C`;
    document.body.appendChild(newPara);
}

async function fetchWeatherDetail() {
    try {
        let city = "goa";
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();

        console.log("weather data:->", data);
        renderWeatherInfo(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

async function getCustomWeatherDetails(latitude, longitude) {
    try {
        const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
        const data = await result.json();

        console.log(data);
        
    } catch (error) {
        console.error("Error fetching custom weather data:", error);
    }
}

function switchTab(clickedTab) {
    apiErrorContainer.classList.remove("active");

    if (clickedTab !== currentTab) {
        currentTab.classList.remove("current-tab");
        currentTab = clickedTab;
        currentTab.classList.add("current-tab");

        if (!searchForm.classList.contains("active")) {
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        } else {
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            getFromSessionStorage();
        }
    }
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("No geoLocation Support");
    }
}

function showPosition(position) {
    let lat = position.coords.latitude;
    let longi = position.coords.longitude;
    console.log(lat);
    console.log(longi);

    // Fetch weather details for the current location
    getCustomWeatherDetails(lat, longi);
}

// Call the functions to show weather
fetchWeatherDetail();  // Fetch weather for the city
getLocation();  // Fetch weather for the user's current location
