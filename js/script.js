let long;
let lat;
let temperatureDescription = document.querySelector('.temperature-descitption');
let temperatureDegree = document.querySelector('.temperature-degree');
let timeZone = document.getElementById('location-timezone');
let celciusPlaceHolder = document.querySelector(".temperature-degree-celcius");

let weatherIcon = document.querySelector('.atmosphere');

window.addEventListener('load', () => {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            getWeather();

        });
    };

    let getWeather = async () => {
        const proxy = "https://cors-anywhere.herokuapp.com/";
        const url = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=8ebabcb211cf6b7d56db1e75995435c6`;
        
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        //Temperature in Fahrenheight 
        //get temp from main array
        const { temp } = data.main;

        //Timezone 
        //changes innerhtml to timezone 
        timeZone.innerHTML = data.name;


        //Temperature Description
        //loop through weather array to pick out object 
        for (let object of data.weather) {
            temperatureDescription.textContent = object.main;
            let weatherId = object.id;
            console.log(weatherId);
           
            //sets icons depending on weatherId
            if (weatherId >= 200 && weatherId <= 232) {
                console.log('Thunderstorm')
                let thunderstorm = document.getElementById('thunder');
                thunderstorm.classList.toggle('show');
            }
            else if (weatherId >=300 && weatherId <= 321) {
                console.log('Drizzle')
                let drizzle = document.getElementById('drizzle');
                drizzle.classList.toggle('show');
            } 
            else if (weatherId >=500 && weatherId <= 531) {
                console.log('Raining')
                let rainy = document.getElementById('rainy');
                rainy.classList.toggle('show');
            } 
            else if (weatherId >=600 && weatherId <= 622) {
                console.log('Snowwwinng')
                let snowy = document.getElementById('snowy');    
                snowy.classList.toggle('show');
            } 
            else if (weatherId >=701 && weatherId <= 781) {
                console.log('Somethings in the atmosphere')
                let atmosphere = document.getElementById('atmosphere');
                atmosphere.classList.toggle('show');
                placeholderImg();
            } 
            else if (weatherId === 800) {
                console.log('Its sunnyyy')
                let sunny = document.getElementById('sun');
                sunny.classList.toggle('show');
            } 
            else if (weatherId >= 801 && weatherId <= 804) {
                console.log('its cloudy outside')
                let cloudy = document.getElementById('cloudy');   
                cloudy.classList.toggle('show');
                placeholderImg();
            }
        };

        return kelvinToCelcius(temp);
    };

    //converts kelvin to celcius
    let kelvinToCelcius = (kelvin) => {
        const kTemp = kelvin;
        const kToCel = (kTemp - 273.15);
        const rounded = Math.round(kToCel * 10) / 10;

        celciusPlaceHolder.textContent = rounded;
    };

    //hides placeholder image 
    let placeholderImg = () => {
        let img = document.getElementById('placeholder-img');
        img.classList.toggle('hide');
    }
    
});






