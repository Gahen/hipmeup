'use strict';

(function(_) {
	console.log('\'Allo \'Allo! Popup');
	var hello = window.hello;

	var configs = {
		'facebook': {
			'redirect_uri': 'http://www.facebook.com/connect/login_success.html',
			'scope': 'manage_notifications'
		},
		'google': {
			'redirect_uri': 'http://www.google.com/connect/login_success.html'
		},
		'twitter': {
			'redirect_uri': 'http://www.twitter.com/connect/login_success.html'
		}
	};

	hello.init({
		'facebook': '272445728866',
		'twitter': 'SfplHURBLI5vbFWDEVr6kP9ok',
		'google': '1063411987133-6q3uo2lnc558copqpej9qgvou9nd7133.apps.googleusercontent.com'
	}, {
		'redirect_uri': 'http://www.facebook.com/connect/login_success.html',
	});

	var connect = function(e) {
		var t = e.target;
		var network = t.getAttribute('data-auth');
		window.hello(network).login(configs[network]).then( function(){
			console.log('You are signed in to '+network);
		}, function( e ){
			console.log('Signin error: ' + e.error.message );
		});
	};

	_.map(document.getElementsByTagName('button'), function(b) {
		b.onclick = connect;
	});
})(window._);
