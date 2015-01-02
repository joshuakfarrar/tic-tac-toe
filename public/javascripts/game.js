define(['x', 'o', 'board', 'referee', 'human', 'bot', 'solver', 'updater', 'renderer'], 
 function(X, O, Board, Referee, Human, Bot, Solver, Updater, Renderer) {
  var Game = Class.extend({
    init: function() {
      this.started = false;
      this.mouse = { x: 0, y: 0 };
      this.board = new Board();
      this.referee = new Referee(new Human('Joshua', X), new Bot('Wag', O, this.board));
      this.over = false;
      this.turn = true;

      this.solver = new Solver(this.board);
    },

    setup: function(canvas) {
      this.renderer = new Renderer(this, canvas);
    },

    tick: function() {
      if (this.started) {
        this.updater.update();
        this.renderer.renderFrame();
      }

      if(!this.isStopped) {
        requestAnimFrame(this.tick.bind(this));
      }
    },

    start: function() {
      this.tick();
      this.started = true;
    },

    run: function() {
      var self = this;

      this.setUpdater(new Updater(this));

      var wait = setInterval(function() {
        if (self.renderer) {
          self.ready = true;
        }

        if (self.ready) {
          self.start();
          clearInterval(wait);
        }
      }, 100);
    },

    click: function() {
      var pos = this.getMouseGridPosition(),
          marker;

      if ((this.turn && this.referee.isHumanTurn()) && !this.over) {
        var player = this.referee.getCurrentPlayer();
        marker = new player.marker(pos.x, pos.y);
      } else {
        return false;
      }

      if (this.board.addMarker(marker)) {
        this.referee.turnComplete();
      }
    },

    getMouseGridPosition: function() {
      var canvas = this.renderer.canvas;

      var mx = this.mouse.x,
          my = this.mouse.y,
          x = Math.floor((mx / (canvas.width - 1)) * 3 % 3),
          y = Math.floor((my / (canvas.height - 1)) * 3 % 3);

      return { x: x, y: y };
    },

    setUpdater: function(updater) {
      this.updater = updater;
    }
  });

  return Game;
});