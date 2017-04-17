"use strict"
var delimeter = '-----------------------------------------------------------------------------------------------------';
var request = new ChartRequest();
console.log('top 10 artists:');
var topArtists = request.getTopArtists();
topArtists.forEach(function(artist){
  console.log(artist.name)
});
console.log(delimeter);

request = new ArtistRequest();
var artistName = 'Stigmata';
console.log('result of searching ' + artistName + ':');
var searchedArtists = request.search(artistName);
searchedArtists.forEach(function(artist){
  console.log(artist.name)
});
console.log(delimeter);

console.log('info about ' + artistName + ':');
var artistInfo = request.getInfo(artistName);
console.log(artistInfo);
console.log(delimeter);

console.log('top 10 ' + artistName + ' albums:');
var topAlbums = request.getTopAlbums(artistName);
topAlbums.forEach(function(album){
  console.log(album.name)
});
console.log(delimeter);

request = new AlbumRequest();
var albumName = 'Acoustic&Drive';
console.log('information about ' + albumName + ':');
var albumInfo = request.getAlbumInfo(artistName, albumName);
console.log(albumInfo.artist + ' ' + albumInfo.name);
albumInfo.tracks.track.forEach(function (track, index){
  console.log(index + '. ' + track.name);
});
console.log(delimeter);
