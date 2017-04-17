"use strict"

function ChartRequest() {};

ChartRequest.prototype = Request.prototype;

ChartRequest.prototype.getTopArtists = function() {
  return this.load('chart.gettopartists&limit=10').artists.artist;
};
