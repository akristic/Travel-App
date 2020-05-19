const baseUrlWeather = "https://api.weatherbit.io/v2.0/forecast/daily?"
const API_KEY = "51c0e907fbf74ac9bded371467945987";
const DAY_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Satruday']
//Helper functions
function getWeatherBitUrl(lat, lon){
    return `${baseUrlWeather}&lat=${lat}&lon=${lon}&key=${API_KEY}`
}
const getWeatherBitData = async ( url = '')=>{
    const response = await fetch(url);
    try {
      const newData = await response.json();
      console.log(newData)
      return newData;
    }catch(error) {
    console.log("error", error);
    }
}

function getWeatherInLocation(lat, lon){
    getWeatherBitData(getWeatherBitUrl(lat, lon))
    .then(function(data){
        console.log(":::getWeatherInLocation:::")
        console.log(data)
        updateUI(data);
    });
}
function updateUI(data){
    const weather = document.getElementById('weather')
    weather.innerHTML = concateDayAndWeather(data);
}

function concateDayAndWeather(data){
    let text =`<h3>Forcast for next 16 days in ${data.city_name}</h3>`;
    for(let i=0; i < 16; i++){
        const d = new Date();
        d.setDate(d.getDate()+i);
        const newDate = (d.getMonth() + 1) + '.'+ d.getDate()+'.'+ d.getFullYear() + " " + DAY_OF_WEEK[d.getDay()];
        const weather = data.data[i].weather.description;
        text = `${text}
         <h5>${newDate} --> ${weather}</h5>
         `
    }
    return text;
}

export { getWeatherInLocation }

