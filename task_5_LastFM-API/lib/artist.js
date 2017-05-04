"use strict"

function ArtistRequest() {};

ArtistRequest.prototype = Object.create(Request.prototype);

ArtistRequest.prototype.search = function(artistName, page) {
  var params = {
    method:'artist.search',
    artist: artistName
  }
  if (page) {
    params.page = page;
  }
  this.load(params, Handler.processSearch);
};

ArtistRequest.prototype.getInfo = function(artistName) {
  this.load({
    method:'artist.getinfo',
    artist: artistName
  }, Handler.processGetArtistInfo);
};

ArtistRequest.prototype.getTopAlbums = function(artistName, page) {
  var params = {
    method:'artist.gettopalbums',
    artist: artistName
  }
  if (page) {
    params.page = page;
  }
  this.load(params, Handler.processGetTopAlbums);
};
