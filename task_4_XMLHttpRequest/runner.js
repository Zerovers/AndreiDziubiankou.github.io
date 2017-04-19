"use strict"

var request = new ChartRequest();
request.getTopArtists();

request = new ArtistRequest();
var artistName = 'Stigmata';
request.search(artistName);
request.getInfo(artistName);
request.getTopAlbums(artistName);

var albumName = 'Acoustic&Drive';
request = new AlbumRequest();
request.getAlbumInfo(artistName, albumName);
