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
      
      if (!this.referee.isHumanTurn()) {
        this.referee.playForBot();
      }

      if (this.solver.victoryConditionsMet()) {
        console.log("victory");
        this.game.finished = true;
      }
    }
  });

  return Updater;
});