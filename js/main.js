require.config({
  paths: {
    zepto: 'libs/zepto/zepto-min',
    underscore: 'libs/underscore/underscore-min',
    backbone: 'libs/backbone/backbone-optamd3-min',
    text: 'libs/require/text',
    cordova: 'libs/cordova/cordova-1.5.0',
    scrollfix: 'libs/scrollfix/scrollfix',
    jquery: 'libs/jquery/jquery-min'
  }

});

require(['views/app', 'cordova'], function(AppView){
  var app_view = new AppView;
});
/*
require(['zepto', 'underscore', 'cordova'], function($, _){


  Zepto(function(){
		var sidebar = Zepto('#sidebar'),
	  		primary = Zepto('#primary'),
	  		modal_w = Zepto('.modal-overlay'),
	  		modal 	= Zepto('.modal'),
	  		form 		= Zepto('form#newItem'),
	  		share_bt= Zepto('button.share');

	  modal_w.tap(function(e){
	  	z = Zepto(this);
	  	if(e.target.className == 'modal-overlay') {
	  		z.hide();
	  	}
	  });

	  share_bt.tap(function(){
	  	modal_w.show();
	  });
	  /*
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
	
		sidebar.longTap(function(){
			var options = new ContactFindOptions();
			options.filter = ""
			options.multiple=true;
			filter = ["displayName"]
			navigator.contacts.find(filter, function(contacts){
				// Success
				console.log(contacts);
			}, function(contactError){
				// Error
				console.log(contactError);
			}, options);
		});
	  primary.on('tap', '.itemRow .checkbox', function(e){
	  	z = Zepto(this); 
	  	z.parents('.itemRow').toggleClass('done')
	  });

  });
  
});
*/