Ext.define('FB.controller.Login', {
	extend: 'Ext.app.Controller',
	/**
	 * Dependencies
	 */
	requires: [
		'Ext.form.Panel'
	],
	views: [
		'Login'
	],
	refs: [{
		ref: 'Form',
		selector: 'Login'
	}],
	/**
	 * Initialising function
	 */
	init: function() {
		Ext.widget('Login', {
			renderTo: Ext.get('login')
		});
		this.control({
			'Login button[action=cancel]': {
				click: {
					fn: this.cancelEvent,
					scope: this
				}
			},
			'Login button[action=submit]': {
				click: {
					fn: this.submitEvent,
					scope: this
				}
			}
		}, this);
	},
	/**
	 * The event fired when cancelling the login process
	 */
	cancelEvent: function () {
		Ext.create('Ext.window.MessageBox').show ({
			title: 'Cancel',
			msg: 'Do you wish to cancel login?',
			buttonText: {
				yes: 'Cancel',
				no: 'Resume login'
			},
			fn: function (buttonId, text, opt) {
				if (buttonId == "yes") {
					window.location.href = '/';
				}
			}, scope: this
		});
	},
	/**
	 * The event fired when processing a login
	 */
	submitEvent: function () {
		// client side validation
		if (this.getForm().isValid()) {
			// server side validation
			Ext.Ajax.request({
				url: '/login/process',
				method: 'POST',
				params: this.getForm().getValues(),
				submitEmptyText: false,
				success: function (response) {
					// server side validation was successful and the user is redirected to the home page
					console.log(response.responseText);
					window.location.href = '/';
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
