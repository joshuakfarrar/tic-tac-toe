define(function() {
  var Solver = Class.extend({
    init: function(board) {
      this.board = board;
      this.markers = ['x', 'o'];

      this.victor = false;
    },

    victoryConditionsMet: function() {
      for (var i = 0; i < 3; i++) {
        this.checkRow([this.board.markers[i][0], this.board.markers[i][1], this.board.markers[i][2]]);
        this.checkRow([this.board.markers[0][i], this.board.markers[1][i], this.board.markers[2][i]]);

        // why continue if we have a winner?
        if (this.victor) {
          return this.victor;
        }
      }

      this.checkRow([this.board.markers[0][0], this.board.markers[1][1], this.board.markers[2][2]]);
      this.checkRow([this.board.markers[2][0], this.board.markers[1][1], this.board.markers[0][2]]);

      return this.victor;
    },

    checkRow: function(row) {
      var self = this;

      _.each(this.markers, function(markerBeingChecked) {
        if (row[0] === null || row[1] === null || row[2] === null) {
          return false;
        }

        if (self.verifyMarkerTypes(row, markerBeingChecked)) {
          self.victor = true;
        }
      });
    },

    verifyMarkerTypes: function(row, markerBeingChecked) {
      return ((row[0].name == markerBeingChecked) && (row[1].name == markerBeingChecked)) && (row[2].name == markerBeingChecked);
    }
  });

  return Solver;
});