"use strict"

function AlbumRequest() {};

AlbumRequest.prototype = Request.prototype;

AlbumRequest.prototype.getAlbumInfo = function(artistName, albumName) {
  return this.load('album.getinfo&artist=' + artistName + '&album=' + albumName).album;
}
