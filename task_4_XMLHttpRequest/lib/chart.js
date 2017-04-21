"use strict"

function ChartRequest() {};

ChartRequest.prototype = Object.create(Request.prototype);

ChartRequest.prototype.getTopArtists = function() {
  this.load({
    method: 'chart.gettopartists'
  });
};
