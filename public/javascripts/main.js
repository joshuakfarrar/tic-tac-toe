define(['jquery', 'game'], function($, Game) {
  var game;

  $(document).ready(function() {
    require(['game'], function(Game) {
      var canvas = $('canvas');

      game = new Game();
      game.setup(canvas);

      if (!game.started) {
        game.run();
      }
    });
  });

  $('body').unbind('click');
  $('body').click(function(event) {
    if (game.started) {
      game.click();
    }
  });
});