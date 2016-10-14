let PointObject = require("./points.js");
let Arm = require('./arm.js');
let childCirc = require('./childCirc.js');

function circle( center, circleBoard ){
  this.x = center.x;
  this.y = center.y;
  this.center = center;
  this.circleBoard = circleBoard ;
  this.numArms = 6;
  this.numCircles = 10;
  this.points = [];
  this.otherCircles = circleBoard.circles ;
  this.childCircs = [];
  this.generateArms();
  this.genContours();
  this.render();
}

circle.prototype.generateArms = function(){
  let i = 0;
  this.arms = [];
  while( i < this.numArms ){
    this.generateArm( i );
    i++;
  }
}

circle.prototype.generateArm = function( perc ){
  let angle = ( perc / this.numArms ) * ( Math.PI * 2 );
  let lastArm = this.center;
  if(this.arms.length > 0){
    lastArm = this.arms[this.arms.length - 1];
  }
  this.arms.push( new Arm( this.center, this.otherCircles, angle, this.circleBoard, lastArm ) );
}

circle.prototype.genContours = function(){
  for (var i = 0; i < this.arms.length; i++) {
    let beforeArm;
    let arm;
    let nextArm;
    if(i === this.arms.length - 1){
      beforeArm = this.arms[i - 1];
      arm = this.arms[this.arms.length - 1]
      nextArm = this.arms[0];
    }else if( i === 0 ){
      beforeArm = this.arms[this.arms.length - 1];
      arm = this.arms[0];
      nextArm = this.arms[1];
    }else{
      beforeArm = this.arms[i - 1];
      arm = this.arms[i];
      nextArm = this.arms[i + 1];
    }
    this.findCurves( beforeArm, arm, nextArm );
  }
  this.findRays();
}

circle.prototype.findCurves = function( beforeArm, arm, nextArm ){
  let p1 = {};
  let p2 = {};
  let p3 = {};
  p1.x = Math.floor( beforeArm.x + arm.x ) / 2;
  p2.x = arm.x;
  p3.x = Math.floor( arm.x + nextArm.x ) / 2;
  p1.y = Math.floor( beforeArm.y + arm.y ) / 2;
  p2.y = arm.y;
  p3.y = Math.floor( arm.y + nextArm.y ) / 2;
  this.points.push( {p1: p1, p2: p2, p3: p3} );
  let steps;
  steps = this.circleBoard.canvas.width;
  let i = 0;
  while( i <= steps ){
    let t = i / steps;
    let x = (1 - t) * (1 - t) * p1.x + 2 * (1 - t) * t * p2.x + t * t * p3.x;
    let y = (1 - t) * (1 - t) * p1.y + 2 * (1 - t) * t * p2.y + t * t * p3.y;
    if(x < this.circleBoard.canvas.width && y < this.circleBoard.canvas.height && x >= 0 && y >= 0){
      this.circleBoard.board[Math.floor( x )][Math.floor( y )].onContour = true;
    }
    i += 1;
  }
}

circle.prototype.findRays = function(){
  this.findMaxMins();
  this.circleBoard.findRays( this.minX, this.maxX, this.minY, this.maxY );
}
circle.prototype.findMaxMins = function(){
  this.maxX = 0;
  this.maxY = 0;
  this.minX = this.circleBoard.canvas.width;
  this.minY = this.circleBoard.canvas.height;
  this.offset = {x: 0, y: 0};
  for (var i = 0; i < this.arms.length; i++) {
    let x = this.arms[i].x;
    let y = this.arms[i].y;
    if(x > this.maxX && x < this.circleBoard.canvas.width ){
      this.maxX = x;
    }
    if(y > this.maxY && y < this.circleBoard.canvas.height ){
      this.maxY = y;
    }
    if(x < this.minX){
      this.minX = x;
    }
    if(y < this.minY){
      this.minY = y;
    }
    this.offset.x += x;
    this.offset.y += y;
  }
  this.offset.x /= this.arms.length;
  this.offset.y /= this.arms.length;
  this.numCircles = (Math.abs(this.maxX - this.minX) + Math.abs(this.maxY - this.minY))/40;
}

circle.prototype.render = function(){
  // let col = true;
  // let ctx = this.circleBoard.ctx;
  // for (var j = 0; j <= this.numCircles; j++) {
  //   let diffPerc = j / this.numCircles;
  //   // for (var i = 0; i < this.arms.length; i++) {
  //   //   let arm = this.arms[i];
  //   //   ctx.moveTo(arm.x, arm.y);
  //   //   ctx.beginPath();
  //   //   ctx.ellipse(arm.x, arm.y, 3, 3,0,1.9,true);
  //   //   ctx.fill();
  //   // }
  //
  //   let diffX = ( this.center.x  - this.x ) * diffPerc;
  //   let diffY = ( this.center.y - this.y ) * diffPerc;
  //
  //   ctx.beginPath();
  //   ctx.moveTo( this.points[this.points.length - 1].p3.x + (diffX), this.points[this.points.length - 1].p3.y + (diffY));
  //   for (var i = 0; i < this.points.length; i++) {
  //     let point = this.points[i];
  //     let diffP2X = ( this.center.x - point.p2.x ) * diffPerc;
  //     let diffP2Y = ( this.center.y - point.p2.y ) * diffPerc;
  //     let diffP3X = ( this.center.x - point.p3.x ) * diffPerc;
  //     let diffP3Y = ( this.center.y - point.p3.y ) * diffPerc;
  //     ctx.lineTo( point.p2.x + diffP2X, point.p2.y + diffP2Y, point.p3.x + diffP3X, point.p3.y + diffP3Y );
  //   }
  //   if(col === true){
  //     ctx.fillStyle = "rgba(0,0,0,1)";
  //   }else{
  //     if(Math.random() < .03){
  //       ctx.fillStyle = "rgba(255,0,120,1)";
  //     }else{
  //       ctx.fillStyle = "rgba(255,255,255,1)";
  //     }
  //   }
  //   col = !col;
  //   ctx.fill();
  //   ctx.beginPath();
  //   ctx.fill();
  //   ctx.fillStyle = "black";
  // }
  let ctx = this.circleBoard.ctx;
  let color = "rgba(0,0,0,1)";
  let col = Math.random();
  let center = this.center;
  let target = this.points;
  if(col > .6){
    color = "rgba(255,255,255,1)"
  }else if(col < .005){
    color = "rgba(255,0,120,1)";
  }
  this.childCircs.push(new childCirc( color, center, target, ctx ));
}

circle.prototype.loop = function(){
  let rand = Math.random();
  if( rand > .95){
    let ctx = this.circleBoard.ctx;
    let color = "rgba(0,0,0,1)";
    let col = Math.random();
    let center = this.center;
    let target = this.points;
    if(col > .6){
      color = "rgba(255,255,255,1)"
    }else if(col < .005){
      color = "rgba(255,0,120,1)";
    }
    this.childCircs.push(new childCirc( color, center, target, ctx ));
  }
  for (var i = 0; i < this.childCircs.length; i++) {
    let child = this.childCircs[i];
    if(child.percentage >= 100 && this.childCircs[i + 1] && this.childCircs[i + 1].percentage >= 100
    && this.childCircs[i + 2] && this.childCircs[i + 2].percentage >= 100){
      this.childCircs.splice(i, 1);
    }else{
      child.render();
    }
  }
}

module.exports = circle
