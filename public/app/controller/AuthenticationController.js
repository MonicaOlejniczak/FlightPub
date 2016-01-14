Ext.define('FB.controller.AuthenticationController', {
	extend: 'Ext.app.Controller',
	alias: 'controller.Authentication',
	/**
	 * Logs the user out and redirects them to the home page
	 */
	logout: function () {
		Ext.Ajax.request({
			url: '/logout',
			success: function (response) {
				// the user has been logged out successfully
				this.process();
				Ext.Msg.alert('Success', 'You have logged out successfully.');
			},
			failure: function (response) {
				// an error occurred while logging the user out
				Ext.Msg.alert('Error', 'An error occurred upon logout and your attempt was unsuccessful.');
			}, scope: this
		}, this);
	},
	/**
	 * The event fired when a user has registered, logged in or logged out
	 */
	process: function () {
		var navigation = FB.app.navigation;
		var content = FB.app.content;
		content.removeAllPages();
		navigation.updateNavigation();
		content.setPage('Home');
	}
});
