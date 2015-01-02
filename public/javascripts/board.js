define(function() {
  var Board = Class.extend({
    init: function() {
      this.markers = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ];
    },

    addMarker: function(marker) {
      if (!marker || this.getMarkerAt(marker.x, marker.y)) {
        return false;
      }

      this.markers[marker.y][marker.x] = marker;

      return true;
    },

    getMarkerAt: function(x, y) {
      if (!this.markers[y]) {
        return false;
      }
      return this.markers[y][x] || false;
    },
    
    getAvailableMoves: function() {
      var moves = [];

      for (var x = 0; x < 3; x++)
        for (var y = 0; y < 3; y++)
          if (!this.getMarkerAt(x, y))
            moves.push({ x: x, y: y });

      return moves;
    }
  });

  return Board;
});