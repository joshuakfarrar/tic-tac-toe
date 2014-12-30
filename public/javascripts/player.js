define(function() {
  var Player = Class.extend({
    init: function(name, marker) {
      this.name = name;
      this.marker = marker;
    }
  });
  
  return Player;
});