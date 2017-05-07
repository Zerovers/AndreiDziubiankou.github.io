"use strict"

class ChartRequest extends Request {

  constructor() {
    super();
  }

  getTopArtists(page, handler) {
    let params = {
      method: 'chart.gettopartists',
    }
    if (page) {
      params.page = page;
    }
    this.load(params, handler);
  }
};
