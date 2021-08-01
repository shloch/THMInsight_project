function postDataToServer(mydata, serverURL) {
  let message = {};
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
      // console.log('Success:', data);
      message = { infos: 'Success', data };
    })
    .catch((error) => {
    //   console.error('Error:', error);
      message = { infos: 'Error', data: error };
    });
  return message;
}

export default postDataToServer;
