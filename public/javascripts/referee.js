define(['human'], function(Human) {
  var Referee = Class.extend({
    init: function(playerOne, playerTwo) {
      this.turn = true;
      this.players = [playerOne, playerTwo];

      this.welcome();
    },
    
    welcome: function() {
      _.each(this.players, function(player) {
        console.log("welcome, " + player.name + "!");
      });
    },
    
    getCurrentPlayer: function() {
      var currentPlayer = (this.turn) ? 0 : 1;
      return this.players[currentPlayer];
    },

    isHumanTurn: function() {
      return (this.getCurrentPlayer() instanceof Human);
    },
    
    turnComplete: function() {
      this.turn = !this.turn;
    },
    
    playForBot: function() {
      if (this.getCurrentPlayer().move()) {
        this.turnComplete(); 
      }
    }
  });
  
  return Referee;
});