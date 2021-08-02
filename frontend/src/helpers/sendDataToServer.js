function postDataToServer(mydata, serverURL) {
  fetch(serverURL, {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    // body: JSON.stringify(mydata),
    body: mydata,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function authenticate(mydata, serverURL) {
  return fetch(serverURL, {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    // body: JSON.stringify(mydata),
    body: mydata,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
      return data;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function editUserData(mydata, serverURL) {
  fetch(serverURL, {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    // body: JSON.stringify(mydata),
    body: mydata,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

export { postDataToServer as addNewUser, editUserData, authenticate };
