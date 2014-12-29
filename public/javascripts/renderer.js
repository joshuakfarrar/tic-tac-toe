define(['x', 'o'], function(X, O) {
  var Renderer = Class.extend({
    init: function(game, canvas) {
      this.game = game;
      this.canvas = canvas;
      this.context = (canvas && canvas.getContext) ? canvas.getContext("2d") : null;
    },

    renderFrame: function() {
      var self = this;

      this.clearScreen(this.context);

      this.drawBoard();

      for (var i = 0; i < 3; i++)
        for (var k = 0; k < 3; k++)
          if (this.game.board.getMarkerAt(i,k) != null)
            this.drawMarker(this.game.board.markers.getMarkerAt(i,k))
    },

    clearScreen: function(context) {
      context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    drawBoard: function() {
      var width = this.context.canvas.width,
          height = this.context.canvas.height;

      var padding = 5;

      for (var i = 0; i < 4; i++) {
        var line;

        switch (i) {
          case 0:
            line = [
              {x: width / 3, y: padding },
              {x: width / 3, y: height - padding }
            ];
            break;
          case 1:
            line = [
              {x: width / 3 * 2, y: padding },
              {x: width / 3 * 2, y: height - padding }
            ];
            break;
          case 2:
            line = [
              {x: padding, y: height / 3 },
              {x: width - padding, y: height / 3 }
            ];
            break;
          case 3:
            line = [
              {x: padding, y: height / 3 * 2 },
              {x: width - padding, y: height / 3 * 2 }
            ];
        }

        this.context.beginPath();
        this.context.moveTo(line[0]['x'], line[0]['y']);
        this.context.lineTo(line[1]['x'], line[1]['y']);
        this.context.stroke();
      }
    },

    drawMarker: function(marker) {
      if (typeof marker === null) return false;

      if (marker instanceof X) {
        this.drawX(marker);
      } else if (marker instanceof O) {
        this.drawO(marker);
      }
    },

    drawX: function(marker) {
      var margin = 5,
          top = {},
          bottom = {};

      var baseLength = this.canvas.height / 3;

      var marginTop = margin,
          marginRight = margin,
          marginLeft = margin,
          marginBottom = margin;

      var x = marginTop + marker.x * baseLength,
          y = marginLeft + marker.y * baseLength;

      this.context.lineWidth = 2;

      this.context.beginPath();
      this.context.moveTo(x, y);
      this.context.lineTo(x + baseLength - marginRight * 2, y + baseLength - marginBottom * 2);
      this.context.stroke();

      this.context.beginPath();
      this.context.moveTo(x + baseLength - marginRight * 2, y);
      this.context.lineTo(x, y + baseLength - marginRight * 2);
      this.context.stroke();
    },

    drawO: function(marker) {
      var margin = 5,
          baseLength = this.canvas.height / 3;

      this.context.lineWidth = 2;

      this.context.beginPath();
      this.context.arc(marker.x * baseLength + baseLength / 2, marker.y * baseLength + baseLength / 2, (baseLength - 2 * margin) / 2, 0, 2 * Math.PI);
      this.context.stroke();
    },

    getWidth: function() {
        return this.canvas.width;
    },

    getHeight: function() {
        return this.canvas.height;
    }
  });

  return Renderer;
});