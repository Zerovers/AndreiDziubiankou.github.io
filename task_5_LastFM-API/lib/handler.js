"use strict"
function Handler(){

}

Handler.processGetTopArtists = function (responseObject){
  var fragment = document.createDocumentFragment();

  var searchbar = document.querySelector('.search-bar');
  searchbar = searchbar ? searchbar : DivFactory.createSearchbar();
  fragment.appendChild(searchbar);

  var divArtists = document.createElement('div');
  divArtists.id = 'artists';
  var artists = responseObject.artists.artist;
  artists.forEach(function(artist) {
    var imgsrc = artist.image[2]['#text'];
    var name = artist.name;
    var processFunction = function() {
      var request = new ArtistRequest();
      request.getInfo(artist.name);
      return false;
    }
    divArtists.appendChild(DivFactory.createContainer(imgsrc, name, processFunction));
  });
  fragment.appendChild(divArtists);

  var currentPage = parseInt(responseObject.artists['@attr'].page);
  var totalPages = parseInt(responseObject.artists['@attr'].totalPages);

  fragment.appendChild(DivFactory.createPagination(currentPage, totalPages,
    function() {
      var request = new ChartRequest();
      request.getTopArtists(this.textContent);
      return false;
    }));

  var content = document.getElementById('content');
  content.innerHTML = '';
  content.appendChild(fragment);
}

Handler.processSearch = function (responseObject) {
    var fragment = document.createDocumentFragment();

    var searchbar = document.querySelector('.search-bar');
    searchbar = searchbar ? searchbar : DivFactory.createSearchbar();
    fragment.appendChild(searchbar);

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
    var artistName = responseObject.results["@attr"].for;
    fragment.appendChild(DivFactory.createPagination(currentPage, totalPages,
      function() {
        var request = new ArtistRequest();
        request.search(artistName, this.textContent);
        return false;
      }));

    var content = document.getElementById('content');
    content.innerHTML = '';
    content.appendChild(fragment);
}

Handler.processGetArtistInfo = function (responseObject){
  var fragment = document.createDocumentFragment();

  var info = document.createElement('div');
  info.className = 'info';

  var name = responseObject.artist.name;
  var numberLikes = parseInt(Math.random() * 5);
  info.appendChild(DivFactory.createWrapper(name, numberLikes));

  var imgsrc = responseObject.artist.image[2]["#text"];
  var description = DivFactory.createDescription(imgsrc);
  var bio = document.createElement('div');
  bio.innerHTML = responseObject.artist.bio.content;

  description.appendChild(bio);
  info.appendChild(description);
  fragment.appendChild(info);

  var content = document.getElementById('content');
  content.innerHTML = '';
  content.appendChild(fragment);
  var albumsRequest = new ArtistRequest();
  albumsRequest.getTopAlbums(name);
}

Handler.processGetTopAlbums = function (responseObject){
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
      var name = album.artist.name;
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

  var content = document.getElementById('content');
  content.appendChild(fragment);
}

Handler.processGetAlbumInfo = function (responseObject){
  var fragment = document.createDocumentFragment();

  var info = document.createElement('div');
  info.className = 'info';

  var albumName = responseObject.album.name;
  var numberLikes = parseInt(Math.random() * 5);

  info.appendChild(DivFactory.createWrapper(albumName, numberLikes));

  var imgsrc = responseObject.album.image[2]["#text"];
  var description = DivFactory.createDescription(imgsrc);

  var artistDiv = document.createElement('div');
  artistDiv.textContent = 'Artist: ' + responseObject.album.artist;
  var urlDiv = document.createElement('div');
  urlDiv.textContent = 'Link: ';
  var url =  document.createElement('a');
  url.href = responseObject.album.url
  url.textContent = url.href;
  urlDiv.appendChild(url);
  var tags = responseObject.album.tags.tag;
  var tagsDiv = document.createElement('div');
  tagsDiv.textContent = 'Tags: ';
  tags.forEach(function(tag, index, array){
    if (index == array.length - 1) {
      tagsDiv.textContent += (tag.name + '.');
      return;
    }
    tagsDiv.textContent += (tag.name + ', ');
  });
  description.appendChild(artistDiv);
  description.appendChild(urlDiv);
  description.appendChild(tagsDiv);

  info.appendChild(description);
  fragment.appendChild(info);

  var tracksDiv = document.createElement('div');
  tracksDiv.id = 'tracks';
  tracksDiv.textContent = 'Tracks:'
  var tracks = responseObject.album.tracks.track;
  tracks.forEach(function(track, index){
    var trackDiv = document.createElement('div');
    trackDiv.className = 'track';
    var trackName = document.createElement('div');
    trackName.textContent = index + '. ' + track.name;
    var link = document.createElement('a');
    link.href = track.url;
    link.textContent = link.href;
    trackDiv.appendChild(trackName);
    trackDiv.appendChild(link);
    tracksDiv.appendChild(trackDiv)
  });
  fragment.appendChild(tracksDiv);
  var content = document.getElementById('content');
  content.innerHTML = '';
  content.appendChild(fragment);
}
