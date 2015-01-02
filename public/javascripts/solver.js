define(['x', 'o'], function(X, O) {
  var Solver = Class.extend({
    init: function(board) {
      this.board = board;
      this.winner = false;
    },
    
    hasWinner: function() {
      return !!this.winner;
    },

    checkVictoryConditions: function() {
      this.winner = this.winningRow() || this.winningColumn() || this.winningDiagonal() || this.winningReverseDiagonal();
    },
    
    winningRow: function() {
      var candidate;
      for (var i = 0; i < 3; i++) {
        candidate = this.checkRow([this.board.getMarkerAt(i, 0), this.board.getMarkerAt(i, 1), this.board.getMarkerAt(i, 2)]);
        if (candidate) return candidate;
      }
    },
    
    winningColumn: function() {
      var candidate;
      for (var i = 0; i < 3; i++) {
        candidate = this.checkRow([this.board.getMarkerAt(0, i), this.board.getMarkerAt(1, i), this.board.getMarkerAt(2, i)]);
        if (candidate) return candidate;
      }
    },
    
    winningDiagonal: function() {
      var candidate = this.checkRow([this.board.getMarkerAt(0, 0), this.board.getMarkerAt(1, 1), this.board.getMarkerAt(2, 2)]);
      if (candidate) return candidate;
    },
    
    winningReverseDiagonal: function() {
      var candidate = this.checkRow([this.board.getMarkerAt(2, 0), this.board.getMarkerAt(1, 1), this.board.getMarkerAt(0, 2)]);
      if (candidate) return candidate;
    },

    checkRow: function(row, cb) {
      var self = this;

      // no async magic here      
      var markers = [X, O];
      
      for (var i = 0; i < markers.length; i++) {
        if (row[0] === null || row[1] === null || row[2] === null) {
          return false;
        }

        if (self.verifyMarkerTypes(row, markers[i])) {
          return markers[i];
        }
      }
    },

    verifyMarkerTypes: function(row, markerBeingChecked) {
      return ((row[0] instanceof markerBeingChecked) && (row[1] instanceof markerBeingChecked)) && (row[2] instanceof markerBeingChecked);
    }
  });

  return Solver;
});