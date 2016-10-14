function PointObject(firstPoint, lastPoint, board, numMidPoints){
  this.circleBoard = board;
  this.board = board.board;
  this.numMidPoints = numMidPoints;
  this.firstPoint = firstPoint;
  this.lastPoint = lastPoint;
  this.middlePoints = this.genMidPoints();
  this.points = this.concatPoints();
  this.findMaxMins();
}

PointObject.prototype.genMidPoints = function(){
  let i = 0;
  let result = [];
  while( i < this.numMidPoints ){
    result.push(this.addMidPoint());
    i++;
  }
  return result;
}

PointObject.prototype.findMaxMins = function(){
  let maxX = 0;
  let minX = this.circleBoard.canvas.width;
  let maxY = 0;
  let minY = this.circleBoard.canvas.height;

  for (var i = 0; i < this.points.length; i++) {
    if( this.points[i].x > maxX ){
      maxX = this.points[i].x;
    }
    if( this.points[i].x < minX ){
      minX = this.points[i].x
    }
    if( this.points[i].y > maxY ){
      maxY = this.points[i].y;
    }
    if( this.points[i].y < minY ){
      minY = this.points[i].y
    }
  }
  this.maxX = maxX;
  this.minX = minX;
  this.maxY = maxY;
  this.minY = minY;
}

PointObject.prototype.fillBoard = function(){
  let points = this.points;
  for (var i = 0; i < points.length; i++) {
    let p0;
    let p1;
    let p2;
    if(i + 1 < points.length && i !== 0){
      p0 = {x: ( points[i].x + points[i - 1].x ) / 2,
        y: ( points[i].y + points[i - 1].y ) / 2};
      p1 = points[i];
      p2 = {x: (points[i].x + points[i + 1].x) / 2,
        y: (points[0].y + points[i + 1].y) / 2}
    }else if( i === 0){
      p0 = {x: (points[points.length - 1].x + points[0].x) / 2,
        y: (points[points.length - 1].y + points[0].y) / 2};
      p1 = points[0];
      p2 = {x: (points[0].x + points[1].x) / 2,
        y: (points[0].y + points[1].y) / 2}
    }else{
      p0 = {x: (points[i].x + points[i - 1].x) / 2,
        y: (points[i].y + points[i - 1].y) / 2};
      p1 = points[i];
      p2 = {x: (points[i].x + points[0].x) / 2,
        y: (points[i].y + points[0].y) / 2};
    }
    let t = 0;
    let diffX = Math.abs(p0.x - p2.x);
    let diffY = Math.abs(p0.y - p2.y);
    let steps = 0;
    if(diffX > diffY){
      steps = diffX;
    }else{
      steps = diffY;
    }
    while( t < 1 ){
      let x = Math.floor((1 - t) * (1 - t) * p0.x + 2 * (1 - t) * t * p1.x + t * t * p2.x);
      let y = Math.floor((1 - t) * (1 - t) * p0.y + 2 * (1 - t) * t * p1.y + t * t * p2.y);
      this.board[x][y].onContour = true;
      this.board[x][y].free = false;
      t+= 1 / steps;
    }
  }
}

PointObject.prototype.calculateRays = function(){
  this.pointsInside = this.circleBoard.calculateRays(this.minX, this.maxX, this.minY, this.maxY);
}

PointObject.prototype.addMidPoint = function(){
  let firstPoint = this.firstPoint;
  let lastPoint = this.lastPoint;
  let midpoint = (
    { x: Math.floor((firstPoint.x + lastPoint.x) / 2 ),
      y: Math.floor((firstPoint.y + lastPoint.y) / 2 )
    });
  let newMid = {x: midpoint.x, y: midpoint.y};
    newMid.x = midpoint.x + Math.floor( (Math.random() - .5) * this.circleBoard.maxX);
    newMid.y = midpoint.y + Math.floor( (Math.random() - .5) * this.circleBoard.maxY);
    while( !this.board[newMid.x] || !this.board[newMid.x][newMid.y] || this.board[newMid.x][newMid.y].inside === true){
        newMid.x = midpoint.x + Math.floor( (Math.random() - .5) * this.circleBoard.maxX);
        newMid.y = midpoint.y + Math.floor( (Math.random() - .5) * this.circleBoard.maxY);
    }
    return {x: newMid.x, y: newMid.y};
  }

PointObject.prototype.calculateMidPoint = function(){
  let points = this.concatPoints();
  let midX = 0;
  let midY = 0;
  let count = 0;
  for (var i = 0; i < points.length; i++) {
    midX += points[i].x;
    midY += points[i].y;
    count++;
  }
  return {x: midX / count, y: midY / count};
}

PointObject.prototype.concatPoints = function(){
  let result = [];
  result.push(this.firstPoint);
  for (var i = 0; i < this.middlePoints.length; i++) {
    result.push(this.middlePoints[i]);
  }
  result.push(this.lastPoint);
  this.points = result;
  return result;
}

PointObject.prototype.assignQuadrants = function(){
  let points = this.concatPoints();
  let topRight = this.topRight = [];
  let topLeft = this.topLeft = [];
  let bottomRight = this.bottomRight = [];
  let bottomLeft = this.bottomLeft = [];
  for (var i = 0; i < this.points.length; i++) {
    let point = this.points[i];
    point.xSign = (point.x - this.midPoint.x) / Math.abs(point.x - this.midPoint.x) ;
    point.ySign = (point.y - this.midPoint.y) / Math.abs(point.y - this.midPoint.y) ;
    point.angle =
      Math.atan2(
        (point.y - this.midPoint.y), (point.x - this.midPoint.x)
    );
    if(point.xSign > 0){
      if(point.ySign > 0){
        topRight.push(point);
      }else{
        bottomRight.push(point);
      }
    }else{
      if(point.ySign > 0){
        topLeft.push(point);
      }else{
        bottomLeft.push(point);
      }
    }
  }
}

PointObject.prototype.organizePoints = function(){
  let points = this.sort(this.points);
  return points;
}

PointObject.prototype.sort = function(array){
  for (var i = 0; i < array.length; i++) {
    for (var j = i + 1; j < array.length; j++) {
      if( array[i].angle < array[j].angle ){
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
  }
  return array;
}

PointObject.prototype.getPoints = function(){
  this.midPoint = this.calculateMidPoint();
  this.assignQuadrants();
  let points = this.organizePoints();
  this.fillBoard();
  this.calculateRays();
  return points
}

module.exports = PointObject
