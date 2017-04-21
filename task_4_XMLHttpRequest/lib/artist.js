"use strict"

function ArtistRequest() {};

ArtistRequest.prototype = Object.create(Request.prototype);

ArtistRequest.prototype.search = function(name) {
  this.load({
    method:'artist.search',
    artist: name
  });
};

ArtistRequest.prototype.getInfo = function(name) {
  this.load({
    method:'artist.getinfo',
    artist: name
  });
};

ArtistRequest.prototype.getTopAlbums = function(name) {
  this.load({
    method:'artist.gettopalbums',
    artist: name
  });
};
