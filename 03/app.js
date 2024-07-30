document.addEventListener('DOMContentLoaded', init);

function init() {
  const button = document.getElementsByTagName('button')[0];
  button.addEventListener('click', handleChangeText)

}

const handleChangeText = async () => {
  const span = document.getElementsByTagName('span');
  try {
    const api = await getApi();
    span[0].innerHTML = api;
  } catch (error) {
    console.log('Error:', error);
    span[0].innerHTML = 'Error fetching IP';
  }
}

const getApi = async () => {
  return fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
        return data.ip;
    })
    .catch(error => {
      console.log('Error:', error);
      throw error;
    });
}