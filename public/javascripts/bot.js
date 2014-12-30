define(['player'], function(Player) {
  var Bot = Player.extend({
    init: function(name, marker, board) {
      this.name = name;
      this.marker = marker;
      this.board = board;
      this.thinking = false;
      
      this.optimalMoves = [
        { x: 1, y: 1 },
        { x: 0, y: 0 },
        { x: 0, y: 2 },
        { x: 2, y: 0 },
        { x: 2, y: 2 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 2, y: 1 },
        { x: 1, y: 2 }
      ]
    },
    
    move: function () {
      if (this.thinking) {
        return false;
      }
      this.thinking = true;
      
      for (var i = 0; i < this.optimalMoves.length; i++)
        if (this.board.addMarker(new this.marker(this.optimalMoves[i].x, this.optimalMoves[i].y)))
          break;
          
      this.thinking = false;
          
      return true;
    }
  });
  
  return Bot;
});