/* Global Variables */
const baseUrl = "http://api.geonames.org/postalCodeLookupJSON?"
const apiUserName = "antekristic"
let city = "Dubrovnik" //default
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '.'+ d.getDate()+'.'+ d.getFullYear();

//Helper functions
function getGeoNameUrl(){
    return baseUrl + "placename=" + city + "&username=" + apiUserName;
}
//manage date inputs
const today = new Date()
const startDateInput = document.getElementById('start')
startDateInput.value = today.toISOString().split("T")[0];
startDateInput.min = today.toISOString().split("T")[0]; // thank you stackoverflow, so elegant
const endDateInput = document.getElementById('end')
endDateInput.value = today.toISOString().split("T")[0];
endDateInput.min = today.toISOString().split("T")[0];

function getCounterDays(){
  const startDate = new Date(startDateInput.value)
  const time = startDate.getTime() - today.getTime();
  const days = time / (1000 * 3600 * 24);
  return (days+1).toFixed(0);
}
function getTrippDuration(){
  const endDate = new Date(endDateInput.value)
  const startDate = new Date(startDateInput.value)
  const time = endDate.getTime() - startDate.getTime();
  const days = time / (1000 * 3600 * 24);
  return (days+1).toFixed(0);
}
// get and post tasks
const getGeonNameData = async ( url = '')=>{
      const response = await fetch(url);
      try {
        const newData = await response.json();
        console.log(newData)
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }
 
const postData = async ( url = '', data = {})=>{
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data) 
  });
    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
      console.log("error", error);
    }
}
// main functions
  function preformAddTripp(){
    city = document.getElementById('city').value;
    city.trim()
    if(city !== ""){
        getGeonNameData(getGeoNameUrl())
        .then(function(data){
            postData('http://localhost:8000/tripp/add', {
              city: city, 
              geoData: data, 
              start: startDateInput.value, 
              end: endDateInput.value})
        })
        .then(function(){
            updateUI();
        });
    }else{
        console.log("Did you forget to add your destination?")
    }    
  }

  const updateUI = async () => {
    const request = await fetch('http://localhost:8000/all');
    try{
      const allData = await request.json();
      const lastIndex = allData.length - 1;
      const lat = allData[lastIndex].geoData.postalcodes[0].lat;
      const lng = allData[lastIndex].geoData.postalcodes[0].lng;
      const text = `${allData[lastIndex].geoData.postalcodes[0].adminName1} is 
      ${getCounterDays()} days away. Tripp duration: ${getTrippDuration()} days.`
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
export { preformAddTripp }