"use strict"

function AlbumRequest() {};

AlbumRequest.prototype = Object.create(Request.prototype);

AlbumRequest.prototype.getAlbumInfo = function(artistName, albumName) {
  var params = {
    method:'album.getinfo',
    artist: artistName,
    album: albumName
  }
  this.load(params, Handler.processGetAlbumInfo);
}
