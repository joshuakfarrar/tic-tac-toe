define(['jquery', 'game'], function($, Game) {
  var game;

  var initApp = function() {
    $(document).ready(function() {
      initGame();
    });
  };

  var initGame = function() {
    require(['game'], function(Game) {
      var canvas = $('canvas')[0];

      game = new Game();
      game.setup(canvas);

      if (!game.started) {
        game.run();
      }

      $('body').unbind('click');
      $('body').click(function(event) {
        if (game.started) {
          game.click();
        }
      });

      $(document).mousemove(function(event) {
        var gamePos = $('canvas').offset(),
            width = game.renderer.getWidth(),
            height = game.renderer.getHeight(),
            mouse = game.mouse;

        mouse.x = event.pageX - gamePos.left;
        mouse.y = event.pageY - gamePos.top;

        if(mouse.x <= 0) {
            mouse.x = 0;
        } else if(mouse.x >= width) {
            mouse.x = width - 1;
        }

        if(mouse.y <= 0) {
            mouse.y = 0;
        } else if(mouse.y >= height) {
            mouse.y = height - 1;
        }
      });
    });
  };

  initApp();
});