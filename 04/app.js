document.addEventListener('DOMContentLoaded', init);

const API_KEY = '2a72180fff2f4dd68377883af95a41e7';

async function init() {
  console.log('DOM');
  const element = document.getElementsByClassName('form')[0];

  element.addEventListener("submit", async evt => {
    const cordData = await getCoordinates(evt);
    const weatherData = await handleGetData(cordData);
    await changeDomValues(cordData, weatherData);
  });

}

const changeDomValues = (cordData, weatherData) => {
  document.getElementsByClassName("weather__lat")[0].innerText = cordData.latitude;
  document.getElementsByClassName("weather__lng")[0].innerText = cordData.longitude;
  document.getElementsByClassName("weather__summary")[0].innerText = weatherData.data[0].weather.description;
  document.getElementsByClassName("weather__temperature")[0].innerText = Math.round((weatherData.data[0].app_temp * (9 / 5)) + 32);
}
  
const getCoordinates = evt => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  const data = Array.from(formData.entries()).reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});
  
  return data
};

const handleGetData = async cordData => {
  try{
    const data = await getData(cordData)
    console.log(data);
    return data
  }catch(error){
    throw(error)
  }
};

const getData = async cordData => {
  const lat = Number(cordData.latitude);
  const long = Number(cordData.longitude);
  return (fetch(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${long}&key=2a72180fff2f4dd68377883af95a41e7&include=minutely`)
     .then(res => res.json())
     .then(data => {
        return data;
     })
     .catch(error =>{
        console.log(error);
        throw error;
     })
  );
};
