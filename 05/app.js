const apiUrl = 'http://localhost:3000/users';

document.addEventListener('DOMContentLoaded', init);

function init() {
    loadUsers();
    const element = document.getElementsByClassName('form')[0];

    element.addEventListener("submit", async evt => {
      const data = await getFormData(evt);
      await fetchPost(data);
    });
}

const getFormData = evt => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  const data = Array.from(formData.entries()).reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});

  return data
}

async function fetchPost(body) {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName: body.firstName,
        lastName: body.lastName,
      })
    });

    if (!response.ok) {
      throw new Error(`Error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.log('Fetch error:', err);
  }
}


function loadUsers() {
  const promise = fetchGet(apiUrl);

  promise
      .then(data => insertUsers(data))
      .catch(err => console.error(err));
}

async function fetchGet(url) {
  return fetch(url)
    .then(resp => {
      if(resp.ok) {
        return resp.json();
      }

      return Promise.reject(resp);
  });
}

function insertUsers(usersList) {
  const ulElement = document.querySelector('.users');
  ulElement.innerHTML = '';
  usersList.forEach(user => {
    const liElement = document.createElement('li');
    liElement.innerText = `${user.firstName} ${user.lastName}`;

    ulElement.appendChild(liElement);
  });
}
