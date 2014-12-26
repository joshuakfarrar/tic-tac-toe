define(['updater', 'renderer'], function(Updater, Renderer) {
  var Game = Class.extend({
    init: function() {
      this.started = false;
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
      var i = 0;  // fake loading

      this.setUpdater(new Updater(this));

      var wait = setInterval(function() {
        self.ready = (i == 10) ? true : false;  // fake loading

        if (self.ready) {
          self.start();
          clearInterval(wait);
        }

        i++; // fake loading
      }, 100);
    },

    click: function() {
    },

    setUpdater: function(updater) {
      this.updater = updater;
    }
  });

  return Game;
});