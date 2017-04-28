"use strict"

function AlbumRequest() {};

AlbumRequest.prototype = Object.create(Request.prototype);

AlbumRequest.prototype.getAlbumInfo = function(artistName, albumName) {
  var params = {
    method:'album.getinfo',
    artist: artistName,
    album: albumName
  }
  var request = this.load(params);
  request.addEventListener('readystatechange', function() {
    if (request.readyState != 4) return;
    if (request.status == 200) {
      var jsonObject = JSON.parse(request.responseText);
      console.log(jsonObject);

      var content = document.getElementById('content');
      content.innerHTML = '';
      var fragment = document.createDocumentFragment();

      var info = document.createElement('div');
      info.className = 'info';
      var wrapper =  document.createElement('div');
      wrapper.className = 'wrapper';
      var nameDiv = document.createElement('div');
      nameDiv.className = 'name';
      nameDiv.textContent = artistName;

      wrapper.appendChild(nameDiv);

      var likes = document.createElement('div');
      likes.className = 'likes';
      var numberLikes = parseInt(Math.random() * 5);
      for (var i = 0; i < 5; i++){
        var like = document.createElement('a');
        like.href = '#';
        if ( i < numberLikes) {
          like.className = 'like';
        } else {
          like.className = 'dislike';
        }
        likes.appendChild(like);
      }

      wrapper.appendChild(likes);
      info.appendChild(wrapper);

      var description = document.createElement('div');
      description.className = 'description';
      var img = document.createElement('img');
      img.src = jsonObject.album.image[2]["#text"];
      description.appendChild(img);
      var artistDiv = document.createElement('div');
      artistDiv.textContent = 'Artist: ' + jsonObject.album.artist;
      var urlDiv = document.createElement('div');
      urlDiv.textContent = 'Link: ';
      var url =  document.createElement('a');
      url.href = jsonObject.album.url
      url.textContent = url.href;
      urlDiv.appendChild(url);
      var tags = jsonObject.album.tags.tag;
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
      var tracks = jsonObject.album.tracks.track;
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
    } else {
      console.log('error: request status ' + request.status);
    }
  });
}
