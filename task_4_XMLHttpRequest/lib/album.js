"use strict"

function AlbumRequest() {};

AlbumRequest.prototype = Object.create(Request.prototype);

AlbumRequest.prototype.getAlbumInfo = function(artistName, albumName) {
  this.load({
    method:'artist.gettopalbums',
    artist: artistName,
    album: albumName
  });
}
