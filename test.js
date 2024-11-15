const axios = require('axios');

async function makeRequest() {
  try {
    const response = await axios.post(
      `https://causal-quail-jointly.ngrok-free.app//documentCheck`,
      {
        content: '<div>hi <span>how</span> are-- you?</div><div>Spenadsf</div>'
      },
      {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true"
        }
      }
    );

    console.log('Response data:', response.data);
  } catch (error) {
    console.error('Error making request:', error);
  }
}

makeRequest();
