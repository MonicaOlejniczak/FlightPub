Ext.define('FB.view.authentication.LoginController', {
	extend: 'FB.view.PageController',
	alias: 'controller.Login',
	requires: [
		'FB.controller.AuthenticationController'
	],
	constructor: function () {
		this.setConfig({
			default: false,
			heading: 'Login'
		});
	},
	init: function () {
		// todo why is control not working????
		var form = this.getView();
		form.down('#cancel').on('click', this.cancel, this);
		form.down('#login').on('click', this.login, this);
	},
	/**
	 * The event fired when cancelling the login process
	 */
	cancel: function () {
		console.log("nope");
		Ext.create('Ext.window.MessageBox').show ({
			title: 'Cancel',
			msg: 'Do you wish to cancel login?',
			buttonText: {
				yes: 'Cancel',
				no: 'Resume login'
			},
			fn: function (buttonId, text, opt) {
				if (buttonId == "yes") {
					this.redirect('Home');
				}
			}, scope: this
		});
	},
	/**
	 * The event fired when processing a login
	 */
	login: function () {
		// client side validation
		var form = this.getView();
		if (form.isValid()) {
			// server side validation
			Ext.Ajax.request({
				url: '/login/process',
				method: 'POST',
				params: form.getValues(),
				submitEmptyText: false,
				success: function (response) {
					// server side validation was successful and the user is redirected to the home page
					Ext.create('controller.Authentication').process();
					console.log(response.responseText);
				},
				failure: function (response) {
					Ext.Msg.alert('Error', response.responseText);
				}, scope: this
			});
		} else {
			Ext.Msg.alert('Error', 'Form fields may not be submitted with invalid values.');
		}
	}

});
