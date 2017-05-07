"use strict"

class AlbumRequest extends Request {

  constructor() {
    super();
  }

  getAlbumInfo(artistName, albumName, handler) {
    let params = {
      method: 'album.getinfo',
      artist: artistName,
      album: albumName
    }
    this.load(params, handler);
  }
};
