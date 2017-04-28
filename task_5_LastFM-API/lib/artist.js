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
  var request = this.load(params);

  request.addEventListener('readystatechange', function() {
    if (request.readyState != 4) return;
    if (request.status == 200) {
      var jsonObject = JSON.parse(request.responseText);
      console.log(jsonObject);
      var content = document.getElementById('content');
      content.innerHTML = '';
      var fragment = document.createDocumentFragment();

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
      searchbarForm.onsubmit = function() {
        console.log(this);
        console.dir(this);
        var request = new ArtistRequest();
        alert(this.elements[0].value);
        request.search(this.elements[0].value);
        return false;
      }
      searchbar.appendChild(searchbarForm);

      fragment.appendChild(searchbar);

      var divArtists = document.createElement('div');
      divArtists.id = 'artists';
      var artists = jsonObject.results.artistmatches.artist;
      artists.forEach(function(artist) {
        var container = document.createElement('div');
        container.className = 'container';
        var logo = document.createElement('a');
        logo.className = 'logo';
        logo.href = '#';
        var logoImg = document.createElement('img');
        logoImg.src = artist.image[2]['#text'];
        logoImg.onclick = function() {
          alert(artist.name);
          var request = new ArtistRequest();
          request.getInfo(artist.name);
          return false;
        }
        logo.appendChild(logoImg);
        var label = document.createElement('a');
        label.href = '#';
        label.className = 'label';
        label.textContent = artist.name;
        label.onclick = function() {
          alert(artist.name);
          var request = new ArtistRequest();
          request.getInfo(artist.name);
          return false;
        }
        container.appendChild(logo);
        container.appendChild(label);
        divArtists.appendChild(container);
      })

      fragment.appendChild(divArtists);

      var currentPage = parseInt(jsonObject.results["opensearch:Query"].startPage);
      var artistsPerPage = parseInt(jsonObject.results["opensearch:itemsPerPage"])
      var totalResults = parseInt(jsonObject.results["opensearch:totalResults"]);
      var totalPages = parseInt(totalResults / artistsPerPage) + 1;
      console.log(totalPages);
      var firstPage = currentPage - 3;
      var lastPage = currentPage + 3;
      if ( firstPage < 1) {
        lastPage += (-firstPage + 1);
        firstPage = 1;
      }
      if (lastPage > totalPages){
        lastPage = totalPages;
      }

      var pagination = document.createElement('div');
      pagination.className = 'pagination';
      for (var i = firstPage; i <= lastPage; i++){
        var page = null;
        if ( i == currentPage) {
          page = document.createElement('span');

        } else {
          page = document.createElement('a');
          page.href = '#';
          page.onclick = function() {
            var request = new ArtistRequest();
            request.search(name, this.textContent);
            return false;
          }
        }
        page.textContent = i;
        page.className = 'page';
        pagination.appendChild(page);
      }

      fragment.appendChild(pagination);

      content.appendChild(fragment);
    } else {
      console.log('error: request status ' + request.status);
    }
  });
};

ArtistRequest.prototype.getInfo = function(name) {
  var request = this.load({
    method:'artist.getinfo',
    artist: name
  });
  request.addEventListener('readystatechange', function() {
    if (request.readyState != 4) return;
    if (request.status == 200) {
      var jsonObject = JSON.parse(request.responseText);
      console.log(jsonObject);
      var content = document.getElementById('content');
      content.innerHTML = '';
      var fragment = document.createDocumentFragment();

      var info = document.createElement('div');
      info.className = 'info';
      var wrapper =  document.createElement('div');
      wrapper.className = 'wrapper';
      var nameDiv = document.createElement('div');
      nameDiv.className = 'name';
      nameDiv.textContent = name;

      wrapper.appendChild(nameDiv);

      var likes = document.createElement('div');
      likes.className = 'likes';
      var numberLikes = parseInt(Math.random() * 5);
      for (var i = 0; i < 5; i++){
        var like = document.createElement('a');
        like.href = '#';
        if ( i < numberLikes) {
          like.className = 'like';
        } else {
          like.className = 'dislike';
        }
        likes.appendChild(like);
      }

      wrapper.appendChild(likes);
      info.appendChild(wrapper);

      var description = document.createElement('div');
      description.className = 'description';
      var img = document.createElement('img');
      img.src = jsonObject.artist.image[2]["#text"];
      description.appendChild(img);
      var bio = document.createElement('div');
      bio.innerHTML = jsonObject.artist.bio.content;

      description.appendChild(bio);
      info.appendChild(description);
      fragment.appendChild(info);
      content.appendChild(fragment);
      var albumsRequest = new ArtistRequest();
      albumsRequest.getTopAlbums(name);
    } else {
      console.log('error: request status ' + request.status);
    }
  });
};

ArtistRequest.prototype.getTopAlbums = function(name, page) {
  var params = {
    method:'artist.gettopalbums',
    artist: name
  }
  if (page != undefined) {
    params.page = page;
  }
  var request = this.load(params);

  request.addEventListener('readystatechange', function() {
    if (request.readyState != 4) return;
    if (request.status == 200) {
      var jsonObject = JSON.parse(request.responseText);
      console.log(jsonObject);
      var content = document.getElementById('content');
      var fragment = document.createDocumentFragment();

      var albumsDiv = document.getElementById('albums');
      if (albumsDiv) {
        albumsDiv.innerHTML = '';
      } else {
        albumsDiv = document.createElement('div');
        albumsDiv.id = 'albums'
      }
      var albums = jsonObject.topalbums.album;
      albums.forEach(function(album) {
        var container = document.createElement('div');
        container.className = 'container';
        var logo = document.createElement('a');
        logo.className = 'logo';
        logo.href = '#';
        var logoImg = document.createElement('img');
        logoImg.src = album.image[2]['#text'];
        logoImg.onclick = function() {
          alert(album.name);
          var request = new AlbumRequest();
          request.getAlbumInfo(name, album.name);
          return false;
        }
        logo.appendChild(logoImg);
        var label = document.createElement('a');
        label.href = '#';
        label.className = 'label';
        label.textContent = album.name;
        label.onclick = function() {
          alert(album.name);
          var request = new AlbumRequest();
          request.getAlbumInfo(name, album.name);
          return false;
        }
        container.appendChild(logo);
        container.appendChild(label);
        albumsDiv.appendChild(container);
      })


      var currentPage = parseInt(jsonObject.topalbums['@attr'].page);
      var totalPages = parseInt(jsonObject.topalbums['@attr'].totalPages);
      var firstPage = currentPage - 3;
      var lastPage = currentPage + 3;
      if ( firstPage < 1) {
        lastPage += (-firstPage + 1);
        firstPage = 1;
      }
      if (lastPage > totalPages){
        lastPage = totalPages;
      }
      console.log(firstPage, lastPage, currentPage);
      var pagination = document.createElement('div');
      pagination.className = 'pagination';
      for (var i = firstPage; i <= lastPage; i++){
        var page = null;
        if ( i == currentPage) {
          page = document.createElement('span');

        } else {
          page = document.createElement('a');
          page.href = '#';
          page.onclick = function() {
            var request = new ArtistRequest();
            request.getTopAlbums(name, this.textContent);
            return false;
          }
        }
        page.textContent = i;
        page.className = 'page';
        pagination.appendChild(page);
      }
      console.dir(pagination)
      albumsDiv.appendChild(pagination);
      fragment.appendChild(albumsDiv);
      content.appendChild(fragment);
    } else {
      console.log('error: request status ' + request.status);
    }
  });
};
