define(['x', 'o', 'board', 'solver', 'updater', 'renderer'], function(X, O, Board, Solver, Updater, Renderer) {
  var Game = Class.extend({
    init: function() {
      this.started = false;
      this.mouse = { x: 0, y: 0 };
      this.board = new Board();
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
        self.ready = true;

        if (self.ready) {
          self.start();
          clearInterval(wait);
        }
      }, 100);
    },

    click: function() {
      var pos = this.getMouseGridPosition(),
          marker;

      if (this.turn) {
        marker = new X(pos.x, pos.y);
      } else {
        marker = new O(pos.x, pos.y);
      }

      if (this.board.markers.addMarker(marker)) {
        this.turn = !this.turn;
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