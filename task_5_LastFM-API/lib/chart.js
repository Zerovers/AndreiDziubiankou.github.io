"use strict"

function ChartRequest() {};

ChartRequest.prototype = Object.create(Request.prototype);

ChartRequest.prototype.getTopArtists = function(page) {
  var params = {
    method: 'chart.gettopartists',
  }
  if (page) {
    params.page = page;
  }
  this.load(params, Handler.processGetTopArtists);
};
