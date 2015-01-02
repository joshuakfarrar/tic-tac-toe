define(['player', 'marker', 'board', 'solver', 'o', 'x'], function(Player, Marker, Board, Solver, O, X) {
  var Bot = Player.extend({
    init: function(name, marker, board) {
      this.name = name;
      this.marker = marker;
      this.board = board;
      this.thinking = false;
      
      this.nextMove;
    },
    
    move: function () {
      if (this.thinking) {
        return false;
      }
      this.thinking = true;
      
      var move = this.calculateBestMove();
      this.board.addMarker(new this.marker(this.nextMove.x, this.nextMove.y));

      this.thinking = false;
      return true;
    },
    
    calculateBestMove: function() {
      var depth = 0;
      this.minimax(new Solver(this.board), depth);
    },
    
    // this is a board clone method because of issues with
    // _.clone not deeply cloning child objects and arrays
    // instead, simply just referencing them
    cloneBoard: function(board) {
      var childBoard = new Board();
      for (var x = 0; x < 3; x++) {
        for (var y = 0; y < 3; y++) {
          var marker = board.getMarkerAt(x, y);
          if (marker) {
            childBoard.addMarker(marker);
          }
        }
      }
      return childBoard;
    },
    
    scoreGame: function(solver, depth) {
      if (solver.winner === this.marker) {
        return 10 - depth;
      }
      else if (this.winner !== this.marker) {
        return depth - 10;
      }
      else {
        return 0
      }
    },
    
    nextMarker: function(depth) {
      if (depth % 2) {
        var marker = (this.marker === O) ? X : O;
        return marker;
      } else {
        return this.marker;
      }
    },
    
    minimax: function(solver, depth) {
      if (solver.hasWinner()) {
        var score = this.scoreGame(solver, depth);
        return score;
      }
      
      var candidates = [],
          board = solver.board,
          possibleMoves = board.getAvailableMoves();
          
      if (!possibleMoves) {
        throw "No possible moves!";
      }

      for (var i = 0; i < possibleMoves.length; i++) {
        var move = possibleMoves[i],
            nextMarker = this.nextMarker(depth),
            childBoard = this.cloneBoard(board);

        childBoard.addMarker(new nextMarker(move.x, move.y));

        var childSolver = new Solver(childBoard);
        childSolver.checkVictoryConditions();
        
        var score = this.minimax(childSolver, depth + 1);
        
        candidates.push({ score: score, move: move });
      }
      
      var bestCandidate;
      if (depth % 2) {
        bestCandidate = _.min(candidates, function(candidate) { return candidate.score; });
      } else {
        bestCandidate = _.max(candidates, function(candidate) { return candidate.score; });
      }

      this.nextMove = bestCandidate.move;
      return bestCandidate.score || 0;
    }
  });
  
  return Bot;
});