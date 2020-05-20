/* Global Variables */
const baseUrl = "http://api.geonames.org/postalCodeLookupJSON?"
const apiUserName = "antekristic"

//manage date inputs
const today = new Date()
const startDateInput = document.getElementById('start')
startDateInput.value = today.toISOString().split("T")[0];
startDateInput.min = today.toISOString().split("T")[0]; // thank you stackoverflow, so elegant
const endDateInput = document.getElementById('end')
endDateInput.value = today.toISOString().split("T")[0];
endDateInput.min = today.toISOString().split("T")[0];

//Helper functions
function getGeoNameUrl(city){
  return baseUrl + "placename=" + city + "&username=" + apiUserName;
}

// get and post tasks
const getGeoNameData = async ( url = '')=>{
      const response = await fetch(url);
      try {
        const newData = await response.json();
        console.log(newData)
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }

// main functions
  function preformAddTripp(){
    const city = document.getElementById('city').value;
    city.trim()
    if(city !== ""){
        getGeoNameData(getGeoNameUrl(city))
        .then(function(data){
          if(data.postalcodes.length > 0){
            document.getElementById('city-label').innerHTML="City:"
            //save data to server
            Client.postDataToServer('http://localhost:8000/tripp/add', {
              city: city, 
              lat: data.postalcodes[0].lat, 
              lng: data.postalcodes[0].lng, 
              start: startDateInput.value, 
              end: endDateInput.value})
            //start fetching weather from weatherbit
            Client.getWeatherInLocation(data.postalcodes[0].lat, data.postalcodes[0].lng)
            //start fetching images from pixabay
            Client.getPixabayForLocation(city)   
          }else{
            document.getElementById('city-label').innerHTML= "Error, There is no data for this destination. Check your City input."
          }                                     
        })
        .then(function(){
             updateUI();
        });
    }else{
      document.getElementById('city-label').innerHTML= "Did you forget to add your destination?"
    }    
  }

  const updateUI = async () => {
    const request = await fetch('http://localhost:8000/all');
    try{
      const allData = await request.json();
      const lastIndex = allData.length - 1;
      const lat = allData[lastIndex].lat;
      const lng = allData[lastIndex].lng;
      const start = allData[lastIndex].start;
      const end = allData[lastIndex].end;
      const text = `${allData[lastIndex].city} is 
      ${Client.getCounterDays(new Date(start))} days away. 
      Tripp duration: ${Client.getTrippDuration(new Date(start), new Date(end))} days.`
      document.getElementById('destination').innerHTML = text;
     }catch(error){
      console.log("error", error);
    }
  }

//events
document.getElementById('add-tripp').addEventListener('click', function(){
    preformAddTripp();
});
//set minimum input end date when we change start date
startDateInput.addEventListener('change', function(){
  endDateInput.value = new Date(startDateInput.value).toISOString().split("T")[0];
  endDateInput.min = new Date(startDateInput.value).toISOString().split("T")[0];
});

export { 
  preformAddTripp
}