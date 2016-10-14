let $ = require('jquery');
let Project = require('./project');
let circleBoard = require('./circleBoard');


$( document ).ready(function() {

  start();

});

$( window ).resize( adjustSpacerHeight );

function start(){
  let tb = $('#1');
  let special = $('.special');
  let trippy = $('.trippy');
  let cover = $('cover');
  let leftSpacer = $('.leftSpacer');
  let logo = $('.logo');
  let cc = $('.containerContainer');
  special.attr("style", "min-height: 100%");
  special.css({height: trippy.height() +cover.height() });
  adjustSpacerHeight();
  leftSpacer.css({
    width: cc.css('margin-left') + trippy.children('.shelf').css('width') + 'px'
  });
  tb.css({position: "fixed", top: "0px", left: "0px"});
  checkWindow();
  $('.header').click( menu );

}

function checkWindow(){
  let cover = $('.cover');
  let trippy = $('.trippy');
  if( $(window).scrollTop() > cover.height() ){
    trippy.css({position: "absolute", top: cover.height(),left: "0px"});
  }else{
    trippy.css({position: "fixed", top: 0, left: $('.containerContainer').css('margin-left'), width: $('.containerContainer').width()});
  }
  window.setTimeout( checkWindow, 100 );

}

function menu(){
  $('.header').css({ width: '80%' });
  window.setTimeout(
    function(){
      $('midBurger').css({ height: '400px', width: '100%'  });
      window.setTimeout(
        function(){
          $('bottomBurger').css({ height: '80px', width: '100%'  });
        }, 200
      );
    }, 500
  );
}

function adjustSpacerHeight(){

  let logo = $('.logo');
  let leftSpacer = $('.leftSpacer');
  let cc = $('.containerContainer');
  let trippy = $('.trippy');

  $('.midRightSpacer').css({height: logo.height()});
  if( logo.height() !== leftSpacer.height() ){
    let topRightHeight = leftSpacer.height() - logo.height();
    $('.topRightSpacer').css({height: `${topRightHeight}px`})
  }

  debugger

}

new Project( 1, "Trippy Bricks",
"A generative library that takes a div and creates a repeating animated moire pattern.",
"Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
"Object Oriented",
0, 4, {functions: [
  function(){
    let container = document.getElementById( "1" );
    let trippyBrick = document.createElement("canvas");
    let ctx = trippyBrick.getContext("2d");
    trippyBrick.width = window.innerWidth * .8;
    trippyBrick.height = window.innerHeight * 2;
    new circleBoard( trippyBrick, ctx, 100, 350 );
    trippyBrick.className = "trippyBrick";
    container.appendChild( trippyBrick );
  } ]}
);

new Project( 2, "Font~Bloqs",
"An App for Editing True-Type-Files",
"Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
"Object Oriented",
5, 5,
  {images:
    [
      { src: "images/fontBloqs2.png", left: 1, width: 3, top: 2, opacity: 1 }
    ]
  }
);

new Project( 3, "Zeit~Geist",
"An App for sharing creative content",
"Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
"Object Oriented",
3, 4,
  {images:
    [
      { src: "images/project_page5.png", left: 0, width: 4, top: 4, opacity: 1 },
      { src: "images/project_page1.png", left: 9, width: 1, top: 5, opacity: 1 },
      { src: "images/project_page4.png", left: 8, width: 2, top: 7, opacity: 1 },
      { src: "images/project_page2.png", left: 7, width: 4, top: 0, opacity: 1 }
    ]
  }
);

new Project( 4, "Cash ~ Money ~ Masheen",
"An App for sharing creative content",
"Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
"Object Oriented",
5, 5,
  {images:
    [
      { src: "images/cmmCover 6.png", left: -1.2, width: 9, top: -.6, opacity: 1 }
    ]
  }
);
