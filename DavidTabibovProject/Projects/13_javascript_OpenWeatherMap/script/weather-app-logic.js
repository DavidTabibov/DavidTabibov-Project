class WeatherApp {
    constructor() {
        // המפתח API שלך
        this.API_KEY = 'ef6546b64fc2ef21548880f9529d2979';
        this.BASE_URL = 'https://api.openweathermap.org/data/2.5';

        // DOM Elements
        this.searchInput = document.getElementById('searchInput');
        this.searchButton = document.getElementById('searchButton');
        this.cityName = document.getElementById('cityName');
        this.date = document.getElementById('date');
        this.temperature = document.getElementById('temperature');
        this.weatherIcon = document.getElementById('weatherIcon');
        this.description = document.getElementById('description');
        this.humidity = document.getElementById('humidity');
        this.wind = document.getElementById('wind');
        this.feelsLike = document.getElementById('feelsLike');
        this.loader = document.getElementById('loader');
        this.error = document.getElementById('error');
        this.forecastContainer = document.getElementById('forecast');
        this.weatherContainer = document.querySelector('.weather-info');

        this.bindEvents();
    }

    bindEvents() {
        this.searchButton.addEventListener('click', () => {
            const city = this.searchInput.value.trim();
            if (city) {
                this.getWeatherData(city);
                this.getFiveDayForecast(city);
            }
        });

        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const city = this.searchInput.value.trim();
                if (city) {
                    this.getWeatherData(city);
                    this.getFiveDayForecast(city);
                }
            }
        });
    }

    showLoader() {
        if (this.loader) this.loader.style.display = 'flex';
    }

    hideLoader() {
        if (this.loader) this.loader.style.display = 'none';
    }

    showError(message) {
        if (this.error) {
            this.error.textContent = message;
            this.error.style.display = 'block';
        }
    }

    hideWeatherInfo() {
        if (this.weatherContainer) this.weatherContainer.style.display = 'none';
        if (this.forecastContainer) this.forecastContainer.style.display = 'none';
    }

    showWeatherInfo() {
        if (this.weatherContainer) this.weatherContainer.style.display = 'block';
        if (this.forecastContainer) this.forecastContainer.style.display = 'flex';
    }

    async getWeatherData(city) {
        try {
            this.showLoader();
            this.hideWeatherInfo(); // הסתרת המידע הקודם כדי להציג רק מידע תקין חדש

            const url = `${this.BASE_URL}/weather?q=${city}&appid=${this.API_KEY}&units=metric&lang=he`;
            console.log('Fetching URL:', url); // לבדיקה

            const response = await fetch(url);
            const data = await response.json();

            if (response.ok) {
                console.log('Weather data:', data); // לבדיקה
                this.updateWeatherUI(data);
                this.showWeatherInfo(); // הצגת מידע מזג האוויר לאחר קבלת נתונים תקינים
                this.error.style.display = 'none'; // הסתרת הודעת השגיאה לאחר קבלת נתונים תקינים
            } else {
                this.hideWeatherInfo(); // הסתרת מידע קודם אם יש שגיאה
                throw new Error(data.message || 'אירעה שגיאה בקבלת נתוני מזג האוויר');
            }
        } catch (error) {
            console.error('Error fetching weather:', error);
            this.showError('העיר שהזנת אינה קיימת או שגויה. אנא נסה שוב.');
        } finally {
            this.hideLoader();
        }
    }

    async getFiveDayForecast(city) {
        try {
            this.showLoader();
            this.hideWeatherInfo(); // הסתרת המידע הקודם כדי להציג רק מידע תקין חדש

            const url = `${this.BASE_URL}/forecast?q=${city}&appid=${this.API_KEY}&units=metric&lang=he`;
            console.log('Fetching 5-day forecast URL:', url); // לבדיקה

            const response = await fetch(url);
            const data = await response.json();

            if (response.ok) {
                console.log('5-day Forecast data:', data); // לבדיקה
                this.updateForecastUI(data);
                this.showWeatherInfo(); // הצגת מידע התחזית לאחר קבלת נתונים תקינים
                this.error.style.display = 'none'; // הסתרת הודעת השגיאה לאחר קבלת נתונים תקינים
            } else {
                this.hideWeatherInfo(); // הסתרת מידע קודם אם יש שגיאה
                throw new Error(data.message || 'אירעה שגיאה בקבלת תחזית מזג האוויר');
            }
        } catch (error) {
            console.error('Error fetching forecast:', error);
            this.showError('העיר שהזנת אינה קיימת או שגויה. אנא נסה שוב.');
        } finally {
            this.hideLoader();
        }
    }

    updateWeatherUI(data) {
        if (this.cityName) this.cityName.textContent = data.name;
        if (this.date) this.date.textContent = new Date().toLocaleDateString('he-IL');
        if (this.temperature) this.temperature.textContent = Math.round(data.main.temp) + '°C';
        if (this.weatherIcon) {
            this.weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            this.weatherIcon.alt = data.weather[0].description;
        }
        if (this.description) this.description.textContent = data.weather[0].description;
        if (this.humidity) this.humidity.textContent = `${data.main.humidity}%`;
        if (this.wind) this.wind.textContent = `${Math.round(data.wind.speed * 3.6)} קמ"ש`;
        if (this.feelsLike) this.feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
    }

    updateForecastUI(data) {
        this.forecastContainer.innerHTML = '';
        const forecastDays = {};

        // סינון התחזיות כדי לבחור את השעה של 12 בצהריים לכל יום (אם קיימת תחזית כזו)
        data.list.forEach(item => {
            const date = item.dt_txt.split(' ')[0];
            const hour = item.dt_txt.split(' ')[1].split(':')[0];
            if (!forecastDays[date] && hour === '12') {
                forecastDays[date] = item;
            }
        });

        // אם אין תחזית ל-12 בצהריים עבור כל יום, בוחרים את התחזית הראשונה של אותו יום
        data.list.forEach(item => {
            const date = item.dt_txt.split(' ')[0];
            if (!forecastDays[date]) {
                forecastDays[date] = item;
            }
        });

        // בחירת חמשת הימים הרצופים (כולל היום הנוכחי)
        const sortedDates = Object.keys(forecastDays).sort();
        sortedDates.slice(0, 5).forEach(date => {
            const forecast = forecastDays[date];
            const forecastElement = document.createElement('div');
            forecastElement.classList.add('forecast-card');
            forecastElement.innerHTML = `
                <p class="forecast-date">${new Date(date).toLocaleDateString('he-IL')}</p>
                <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="${forecast.weather[0].description}">
                <p class="forecast-temp">${Math.round(forecast.main.temp)}°C</p>
                <p class="forecast-desc">${forecast.weather[0].description}</p>
            `;
            this.forecastContainer.appendChild(forecastElement);
        });
    }
}

// יצירת האפליקציה כשהדף נטען
document.addEventListener('DOMContentLoaded', () => {
    new WeatherApp();
});
