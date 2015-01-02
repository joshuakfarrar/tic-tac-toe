define(['solver'], function(Solver) {
  var Updater = Class.extend({
    init: function(game) {
      this.game = game;
      this.solver = new Solver(this.game.board);
      this.winner = false;
      this.referee = this.game.referee;
    },

    update: function() {
      if (this.game.finished) {
        return false;
      }
      
      this.solver.checkVictoryConditions();
      
      if (this.solver.hasWinner()) {
        console.log("victory");
        this.game.over = true;
        return false;
      }
      
      if (!this.referee.isHumanTurn() && !this.game.over) {
        try {
          this.referee.playForBot();
        } catch (e) {
          this.game.over = true;
          console.log("HA-ha!");
        }
      }
    }
  });

  return Updater;
});