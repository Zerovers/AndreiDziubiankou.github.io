"use strict"

function Request() {};

Request.prototype.load = function(params) {
  var paramsInString = '';
  for (var key in params){
    paramsInString += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) +'&';
  }
  var urlPrefix = 'http://ws.audioscrobbler.com/2.0/?';
  var api_key_json = 'api_key=2d8e897e2945bd2b4f1d70369c7449e2&format=json';
  var xhr = new XMLHttpRequest();
  xhr.open('GET', urlPrefix + paramsInString + api_key_json, true);
  xhr.send();
  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4) return;
    if (xhr.status == 200) {
      console.log(JSON.parse(xhr.responseText));
    } else {
      console.log('error: request status ' + xhr.status);
    }
  }
};
