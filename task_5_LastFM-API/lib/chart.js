"use strict"

function ChartRequest() {};

ChartRequest.prototype = Object.create(Request.prototype);

ChartRequest.prototype.getTopArtists = function(page) {
  var params = {
    method: 'chart.gettopartists',
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
      var artists = jsonObject.artists.artist;
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

      var currentPage = parseInt(jsonObject.artists['@attr'].page);
      var totalPages = parseInt(jsonObject.artists['@attr'].totalPages);
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
            var request = new ChartRequest();
            request.getTopArtists(this.textContent);
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
      console.log('error: request status ' + xhr.status);
    }
  });
};
