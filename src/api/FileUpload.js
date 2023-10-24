import axios from "axios";

const URL = 'https://webapp-230621221913.azurewebsites.net/api/firebase/files';

export async function upload(file) {
  try {
   console.log('Uploading');
      let imgformData = new FormData();
      imgformData.append("file", file);
      const res = await axios.post('https://webapp-230621221913.azurewebsites.net/api/firebase/files', imgformData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
      })
    return res;
  } catch (e) {
    return e;
  }
}


