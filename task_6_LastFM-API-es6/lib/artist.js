"use strict"

class ArtistRequest extends Request {
  constructor() {
    super();
  }

  search(artistName, page, handler) {
    let params = {
      method: 'artist.search',
      artist: artistName
    }
    if (page) {
      params.page = page;
    }
    this.load(params, handler);
  }

  getInfo(artistName, handler) {
    this.load({
      method: 'artist.getinfo',
      artist: artistName
    }, handler);
  }

  getTopAlbums(artistName, page, handler) {
    let params = {
      method: 'artist.gettopalbums',
      artist: artistName
    }
    if (page) {
      params.page = page;
    }
    this.load(params, handler);
  }
};
