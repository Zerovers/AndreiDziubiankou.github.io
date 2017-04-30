"use strict"

function AlbumRequest() {};

AlbumRequest.prototype = Object.create(Request.prototype);

AlbumRequest.prototype.getAlbumInfo = function(artistName, albumName) {
  var params = {
    method:'album.getinfo',
    artist: artistName,
    album: albumName
  }
  this.load(params, processFunction);

  function processFunction(responseObject) {
    var content = document.getElementById('content');
    content.innerHTML = '';
    var fragment = document.createDocumentFragment();

    var info = document.createElement('div');
    info.className = 'info';

    var numberLikes = parseInt(Math.random() * 5);

    info.appendChild(DivFactory.createWrapper(albumName, numberLikes));

    var imgsrc = responseObject.album.image[2]["#text"];
    var description = DivFactory.createDescription(imgsrc);

    var artistDiv = document.createElement('div');
    artistDiv.textContent = 'Artist: ' + responseObject.album.artist;
    var urlDiv = document.createElement('div');
    urlDiv.textContent = 'Link: ';
    var url =  document.createElement('a');
    url.href = responseObject.album.url
    url.textContent = url.href;
    urlDiv.appendChild(url);
    var tags = responseObject.album.tags.tag;
    var tagsDiv = document.createElement('div');
    tagsDiv.textContent = 'Tags: ';
    tags.forEach(function(tag, index, array){
      if (index == array.length - 1) {
        tagsDiv.textContent += (tag.name + '.');
        return;
      }
      tagsDiv.textContent += (tag.name + ', ');
    });
    description.appendChild(artistDiv);
    description.appendChild(urlDiv);
    description.appendChild(tagsDiv);

    info.appendChild(description);
    fragment.appendChild(info);

    var tracksDiv = document.createElement('div');
    tracksDiv.id = 'tracks';
    tracksDiv.textContent = 'Tracks:'
    var tracks = responseObject.album.tracks.track;
    tracks.forEach(function(track, index){
      var trackDiv = document.createElement('div');
      trackDiv.className = 'track';
      var trackName = document.createElement('div');
      trackName.textContent = index + '. ' + track.name;
      var audio = document.createElement('audio');
      audio.controls = true;
      audio.src = track.url;
      trackDiv.appendChild(trackName);
      trackDiv.appendChild(audio);
      tracksDiv.appendChild(trackDiv)
    });
    fragment.appendChild(tracksDiv);
    content.appendChild(fragment);
  }
}
