const container = document.querySelector('.container'); 
const search = document.querySelector('.search-box button'); 
const weatherBox = document.querySelector('.weather-box'); 
const weatherDetails = document.querySelector('.weather-details'); 
const error404 = document.querySelector('.not-found'); 
const cityHide = document.querySelector('.city-hide');

search.addEventListener('click', () => {
    const APIKey = "API"; 
    const city = document.querySelector('.search-box input').value; 

    if (city == '') return; 

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => { 
        if (json.cod == '404') { 
            cityHide.textContent = city;
            container.style.height = '400px'; 
            weatherBox.classList.remove('active'); 
            weatherDetails.classList.remove('active'); 
            error404.classList.add('active'); 
            return;
        }

        const image = document.querySelector('.weather-box img'); 
        const temperature = document.querySelector('.weather-box .temperature'); 
        const description = document.querySelector('.weather-box .description'); 
        const humidity = document.querySelector('.weather-details .humidity span'); 
        const wind = document.querySelector('.weather-details .wind span'); 

        if (cityHide.textContent == city) {
            return;
        }

        cityHide.textContent = city;

        container.style.height = '555px';
        container.classList.add('active');
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');

        setTimeout(() => {
            container.classList.remove('active');
        }, 2500);

        // Corrigir a estrutura do switch com 'break'
        switch (json.weather[0].main) { 
            case 'Clear': 
                image.src = 'images/clear.png'; 
                break;
            case 'Rain': 
                image.src = 'images/rain.png';
                break;
            case 'Snow': 
                image.src = 'images/snow.png';
                break;
            case 'Clouds': 
                image.src = 'images/cloud.png';
                break;
            case 'Mist': 
                image.src = 'images/mist.png';
                break;
            case 'Haze': 
                image.src = 'images/mist.png';
                break;
            default: 
                image.src = 'images/cloud.png';
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`; 
        description.innerHTML = `${json.weather[0].description}`; 
        humidity.innerHTML = `${json.main.humidity}%`; 
        wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`; 

        const infoWeather = document.querySelector('.info-weather');
        const infoHumidity = document.querySelector('.info-humidity');
        const infoWind = document.querySelector('.info-wind');
        
        // Clonando as informações
        const elCloneInfoWeather = infoWeather.cloneNode(true);
        const elCloneInfoHumidity = infoHumidity.cloneNode(true);
        const elCloneInfoWind = infoWind.cloneNode(true);

        elCloneInfoWeather.id = 'clone-info-weather';
        elCloneInfoHumidity.id = 'clone-info-humidity';
        elCloneInfoWind.id = 'clone-info-wind';

        elCloneInfoWeather.classList.add('active-clone');
        elCloneInfoHumidity.classList.add('active-clone');
        elCloneInfoWind.classList.add('active-clone');

        setTimeout(() => {
            infoWeather.insertAdjacentElement("afterend", elCloneInfoWeather);
            infoHumidity.insertAdjacentElement("afterend", elCloneInfoHumidity);
            infoWind.insertAdjacentElement("afterend", elCloneInfoWind);
        }, 2200);
    }).catch(error => {
        console.error("Erro ao carregar dados da API: ", error);
    });
});