define(['markers'], function(Markers) {
  var Board = Class.extend({
    init: function() {
      this.markers = new Markers();
    },

    addMarker: function(marker) {
      if (this.markers.addMarker(marker)) {
        return true;
      }
      return false;
    },

    getMarkerAt: function(x, y) {
      return this.markers.getMarkerAt(x, y) || false;
    }


  });

  return Board;
});