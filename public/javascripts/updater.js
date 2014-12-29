define(['solver'], function(Solver) {
  var Updater = Class.extend({
    init: function(game) {
      this.game = game;
      this.solver = new Solver(this.game.board);
      this.winner = false;
    },

    update: function() {
      if (this.winner) {
        return false;
      }

      if (this.solver.victoryConditionsMet()) {
        this.winner = true;
      }
    }
  });

  return Updater;
});