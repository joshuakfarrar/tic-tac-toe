define(function() {
  var Markers = Class.extend({
    init: function() {
      this.markers = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ]
    },

    addMarker: function(marker) {
      if (this.getMarkerAt(marker.x, marker.y)) {
        return false;
      }

      this.markers[marker.y][marker.x] = marker;

      return true;
    },

    getMarkerAt: function(x, y) {
      if (!this.markers[y]) {
        return false;
      }
      return this.markers[y][x];
    }
  });

  return Markers;
});