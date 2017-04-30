"use strict"
var header = document.querySelector('#header a');
header.onclick = indexRequest;

function indexRequest(){
  var request = new ChartRequest();
  request.getTopArtists();
  return false;
}

indexRequest();
