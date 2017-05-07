"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Request = function () {
  function Request() {
    _classCallCheck(this, Request);
  }

  _createClass(Request, [{
    key: 'load',
    value: function load(params, processFunction) {
      var paramsInString = '';
      for (var key in params) {
        paramsInString += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&';
      }
      console.log(paramsInString);
      var urlPrefix = 'http://ws.audioscrobbler.com/2.0/?';
      var api_key_json = 'api_key=2d8e897e2945bd2b4f1d70369c7449e2&format=json';
      fetch(urlPrefix + paramsInString + api_key_json).then(function (response) {
        if (response.status == 200) {
          var responseObject = response.json();
          console.log(responseObject);
          return responseObject;
        } else {
          throw response;
        }
      }).then(function (responseObject) {
        processFunction(responseObject);
      }).catch(function (response) {
        console.log('error: request status ' + response.status);
      });
    }
  }]);

  return Request;
}();

;

"use strict";

var AlbumRequest = function (_Request) {
  _inherits(AlbumRequest, _Request);

  function AlbumRequest() {
    _classCallCheck(this, AlbumRequest);

    return _possibleConstructorReturn(this, (AlbumRequest.__proto__ || Object.getPrototypeOf(AlbumRequest)).call(this));
  }

  _createClass(AlbumRequest, [{
    key: 'getAlbumInfo',
    value: function getAlbumInfo(artistName, albumName, handler) {
      var params = {
        method: 'album.getinfo',
        artist: artistName,
        album: albumName
      };
      this.load(params, handler);
    }
  }]);

  return AlbumRequest;
}(Request);

;

"use strict";

var ArtistRequest = function (_Request2) {
  _inherits(ArtistRequest, _Request2);

  function ArtistRequest() {
    _classCallCheck(this, ArtistRequest);

    return _possibleConstructorReturn(this, (ArtistRequest.__proto__ || Object.getPrototypeOf(ArtistRequest)).call(this));
  }

  _createClass(ArtistRequest, [{
    key: 'search',
    value: function search(artistName, page, handler) {
      var params = {
        method: 'artist.search',
        artist: artistName
      };
      if (page) {
        params.page = page;
      }
      this.load(params, handler);
    }
  }, {
    key: 'getInfo',
    value: function getInfo(artistName, handler) {
      this.load({
        method: 'artist.getinfo',
        artist: artistName
      }, handler);
    }
  }, {
    key: 'getTopAlbums',
    value: function getTopAlbums(artistName, page, handler) {
      var params = {
        method: 'artist.gettopalbums',
        artist: artistName
      };
      if (page) {
        params.page = page;
      }
      this.load(params, handler);
    }
  }]);

  return ArtistRequest;
}(Request);

;

"use strict";

var ChartRequest = function (_Request3) {
  _inherits(ChartRequest, _Request3);

  function ChartRequest() {
    _classCallCheck(this, ChartRequest);

    return _possibleConstructorReturn(this, (ChartRequest.__proto__ || Object.getPrototypeOf(ChartRequest)).call(this));
  }

  _createClass(ChartRequest, [{
    key: 'getTopArtists',
    value: function getTopArtists(page, handler) {
      var params = {
        method: 'chart.gettopartists'
      };
      if (page) {
        params.page = page;
      }
      this.load(params, handler);
    }
  }]);

  return ChartRequest;
}(Request);

;

"use strict";

var DivFactory = function () {
  function DivFactory() {
    _classCallCheck(this, DivFactory);
  }

  _createClass(DivFactory, null, [{
    key: 'createContainer',
    value: function createContainer(imgsrc, name, processFunction) {
      var container = document.createElement('div');
      container.className = 'container';
      var logo = document.createElement('a');
      logo.className = 'logo';
      logo.href = '#';
      var logoImg = document.createElement('img');
      logoImg.src = imgsrc;
      logoImg.onclick = processFunction;
      logo.appendChild(logoImg);
      var label = document.createElement('a');
      label.href = '#';
      label.className = 'label';
      label.textContent = name;
      label.onclick = processFunction;
      container.appendChild(logo);
      container.appendChild(label);
      return container;
    }
  }, {
    key: 'createSearchbar',
    value: function createSearchbar() {
      var searchbar = document.createElement('div');
      searchbar.className = 'search-bar';
      var searchbarForm = document.createElement('form');
      var inputText = document.createElement('input');
      inputText.type = 'text';
      inputText.required = true;
      inputText.placeholder = 'Name of artist...';
      var submit = document.createElement('input');
      submit.type = 'submit';
      submit.value = 'Search';
      searchbarForm.appendChild(inputText);
      searchbarForm.appendChild(submit);
      searchbarForm.onsubmit = function () {
        var request = new ArtistRequest();
        request.search(searchbarForm.elements[0].value, null, Handler.processSearch);
        inputText.value = '';
        return false;
      };
      searchbar.appendChild(searchbarForm);
      return searchbar;
    }
  }, {
    key: 'createPagination',
    value: function createPagination(currentPage, totalPages, processFunction) {
      var firstPage = currentPage - 3;
      var lastPage = currentPage + 3;
      if (firstPage < 1) {
        lastPage += -firstPage + 1;
        firstPage = 1;
      }
      if (lastPage > totalPages) {
        lastPage = totalPages;
      }
      var pagination = document.createElement('div');
      pagination.className = 'pagination';
      for (var i = firstPage; i <= lastPage; i++) {
        var page = null;
        if (i == currentPage) {
          page = document.createElement('span');
        } else {
          page = document.createElement('a');
          page.href = '#';
          page.onclick = processFunction;
        }
        page.textContent = i;
        page.className = 'page';
        pagination.appendChild(page);
      }
      return pagination;
    }
  }, {
    key: 'createWrapper',
    value: function createWrapper(name, numberLikes) {
      var wrapper = document.createElement('div');
      wrapper.className = 'wrapper';
      var nameDiv = document.createElement('div');
      nameDiv.className = 'name';
      nameDiv.textContent = name;

      wrapper.appendChild(nameDiv);

      var likesDiv = document.createElement('div');
      likesDiv.className = 'likes';
      for (var i = 0; i < 5; i++) {
        var like = document.createElement('a');
        like.href = '#';
        if (i < numberLikes) {
          like.className = 'like';
        } else {
          like.className = 'dislike';
        }
        likesDiv.appendChild(like);
      }

      wrapper.appendChild(likesDiv);
      return wrapper;
    }
  }, {
    key: 'createDescription',
    value: function createDescription(imgsrc) {
      var description = document.createElement('div');
      description.className = 'description';
      var img = document.createElement('img');
      img.src = imgsrc;
      description.appendChild(img);
      return description;
    }
  }]);

  return DivFactory;
}();

"use strict";

var Handler = function () {
  function Handler() {
    _classCallCheck(this, Handler);
  }

  _createClass(Handler, null, [{
    key: 'processGetTopArtists',
    value: function processGetTopArtists(responseObject) {
      var fragment = document.createDocumentFragment();

      var searchbar = document.querySelector('.search-bar');
      searchbar = searchbar ? searchbar : DivFactory.createSearchbar();
      fragment.appendChild(searchbar);

      var divArtists = document.createElement('div');
      divArtists.id = 'artists';
      var artists = responseObject.artists.artist;
      artists.forEach(function (artist) {
        var imgsrc = artist.image[2]['#text'];
        var name = artist.name;
        var processFunction = function processFunction() {
          var request = new ArtistRequest();
          request.getInfo(artist.name, Handler.processGetArtistInfo);
          return false;
        };
        divArtists.appendChild(DivFactory.createContainer(imgsrc, name, processFunction));
      });
      fragment.appendChild(divArtists);

      var currentPage = parseInt(responseObject.artists['@attr'].page);
      var totalPages = parseInt(responseObject.artists['@attr'].totalPages);

      fragment.appendChild(DivFactory.createPagination(currentPage, totalPages, function () {
        var request = new ChartRequest();
        request.getTopArtists(this.textContent, Handler.processGetTopArtists);
        return false;
      }));

      var content = document.getElementById('content');
      content.innerHTML = '';
      content.appendChild(fragment);
    }
  }, {
    key: 'processSearch',
    value: function processSearch(responseObject) {
      var fragment = document.createDocumentFragment();

      var searchbar = document.querySelector('.search-bar');
      searchbar = searchbar ? searchbar : DivFactory.createSearchbar();
      fragment.appendChild(searchbar);

      var divArtists = document.createElement('div');
      divArtists.id = 'artists';
      var artists = responseObject.results.artistmatches.artist;
      artists.forEach(function (artist) {
        var imgsrc = artist.image[2]['#text'];
        var name = artist.name;
        var processFunction = function processFunction() {
          var request = new ArtistRequest();
          request.getInfo(artist.name, Handler.processGetArtistInfo);
          return false;
        };
        divArtists.appendChild(DivFactory.createContainer(imgsrc, name, processFunction));
      });

      fragment.appendChild(divArtists);

      var currentPage = parseInt(responseObject.results["opensearch:Query"].startPage);
      var artistsPerPage = parseInt(responseObject.results["opensearch:itemsPerPage"]);
      var totalResults = parseInt(responseObject.results["opensearch:totalResults"]);
      var totalPages = parseInt(totalResults / artistsPerPage) + 1;
      var artistName = responseObject.results["@attr"].for;
      fragment.appendChild(DivFactory.createPagination(currentPage, totalPages, function () {
        var request = new ArtistRequest();
        request.search(artistName, this.textContent, Handler.processSearch);
        return false;
      }));

      var content = document.getElementById('content');
      content.innerHTML = '';
      content.appendChild(fragment);
    }
  }, {
    key: 'processGetArtistInfo',
    value: function processGetArtistInfo(responseObject) {
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
      albumsRequest.getTopAlbums(name, null, Handler.processGetTopAlbums);
    }
  }, {
    key: 'processGetTopAlbums',
    value: function processGetTopAlbums(responseObject) {
      var fragment = document.createDocumentFragment();

      var albumsDiv = document.getElementById('albums');
      if (albumsDiv) {
        albumsDiv.innerHTML = '';
      } else {
        albumsDiv = document.createElement('div');
        albumsDiv.id = 'albums';
      }
      var albums = responseObject.topalbums.album;
      albums.forEach(function (album) {
        var imgsrc = album.image[2]['#text'];
        var albumName = album.name;
        var processFunction = function processFunction() {
          var request = new AlbumRequest();
          var name = album.artist.name;
          request.getAlbumInfo(name, album.name, Handler.processGetAlbumInfo);
          return false;
        };
        albumsDiv.appendChild(DivFactory.createContainer(imgsrc, albumName, processFunction));
      });

      var currentPage = parseInt(responseObject.topalbums['@attr'].page);
      var totalPages = parseInt(responseObject.topalbums['@attr'].totalPages);
      var artistName = responseObject.topalbums["@attr"].artist;

      albumsDiv.appendChild(DivFactory.createPagination(currentPage, totalPages, function () {
        var request = new ArtistRequest();
        request.getTopAlbums(artistName, this.textContent, Handler.processGetTopAlbums);
        return false;
      }));

      fragment.appendChild(albumsDiv);

      var content = document.getElementById('content');
      content.appendChild(fragment);
    }
  }, {
    key: 'processGetAlbumInfo',
    value: function processGetAlbumInfo(responseObject) {
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
      var url = document.createElement('a');
      url.href = responseObject.album.url;
      url.textContent = url.href;
      urlDiv.appendChild(url);
      var tags = responseObject.album.tags.tag;
      var tagsDiv = document.createElement('div');
      tagsDiv.textContent = 'Tags: ';
      tags.forEach(function (tag, index, array) {
        if (index == array.length - 1) {
          tagsDiv.textContent += tag.name + '.';
          return;
        }
        tagsDiv.textContent += tag.name + ', ';
      });
      description.appendChild(artistDiv);
      description.appendChild(urlDiv);
      description.appendChild(tagsDiv);

      info.appendChild(description);
      fragment.appendChild(info);

      var tracksDiv = document.createElement('div');
      tracksDiv.id = 'tracks';
      tracksDiv.textContent = 'Tracks:';
      var tracks = responseObject.album.tracks.track;
      tracks.forEach(function (track, index) {
        var trackDiv = document.createElement('div');
        trackDiv.className = 'track';
        var trackName = document.createElement('div');
        trackName.textContent = index + '. ' + track.name;
        var link = document.createElement('a');
        link.href = track.url;
        link.textContent = link.href;
        trackDiv.appendChild(trackName);
        trackDiv.appendChild(link);
        tracksDiv.appendChild(trackDiv);
      });
      fragment.appendChild(tracksDiv);
      var content = document.getElementById('content');
      content.innerHTML = '';
      content.appendChild(fragment);
    }
  }]);

  return Handler;
}();

"use strict";
var header = document.querySelector('header a');
header.onclick = indexRequest;

function indexRequest() {
  var request = new ChartRequest();
  request.getTopArtists(null, Handler.processGetTopArtists);
  return false;
}

indexRequest();