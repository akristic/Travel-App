const API_KEY_PIXABAY = "13150993-4fd2a5efe3fcca473a55e6c01"
const pixabayBaseUrl = "https://pixabay.com/api/?"

//Helper functions
function getPixabayUrl(city){
    return `${pixabayBaseUrl}&key=${API_KEY_PIXABAY}&q=${city}&image_type=photo&category=travel`
}
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
const getPixabayData = async ( url = '')=>{
    const response = await fetch(url);
    try {
      const newData = await response.json();
      console.log(newData)
      return newData;
    }catch(error) {
    console.log("error", error);
    }
}

function getPixabayForLocation(city){
    console.log(":::getPixabayForLocation:::")
    getPixabayData(getPixabayUrl(city))
    .then(function(data){
        console.log(data)
        updateUI(data);
    });
}
function updateUI(data){
    const image = document.getElementById('image')
    const numberOfImages = data.hits.length;
    const index = getRandomInt(numberOfImages)
    image.src = data.hits[index].webformatURL;
}

export { getPixabayForLocation }