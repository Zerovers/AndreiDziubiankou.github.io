"use strict"

function ArtistRequest() {};

ArtistRequest.prototype = Object.create(Request.prototype);

ArtistRequest.prototype.search = function(name, page) {
  var params = {
    method:'artist.search',
    artist: name
  }
  if (page != undefined) {
    params.page = page;
  }
  this.load(params, processFunction);

  function processFunction(responseObject) {
    var content = document.getElementById('content');
    content.innerHTML = '';
    var fragment = document.createDocumentFragment();

    fragment.appendChild(DivFactory.createSearchbar());

    var divArtists = document.createElement('div');
    divArtists.id = 'artists';
    var artists = responseObject.results.artistmatches.artist;
    artists.forEach(function(artist) {
      var imgsrc = artist.image[2]['#text'];
      var name = artist.name;
      var processFunction = function() {
        var request = new ArtistRequest();
        request.getInfo(artist.name);
        return false;
      }
      divArtists.appendChild(DivFactory.createContainer(imgsrc, name, processFunction));
    })

    fragment.appendChild(divArtists);

    var currentPage = parseInt(responseObject.results["opensearch:Query"].startPage);
    var artistsPerPage = parseInt(responseObject.results["opensearch:itemsPerPage"])
    var totalResults = parseInt(responseObject.results["opensearch:totalResults"]);
    var totalPages = parseInt(totalResults / artistsPerPage) + 1;

    fragment.appendChild(DivFactory.createPagination(currentPage, totalPages,
      function() {
        var request = new ArtistRequest();
        request.search(name, this.textContent);
        return false;
      }));

    content.appendChild(fragment);
  }
};

ArtistRequest.prototype.getInfo = function(name) {
  this.load({
    method:'artist.getinfo',
    artist: name
  }, processFunction);

  function processFunction(responseObject){
    var content = document.getElementById('content');
    content.innerHTML = '';
    var fragment = document.createDocumentFragment();

    var info = document.createElement('div');
    info.className = 'info';

    var numberLikes = parseInt(Math.random() * 5);
    info.appendChild(DivFactory.createWrapper(name, numberLikes));

    var imgsrc = responseObject.artist.image[2]["#text"];
    var description = DivFactory.createDescription(imgsrc);
    var bio = document.createElement('div');
    bio.innerHTML = responseObject.artist.bio.content;

    description.appendChild(bio);
    info.appendChild(description);
    fragment.appendChild(info);
    content.appendChild(fragment);
    var albumsRequest = new ArtistRequest();
    albumsRequest.getTopAlbums(name);
  }
};

ArtistRequest.prototype.getTopAlbums = function(name, page) {
  var params = {
    method:'artist.gettopalbums',
    artist: name
  }
  if (page != undefined) {
    params.page = page;
  }
  this.load(params, processFunction);

  function processFunction(responseObject) {
    var content = document.getElementById('content');
    var fragment = document.createDocumentFragment();

    var albumsDiv = document.getElementById('albums');
    if (albumsDiv) {
      albumsDiv.innerHTML = '';
    } else {
      albumsDiv = document.createElement('div');
      albumsDiv.id = 'albums'
    }
    var albums = responseObject.topalbums.album;
    albums.forEach(function(album) {
      var imgsrc = album.image[2]['#text'];
      var albumName = album.name;
      var processFunction = function() {
        var request = new AlbumRequest();
        request.getAlbumInfo(name, album.name);
        return false;
      }
      albumsDiv.appendChild(DivFactory.createContainer(imgsrc, albumName, processFunction));
    })

    var currentPage = parseInt(responseObject.topalbums['@attr'].page);
    var totalPages = parseInt(responseObject.topalbums['@attr'].totalPages);

    albumsDiv.appendChild(DivFactory.createPagination(currentPage, totalPages,
      function() {
        var request = new ArtistRequest();
        request.getTopAlbums(name, this.textContent);
        return false;
      }));

    fragment.appendChild(albumsDiv);
    content.appendChild(fragment);
  }
};
