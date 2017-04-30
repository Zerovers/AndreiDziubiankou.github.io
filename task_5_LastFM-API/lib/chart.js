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
  this.load(params, processFunction);

  function processFunction(responseObject){
    var content = document.getElementById('content');
    content.innerHTML = '';
    var fragment = document.createDocumentFragment();

    fragment.appendChild(DivFactory.createSearchbar());

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

    content.appendChild(fragment);
  }
};
