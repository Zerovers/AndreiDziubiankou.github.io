"use strict"

function ArtistRequest() {};

ArtistRequest.prototype = Object.create(Request.prototype);

ArtistRequest.prototype.search = function(artistName, page, handler) {
  var params = {
    method:'artist.search',
    artist: artistName
  }
  if (page) {
    params.page = page;
  }
  this.load(params, handler);
};

ArtistRequest.prototype.getInfo = function(artistName, handler) {
  this.load({
    method:'artist.getinfo',
    artist: artistName
  }, handler);
};

ArtistRequest.prototype.getTopAlbums = function(artistName, page, handler) {
  var params = {
    method:'artist.gettopalbums',
    artist: artistName
  }
  if (page) {
    params.page = page;
  }
  this.load(params, handler);
};
