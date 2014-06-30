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
	 * The event fired when processing registration
	 */
	submitEvent: function () {
		this.getForm().submit({
			url: '/login/process',
			method: 'post',
			submitEmptyText: false,
			success: function(form, action) {
				if (form.isValid()) {
					Ext.Msg.alert('Success', action.result.msg);
				} else {
					Ext.Msg.alert('Error', 'Form fields may not be submitted with invalid values.');
				}
			},
			failure: function(form, action) {
				switch (action.failureType) {
					case Ext.form.action.Action.CLIENT_INVALID:
						Ext.Msg.alert('Failure', 'Form fields may not be submitted with invalid values.');
						break;
					case Ext.form.action.Action.CONNECT_FAILURE:
						Ext.Msg.alert('Failure', 'Ajax communication failed.');
						break;
					case Ext.form.action.Action.SERVER_INVALID:
						Ext.Msg.alert('Failure', action.result.msg);
				}
			}
		});
	}

});
