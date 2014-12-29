define(function() {
  var Marker = Class.extend({
    init: function(name, x, y) {
      this.name = name;

      this.x = x;
      this.y = y;
    }
  });

  return Marker;
});