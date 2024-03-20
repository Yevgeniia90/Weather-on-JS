
let currCity = "Харьков";
let units = "metric";

let city = document.querySelector('.weather__city');
let datetime = document.querySelector('.weather__datetime');
let weather__forecast = document.querySelector('.weather__forecast');
let weather__temperature = document.querySelector('.weather__temperature');
let weather__icon = document.querySelector('.weather__icon');
let weather__minmax = document.querySelector('.weather__minmax')
let weather__realfeel = document.querySelector('.weather__realfeel');
let weather__humidity = document.querySelector('.weather__humidity');
let weather__wind = document.querySelector('.weather__wind');
let weather__pressure = document.querySelector('.weather__pressure');

document.querySelector('.weather__search').addEventListener('submit', e => {
    let search = document.querySelector(".weather__searchform");
    e.preventDefault();
    currCity = search.value;
    getWeather();
    getWeatherfor5days()
    search.value = ""
})

document.querySelector(".weather_unit_celsius").addEventListener('click', () => {
    if (units !== "metric") {
        units = "metric"
        getWeather()
        getWeatherfor5days()
    }
})

document.querySelector(".weather_unit_farenheit").addEventListener('click', () => {
    if (units !== "imperial") {
        units = "imperial"
        getWeather()
        getWeatherfor5days()
    }
})

function convertTimeStamp(timestamp, timezone) {
    const convertTimezone = timezone / 3600;

    const date = new Date(timestamp * 1000);

    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",

    }
    return date.toLocaleString("ru-RU", options)

}

function convertCountryCode(country) {
    let regionNames = new Intl.DisplayNames(["ru"], { type: "region" });
    return regionNames.of(country)
}

function getWeather() {
    const API_KEY = '854e4b5a7e59be8b6d869b532db0e2ce'

    //api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${API_KEY}&units=${units}&lang=ru`).then(res => res.json()).then(data => {
        console.log(data)
        city.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}`
        datetime.innerHTML = convertTimeStamp(data.dt, data.timezone);

        const capitalizeFirstLetter = (string) => {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        weather__forecast.innerHTML = capitalizeFirstLetter(data.weather[0].description)
        weather__temperature.innerHTML = `${data.main.temp.toFixed()}&#176`
        weather__icon.innerHTML = `   <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" />`
        weather__minmax.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()}&#176</p><p>Max: ${data.main.temp_max.toFixed()}&#176</p>`
        weather__realfeel.innerHTML = `${data.main.feels_like.toFixed()}&#176`
        weather__humidity.innerHTML = `${data.main.humidity} %`
        weather__wind.innerHTML = `${data.wind.speed} ${units === "imperial" ? "mph" : ' м/c, ' + toTextualDescription(data.wind.deg)}`

        function toTextualDescription(degree) {
            if (degree > 337.5) return 'северный';
            if (degree > 292.5) return 'северо-западный';
            if (degree > 247.5) return 'западный';
            if (degree > 202.5) return 'юго-западный';
            if (degree > 157.5) return 'южный';
            if (degree > 122.5) return 'юго-западный';
            if (degree > 67.5) return 'восточный';
            if (degree > 22.5) { return 'северо-восточный'; }
            return 'северный';
        }
        weather__pressure.innerHTML = `${data.main.pressure}  мм рт. ст.`
    })
}

document.body.addEventListener('load', getWeather())



//function getWeatherfor5days() {
//    const API_KEY = '854e4b5a7e59be8b6d869b532db0e2ce';
//
//    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${currCity}&appid=${API_KEY}&units=${units}&lang=ru`).then(wes => wes.json()).then(data => {
//        console.log(data);
//
//          let houre1 = Math.round(data.list[8].main.temp);
//          let houre2 = Math.round(data.list[16].main.temp);
//          let houre3 = Math.round(data.list[24].main.temp);
//          let houre4 = Math.round(data.list[32].main.temp);
//          let houre5 = Math.round(data.list[39].main.temp);
//        
//          let houremin1 = Math.round(data.list[5].main.temp);
//          let houremin2 = Math.round(data.list[13].main.temp);
//          let houremin3 = Math.round(data.list[21].main.temp);
//          let houremin4 = Math.round(data.list[29].main.temp);
//          let houremin5 = Math.round(data.list[37].main.temp);
//        
//          document.getElementById('wrapper-houre1').innerHTML = houre1 + "°";
//          document.getElementById('wrapper-houre2').innerHTML = houre2 + "°";
//          document.getElementById('wrapper-houre3').innerHTML = houre3 + "°";
//          document.getElementById('wrapper-houre4').innerHTML = houre4 + "°";
//          document.getElementById('wrapper-houre5').innerHTML = houre5 + "°";
//        
//          document.getElementById('wrapper-houreMin1').innerHTML = houremin1 + "°";
//          document.getElementById('wrapper-houreMin2').innerHTML = houremin2 + "°";
//          document.getElementById('wrapper-houreMin3').innerHTML = houremin3 + "°";
//          document.getElementById('wrapper-houreMin4').innerHTML = houremin4 + "°";
//          document.getElementById('wrapper-houreMin5').innerHTML = houremin5 + "°";
//
//        let timeNow = new Date().getDate();
//        console.log(timeNow);
//        time1 = timeNow + 1;
//        time2 = time1 + 1;
//        time3 = time2 + 1;
//        time4 = time3 + 1;
//        time5 = time4 + 1;
//
//        document.getElementById('wrapper-time1').innerHTML = list.dt_txt;
//        document.getElementById('wrapper-time2').innerHTML = time2;
//        document.getElementById('wrapper-time3').innerHTML = time3;
//        document.getElementById('wrapper-time4').innerHTML = time4;
//        document.getElementById('wrapper-time5').innerHTML = time5;
//
//
//        let iconBaseUrl = "http://openweathermap.org/img/wn/";
//        let iconFormat = ".png";
//        let iconCode1 = data.list[8].weather[0].icon;
//        let iconCode2 = data.list[16].weather[0].icon;
//        let iconCode3 = data.list[24].weather[0].icon;
//        let iconCode4 = data.list[32].weather[0].icon;
//        let iconCode5 = data.list[39].weather[0].icon;
//
//        let iconCode1Full = iconBaseUrl + iconCode1 + iconFormat;
//        let iconCode2Full = iconBaseUrl + iconCode2 + iconFormat;
//        let iconCode3Full = iconBaseUrl + iconCode3 + iconFormat;
//        let iconCode4Full = iconBaseUrl + iconCode4 + iconFormat;
//        let iconCode5Full = iconBaseUrl + iconCode5 + iconFormat;
//
//
//        document.getElementById('wrapper-icon-houre-now').src = iconCode1Full;
//        document.getElementById('wrapper-icon-houre2').src = iconCode2Full;
//        document.getElementById('wrapper-icon-houre3').src = iconCode3Full;
//        document.getElementById('wrapper-icon-houre4').src = iconCode4Full;
//        document.getElementById('wrapper-icon-houre5').src = iconCode5Full;
//
//        let iconCodemin1 = data.list[5].weather[0].icon;
//        let iconCodemin2 = data.list[13].weather[0].icon;
//        let iconCodemin3 = data.list[21].weather[0].icon;
//        let iconCodemin4 = data.list[29].weather[0].icon;
//        let iconCodemin5 = data.list[37].weather[0].icon;
//
//        let iconCode1minFull = iconBaseUrl + iconCodemin1 + iconFormat;
//        let iconCode2minFull = iconBaseUrl + iconCodemin2 + iconFormat;
//        let iconCode3minFull = iconBaseUrl + iconCodemin3 + iconFormat;
//        let iconCodem4inFull = iconBaseUrl + iconCodemin4 + iconFormat;
//        let iconCode5minFull = iconBaseUrl + iconCodemin5 + iconFormat;
//
//
//        document.getElementById('wrapper-icon-houre-now2').src = iconCode1minFull;
//        document.getElementById('wrapper-icon-houre-now3').src = iconCode2minFull;
//        document.getElementById('wrapper-icon-houre-now4').src = iconCode3minFull;
//        document.getElementById('wrapper-icon-houre-now5').src = iconCodem4inFull;
//        document.getElementById('wrapper-icon-houre-now6').src = iconCode5minFull;
//        console.log(iconCodemin2);
//    })
//}
//getWeatherfor5days();



function getTemp(data) {
    const temperatureMap = new Map();

    data.list.forEach((item) => {
        const date = item.dt_txt.split(' ')[0];

        if (!temperatureMap.has(date)) {
            temperatureMap.set(date, { minTemp: item.main.temp, maxTemp: item.main.temp, weatherIcons: [item.weather[0].icon] });
        } else {
            const temperature = temperatureMap.get(date);
            if (item.main.temp < temperature.minTemp) {
                temperature.minTemp = item.main.temp;
            }
            if (item.main.temp > temperature.maxTemp) {
                temperature.maxTemp = item.main.temp;
            }
            temperature.weatherIcons.push(item.weather[0].icon);
        }
    });

    return temperatureMap;
}


function getIcon(weatherIcons) {
    const weatherCodeCounts = {};
    let maxCount = 0;
    let mostFrequentWeatherIcon = '';

    weatherIcons.forEach((icon) => {
        if (!weatherCodeCounts[icon]) {
            weatherCodeCounts[icon] = 1;
        } else {
            weatherCodeCounts[icon]++;
        }

        if (weatherCodeCounts[icon] > maxCount) {
            maxCount = weatherCodeCounts[icon];
            mostFrequentWeatherIcon = icon;
        }
    });

    return mostFrequentWeatherIcon;
}


function createWeatherIcon(iconCode) {
    const iconElement = document.createElement('img');
    iconElement.src = `http://openweathermap.org/img/w/${iconCode}.png`;
    return iconElement;
}

function getWeatherfor5days() {
    const API_KEY = '854e4b5a7e59be8b6d869b532db0e2ce';

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${currCity}&appid=${API_KEY}&units=${units}&lang=ru`).then(wes => wes.json()).then((data) => {

        const temperatureMap = getTemp(data);

        const weatherResultsDiv = document.getElementById('weatherResults');
        weatherResultsDiv.textContent = ' ';

        temperatureMap.forEach((value, key) => {

            const dayDiv = document.createElement('div');

            const dateElement = document.createElement('p');
            dateElement.textContent = key;

            const minTempElement = document.createElement('p');
            minTempElement.textContent = Math.round(value.minTemp) + "°";

            const maxTempElement = document.createElement('p');
            maxTempElement.textContent = Math.round(value.maxTemp) + "°";

            const weatherIconDiv = document.createElement('div');
            const averageWeatherIcon = getIcon(value.weatherIcons);
            const weatherIcon = createWeatherIcon(averageWeatherIcon);
            weatherIconDiv.appendChild(weatherIcon);

            dayDiv.appendChild(dateElement);
            dayDiv.appendChild(minTempElement);
            dayDiv.appendChild(maxTempElement);
            dayDiv.appendChild(weatherIconDiv);



            weatherResultsDiv.appendChild(dayDiv);
        })
    });
}
getWeatherfor5days();