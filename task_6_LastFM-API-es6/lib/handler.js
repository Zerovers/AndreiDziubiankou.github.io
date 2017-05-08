"use strict"
class Handler {

  static processGetTopArtists(responseObject) {
    let fragment = document.createDocumentFragment();

    let searchbar = document.querySelector('.search-bar');
    searchbar = searchbar ? searchbar : DivFactory.createSearchbar();
    fragment.appendChild(searchbar);

    let divArtists = document.createElement('div');
    divArtists.id = 'artists';
    let artists = responseObject.artists.artist;
    artists.forEach( artist => {
      let imgsrc = artist.image[2]['#text'];
      let name = artist.name;
      let processFunction = () => {
        let request = new ArtistRequest();
        request.getInfo(artist.name, Handler.processGetArtistInfo);
        return false;
      }
      divArtists.appendChild(DivFactory.createContainer(imgsrc, name, processFunction));
    });
    fragment.appendChild(divArtists);

    let currentPage = parseInt(responseObject.artists['@attr'].page);
    let totalPages = parseInt(responseObject.artists['@attr'].totalPages);

    fragment.appendChild(DivFactory.createPagination(currentPage, totalPages,
      (page) => {
        let request = new ChartRequest();
        request.getTopArtists(page.textContent, Handler.processGetTopArtists);
        return false;
      }));

    let content = document.getElementById('content');
    content.innerHTML = '';
    content.appendChild(fragment);
  }

  static processSearch(responseObject) {
    let fragment = document.createDocumentFragment();

    let searchbar = document.querySelector('.search-bar');
    searchbar = searchbar ? searchbar : DivFactory.createSearchbar();
    fragment.appendChild(searchbar);

    let divArtists = document.createElement('div');
    divArtists.id = 'artists';
    let artists = responseObject.results.artistmatches.artist;
    artists.forEach(artist => {
      let imgsrc = artist.image[2]['#text'];
      let name = artist.name;
      let processFunction = () => {
        let request = new ArtistRequest();
        request.getInfo(artist.name, Handler.processGetArtistInfo);
        return false;
      }
      divArtists.appendChild(DivFactory.createContainer(imgsrc, name, processFunction));
    })

    fragment.appendChild(divArtists);

    let currentPage = parseInt(responseObject.results['opensearch:Query'].startPage);
    let artistsPerPage = parseInt(responseObject.results['opensearch:itemsPerPage'])
    let totalResults = parseInt(responseObject.results['opensearch:totalResults']);
    let totalPages = parseInt(totalResults / artistsPerPage) + 1;
    let artistName = responseObject.results['@attr'].for;
    fragment.appendChild(DivFactory.createPagination(currentPage, totalPages,
      (page)=> {
        let request = new ArtistRequest();
        request.search(artistName, page.textContent, Handler.processSearch);
        return false;
      }));

    let content = document.getElementById('content');
    content.innerHTML = '';
    content.appendChild(fragment);
  }

  static processGetArtistInfo(responseObject) {
    let fragment = document.createDocumentFragment();

    let info = document.createElement('div');
    info.className = 'info';

    let name = responseObject.artist.name;
    let numberLikes = parseInt(Math.random() * 5);
    info.appendChild(DivFactory.createWrapper(name, numberLikes));

    let imgsrc = responseObject.artist.image[2]['#text'];
    let description = DivFactory.createDescription(imgsrc);
    let bio = document.createElement('div');
    bio.innerHTML = responseObject.artist.bio.content;

    description.appendChild(bio);
    info.appendChild(description);
    fragment.appendChild(info);

    let content = document.getElementById('content');
    content.innerHTML = '';
    content.appendChild(fragment);
    let albumsRequest = new ArtistRequest();
    albumsRequest.getTopAlbums(name, null, Handler.processGetTopAlbums);
  }

  static processGetTopAlbums(responseObject) {
    let fragment = document.createDocumentFragment();

    let albumsDiv = document.getElementById('albums');
    if (albumsDiv) {
      albumsDiv.innerHTML = '';
    } else {
      albumsDiv = document.createElement('div');
      albumsDiv.id = 'albums'
    }
    let albums = responseObject.topalbums.album;
    albums.forEach(album => {
      let imgsrc = album.image[2]['#text'];
      let albumName = album.name;
      let processFunction = () => {
        let request = new AlbumRequest();
        let name = album.artist.name;
        request.getAlbumInfo(name, album.name, Handler.processGetAlbumInfo);
        return false;
      }
      albumsDiv.appendChild(DivFactory.createContainer(imgsrc, albumName, processFunction));
    })

    let currentPage = parseInt(responseObject.topalbums['@attr'].page);
    let totalPages = parseInt(responseObject.topalbums['@attr'].totalPages);
    let artistName = responseObject.topalbums['@attr'].artist;

    albumsDiv.appendChild(DivFactory.createPagination(currentPage, totalPages,
      (page) => {
        let request = new ArtistRequest();
        request.getTopAlbums(artistName, page.textContent, Handler.processGetTopAlbums);
        return false;
      }));

    fragment.appendChild(albumsDiv);

    let content = document.getElementById('content');
    content.appendChild(fragment);
  }

  static processGetAlbumInfo(responseObject) {
    let fragment = document.createDocumentFragment();

    let info = document.createElement('div');
    info.className = 'info';

    let albumName = responseObject.album.name;
    let numberLikes = parseInt(Math.random() * 5);

    info.appendChild(DivFactory.createWrapper(albumName, numberLikes));

    let imgsrc = responseObject.album.image[2]['#text'];
    let description = DivFactory.createDescription(imgsrc);

    let artistDiv = document.createElement('div');
    artistDiv.textContent = `Artist: ${responseObject.album.artist}`;
    let urlDiv = document.createElement('div');
    urlDiv.textContent = 'Link: ';
    let url = document.createElement('a');
    url.href = responseObject.album.url;
    url.textContent = url.href;
    urlDiv.appendChild(url);
    let tags = responseObject.album.tags.tag;
    let tagsDiv = document.createElement('div');
    tagsDiv.textContent = 'Tags: ';
    tags.forEach((tag, index, array) => {
      if (index == array.length - 1) {
        tagsDiv.textContent += `${tag.name}.`;
        return;
      }
      tagsDiv.textContent += `${tag.name}, `;
    });
    description.appendChild(artistDiv);
    description.appendChild(urlDiv);
    description.appendChild(tagsDiv);

    info.appendChild(description);
    fragment.appendChild(info);

    let tracksDiv = document.createElement('div');
    tracksDiv.id = 'tracks';
    tracksDiv.textContent = 'Tracks:'
    let tracks = responseObject.album.tracks.track;
    tracks.forEach((track, index) => {
      let trackDiv = document.createElement('div');
      trackDiv.className = 'track';
      let trackName = document.createElement('div');
      trackName.textContent = `${index}. ${track.name}`;
      let link = document.createElement('a');
      link.href = track.url;
      link.textContent = link.href;
      trackDiv.appendChild(trackName);
      trackDiv.appendChild(link);
      tracksDiv.appendChild(trackDiv)
    });
    fragment.appendChild(tracksDiv);
    let content = document.getElementById('content');
    content.innerHTML = '';
    content.appendChild(fragment);
  }
}
