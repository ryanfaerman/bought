require.config({
  paths: {
    zepto: 'libs/zepto/zepto-min',
    underscore: 'libs/underscore/underscore-min',
    backbone: 'libs/backbone/backbone-optamd3-min',
    text: 'libs/require/text',
    hammer: 'libs/hammer/hammer'
  }

});

require(['zepto'], function($){
  Zepto(function(){
		var sidebar = Zepto('#sidebar'),
	  		primary = Zepto('#primary');

	  sidebar.tap(function(){
	  	alert('tap');
	  }).swipeLeft(function(){
	  	alert('left swipe');
	  }).swipeRight(function(){
	  	alert('swipe right');
	  }).doubleTap(function(){
	  	alert('double tap')
	  }).longTap(function(){
	  	alert('hold!')
	  });
  });
  
});