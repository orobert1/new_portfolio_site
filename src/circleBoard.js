let Circle = require("./circle.js");

function circleBoard( canvas, ctx, numCircles, max ){
  this.canvas = canvas;
  this.ctx = ctx;
  this.numCircles = numCircles;
  this.max = max;
  this.board = this.generateBoard();
  this.generateCircles();
  window.setInterval(this.loop.bind(this), 40);
}

circleBoard.prototype.loop = function(){
  for (var i = 0; i < this.circles.length; i++) {
    let circle = this.circles[i];
    circle.loop();
  }
}

circleBoard.prototype.generateBoard = function(){
  let result = [];
  for(var i = 0; i < this.canvas.width; i++){
    let rows = [];
    for (var j = 0; j < this.canvas.height; j++) {
      rows.push({x: i, y: j, free: true, onContour: false})
    }
  result.push(rows);
  }
  return result;
}

circleBoard.prototype.generateCircles = function(){
  let i = 0;
  this.circles = [];
  while( i < this.numCircles ){
    this.circles.push(new Circle(this.getNewStartCoords(), this));
    i++;
  }
}

circleBoard.prototype.findRays = function(minX, maxX, minY, maxY){
  for (var i = minX; i < maxX; i++) {
    let row = this.board[i];
    let inside = false;
    for (var j = minY; j < maxY; j++) {
      if(i < 0 || j < 0 || !row || !row[j]){
        console.log(i);
      }
      let cell = row[j];
      if(cell.onContour){
        inside = !inside;
      }
      if(inside){
        cell.free = false;
      }
    }
  }


}

circleBoard.prototype.getNewStartCoords = function(){
  let newCirc = {

    x: Math.floor( Math.random() * this.canvas.width ),
    y: Math.floor( Math.random() * this.canvas.height )

  };
  let board = this.board;
  let x = newCirc.x;
  let y = newCirc.y;
  while( board[newCirc.x][newCirc.y].free === false ){
    newCirc.x = Math.floor( Math.random() * this.canvas.width );
    newCirc.y = Math.floor( Math.random() * this.canvas.height );
  }
  return newCirc;

}


module.exports = circleBoard
