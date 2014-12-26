define(function() {
  var Renderer = Class.extend({
    init: function(game, canvas) {
      this.game = game;
      this.canvas = canvas;
    },
    renderFrame: function() {
      // console.log('render!');
    }
  });

  return Renderer;
});