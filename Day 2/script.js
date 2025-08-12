document.getElementById("getWeather").addEventListener("click", async () => {
    const city = document.getElementById("cityInput").value;
    const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found");
        
        const data = await response.json();
        const temp = data.main.temp;
        const weather = data.weather[0].description;

        document.getElementById("weatherResult").innerHTML =
            `🌡 Temperature in ${city}: ${temp}°C <br> 🌥 Condition: ${weather}`;
    } catch (error) {
        document.getElementById("weatherResult").innerHTML = "❌ Error: " + error.message;
    }
});