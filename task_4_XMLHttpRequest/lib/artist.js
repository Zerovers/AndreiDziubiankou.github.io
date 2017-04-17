"use strict"

function ArtistRequest() {};

ArtistRequest.prototype = Request.prototype;

ArtistRequest.prototype.search = function(name) {
  return this.load('artist.search&artist=' + name + '&limit=10').results.artistmatches.artist;
};

ArtistRequest.prototype.getInfo = function(name) {
  var result = this.load('artist.getinfo&artist=' + name).artist;
  return result.url + '\n' + result.bio.summary;
};

ArtistRequest.prototype.getTopAlbums = function(name) {
  return this.load('artist.gettopalbums&artist=' + name + '&limit=10').topalbums.album;
};
