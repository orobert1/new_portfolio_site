let $ = require('jquery');
function Project( id, title, italics, body, word, left, width,
options = {
  imagej: [],
  functions: [],
} ){
  this.container = document.getElementById( id );
  this.title = title;
  this.word = word;
  this.italics = italics;
  this.options = options;
  this.body = body;
  this.width = width;
  this.left = left;
  this.image = options.images
  this.shelf = this.createShelf();
  this.createText();
  this.placeProjectSpacer();
  if( this.options.functions && this.options.functions.length > 0 ){
    for (var i = 0; i < this.options.functions.length; i++) {
      let func = this.options.functions[i];
      func();
    }
  }
  if( this.options.images && this.options.images.length > 0 ){
    for (var j = 0; j < this.options.images.length; j++) {
      let image = this.options.images[j];
      this.placeImage( image );
    }
  }
}

Project.prototype.placeImage = function( image ){
  let width = image.width;
  let left = image.left;
  let top = image.top;
  let src = image.src;
  let opacity = image.opacity;
  let img = document.createElement( "img" );
  img.className = "image";
  img.src = src;
  img.style.top = top * 10 + '%';
  img.style.opacity = opacity;
  img.style.width = width * 10 + "%";
  img.style.left = left * 10 + "%";
  this.container.appendChild( img );
}

Project.prototype.createShelf = function(){
  let shelf = document.createElement( "shelf" );
  shelf.className = "shelf";
  if( this.left === 0 ){
    shelf.style.borderLeft = "none";
  }
  shelf.style.paddingLeft = "5%";
  shelf.style.paddingRight = "8%";
  shelf.style.width = ( this.width - 1.3 ) * 10 + "%";
  shelf.style.marginLeft = this.left * 10 + "%";
  return shelf;
}

Project.prototype.createText = function(){
  let shelf = this.shelf;
  let title = document.createElement( "title" );
  let italics = document.createElement( "italics" );
  let body = document.createElement( "description" );

  title.innerHTML = this.title;
  italics.innerHTML = this.italics;
  body.innerHTML = this.body;
  shelf.appendChild( title );
  shelf.appendChild( italics );
  shelf.appendChild( body );
  this.container.appendChild( shelf );
}

Project.prototype.placeProjectSpacer = function(){
  let element = document.createElement("div");
  element.className = "projectSpacer";
  element.style.top = $(this.container).position().top - 410;
  document.body.appendChild(element);
}


module.exports = Project;
