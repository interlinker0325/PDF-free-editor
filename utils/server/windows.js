import axios from "axios";

const WINDOWS_URL = process.env.NEXT_PUBLIC_WINDOWS_SERVER_URL

export function fileToHTML(file) {
  const formData = new FormData();
  formData.append("file", file);
  return axios.post(
    `${WINDOWS_URL}/filetohtml`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        "ngrok-skip-browser-warning": "true"
      },
    }
  );
}

// check coherence of the HTML document
export function checkCompliance(file) {
  return axios.post(
    `${WINDOWS_URL}/documentCheck`,
    {
      'content': file
    },
    {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true"
      }
    }
  );
}
