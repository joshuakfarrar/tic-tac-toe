define(['solver'], function(Solver) {
  var Updater = Class.extend({
    init: function(game) {
      this.game = game;
      this.solver = new Solver(this.game.board);
      this.winner = false;
    },

    update: function() {
      if (this.game.finished) {
        return false;
      }

      if (this.solver.victoryConditionsMet()) {
        console.log("victory");
        this.game.finished = true;
      }
    }
  });

  return Updater;
});