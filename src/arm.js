function Arm( center, otherCircles, angle, circleBoard, lastArm ){
  this.center = center;
  this.lastArm = lastArm;
  this.circleBoard = circleBoard;
  this.canvas = this.circleBoard.canvas;
  this.board = this.circleBoard.board;
  this.max = this.circleBoard.max;
  this.angle = angle;
  this.otherCircles = otherCircles;
  this.getOtherArms();
  this.genNewArm();
}

Arm.prototype.getOtherArms = function(){
  this.otherArms = [];
  for (var i = 0; i < this.otherCircles.length; i++) {
    this.otherArms.concat( this.otherCircles[i].arms );
  }
}

Arm.prototype.genNewArm = function(){
  this.x = Math.floor( this.center.x );
  this.y = Math.floor( this.center.y );
  let hyp = this.max * Math.random() * 1;
  let targX = Math.floor( Math.cos( this.angle ) * hyp);
  let targY = Math.floor( Math.sin( this.angle ) * hyp);
  let steps;
  if( Math.abs( targX ) > Math.abs( targY ) ){
    steps = Math.abs( targX );
  }else{
    steps = Math.abs( targY )
  }
  let i = 0;
  while( this.x < this.canvas.width
    && this.y < this.canvas.height
    && this.y > 0
    && this.x > 0
    && this.board[this.x]
    && this.board[this.x][this.y]
    && this.board[this.x][this.y].onContour !== true
    && i <= steps
  ){
    this.x += Math.floor((targX) * ( 1 / steps ))
    this.y += Math.floor((targY) * ( 1 / steps ));
    i += 1;
  }
  this.checkArm();
}

Arm.prototype.checkArm = function(){
  if(this.lastArm){
    let targX = this.lastArm.x;
    let targY = this.lastArm.y;
    let x = this.x;
    let y = this.y;
    let diffX = targX - x;
    let diffY = targX - x;
    let steps;
    if( Math.abs( diffY ) > Math.abs( diffX ) ){
      steps = Math.abs( diffY );
    }else{
      steps = Math.abs( diffX );
    }
    let i = 0;
    let cont = false;
    while( i < steps ){
      x += Math.floor( diffX / steps )
      y += Math.floor( diffY / steps );
      if(x >= this.circleBoard.canvas.width || y >= this.circleBoard.canvas.height){
        this.x = x - 1;
        this.y = y - 1;
        break;
      }else if(x < 0 || y < 0){
        this.x += 1;
        this.y += 1;
        break;
      }else if(this.board[x][y].onContour === true){
        this.x = x;
        this.y = y;
        break;
      }
      i++;
    }
  }

}

module.exports = Arm
