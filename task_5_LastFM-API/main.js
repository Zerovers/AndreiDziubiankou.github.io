"use strict"
var header = document.querySelector('#header a');
header.onclick = indexRequest;

function indexRequest(){
  var request = new ChartRequest();
  request.getTopArtists();
  return false;
}

indexRequest();
/*var artistName = 'Stigmata';
request.search(artistName);
request.getInfo(artistName);
request.getTopAlbums(artistName);

var albumName = 'Acoustic&Drive';
request = new AlbumRequest();
request.getAlbumInfo(artistName, albumName);*/
