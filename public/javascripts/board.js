define(['markers'], function(Markers) {
  var Board = Class.extend({
    init: function() {
      this.markers = new Markers();
    },

    setMarker: function(marker) {
      if (this.markers.addMarker(marker)) {
        return true;
      }
      return false;
    }


  });

  return Board;
});