'use strict';

(function(_) {
	chrome.runtime.onInstalled.addListener(function (details) {
	  console.log('previousVersion', details.previousVersion);
	});

	console.log('\'Allo \'Allo! Event Page for Browser Action');

	var successURL = 'https://www.facebook.com/connect/login_success.html';

	function onFacebookLogin() {
		if (!localStorage.FBAccessToken) {
			chrome.tabs.getAllInWindow(null, function(tabs) {
				for (var i = 0; i < tabs.length; i++) {
					if (tabs[i].url.indexOf(successURL) === 0) {
						var params = tabs[i].url.split('#')[1];
						window.access = params.split('&')[0];
						localStorage.FBAccessToken = window.access;
						chrome.tabs.onUpdated.removeListener(onFacebookLogin);
						return;
					}
				}
			});
		}
	}

	chrome.tabs.onUpdated.addListener(onFacebookLogin);

	var redraw = function() {
		if (localStorage.FBAccessToken) {
			var graphUrl = 'https://graph.facebook.com/me/notifications?' + localStorage.FBAccessToken + '&callback=draw';
			var script = document.createElement('script');
			script.src = graphUrl;
			document.body.appendChild(script);
			
		}

		window.draw = function(notifications) {
			chrome.browserAction.setBadgeText({text: ''+(notifications.summary ? notifications.summary.unseen_count : '0')});
		};
	};

	window.setInterval(redraw, 1000*60);

	redraw();
})(window._);
