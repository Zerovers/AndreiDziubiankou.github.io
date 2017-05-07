"use strict"

class Request {

  load(params, processFunction) {
    let paramsInString = '';
    for (let key in params) {
      paramsInString += `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}&`;
    }
    console.log(paramsInString);
    let urlPrefix = 'http://ws.audioscrobbler.com/2.0/?';
    let api_key_json = 'api_key=2d8e897e2945bd2b4f1d70369c7449e2&format=json';
    fetch(urlPrefix + paramsInString + api_key_json)
      .then(response => {
        if (response.status == 200){
          let responseObject = response.json();
          console.log(responseObject);
          return responseObject;
        } else {
          throw response;
        }
      })
      .then(responseObject => {
        processFunction(responseObject);
      })
      .catch(response => {
        console.log(`error: request status ${response.status}`);
      })
  }
};
