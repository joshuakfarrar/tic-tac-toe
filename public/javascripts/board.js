define(function() {
  var Board = Class.extend({
    init: function() {
      this.markers = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ]
    },

    setMarker: function(marker) {
      if (!marker) {
        return false;
      }

      if (this.markerAlreadyExistsAt(marker.x, marker.y)) {
        return false;
      }

      this.markers[marker.y][marker.x] = marker;

      return true;
    },

    markerAlreadyExistsAt: function(x, y) {
      if (this.markers[y][x] === null) {
        return false;
      }
      return true;
    }


  });

  return Board;
});