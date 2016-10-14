function childCirc(color, center, target, ctx){
  this.color = color;
  this.target = target;
  this.center = center;
  this.ctx = ctx;
  this.percentage = 2;
  this.points = this.calculatePoints();
  this.render();
}

childCirc.prototype.calculatePoints = function(){
  let result = [];
  for (var i = 0; i < this.target.length; i++) {
    let point = this.target[i];
    let diffP1X = ( point.p2.x - this.center.x ) * (this.percentage / 100);
    let diffP1Y = ( point.p2.y - this.center.y ) * (this.percentage / 100);
    let diffP2X = ( point.p2.x - this.center.x ) * (this.percentage / 100);
    let diffP2Y = ( point.p2.y - this.center.y ) * (this.percentage / 100);
    let diffP3X = ( point.p3.x - this.center.x ) * (this.percentage / 100);
    let diffP3Y = ( point.p3.y - this.center.y ) * (this.percentage / 100);
    result.push({
      p1: {x: this.center.x + diffP1X, y: this.center.y + diffP1Y},
      p2: {x: this.center.x + diffP2X, y: this.center.y + diffP2Y},
      p3: {x: this.center.x + diffP3X, y: this.center.y + diffP3Y}
    }
    );
  }
  return result;
}

childCirc.prototype.render = function(){
  let ctx = this.ctx;
  ctx.beginPath();
  ctx.moveTo( this.points[this.points.length - 1].p3.x, this.points[this.points.length - 1].p3.y );
  for (var i = 0; i < this.points.length; i++) {
    let point = this.points[i]
    ctx.lineTo( point.p2.x, point.p2.y, point.p3.x, point.p3.y );
  }
  ctx.fillStyle = this.color;
  ctx.fill();
  if(this.percentage < 100){
    this.percentage+= 1;
    this.points = this.calculatePoints();
  }
}

module.exports = childCirc;
