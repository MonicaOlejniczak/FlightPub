Ext.define('FB.controller.Register', {
	extend: 'Ext.app.Controller',
	/**
	 * Dependencies
	 */
	requires: [
		'Ext.form.Panel',
		'Ext.form.field.ComboBox'
	],
	views: [
		'Register'
	],
	refs: [{
		ref: 'Form',
		selector: 'Register'
	}],
	/**
	 * Initialising function
	 */
	init: function() {
		Ext.widget('Register', {
			renderTo: Ext.get('register')
		});
		this.control({
			'Register': {
				afterrender: function () {
					var form = this.getForm();
					Ext.apply(form.down('#password'), {
						vtype: 'confirmedPassword'
					});
					Ext.apply(form.down('#confirmPassword'), {
						vtype: 'equalPassword'
					});
				}
			},
			'Register button[action=cancel]': {
				click: {
					fn: this.cancelEvent,
					scope: this
				}
			},
			'Register button[action=submit]': {
				click: {
					fn: this.submitEvent,
					scope: this
				}
			}
		}, this);
		Ext.apply(Ext.form.field.VTypes, {
			confirmedPassword: function() {
				return this.getForm().down('#confirmPassword').getValue() !== "";
			},
			confirmedPasswordText: 'Error: You must confirm your password.'
		}, this);
		Ext.apply(Ext.form.field.VTypes, {
			equalPassword: function() {
				var form = this.getForm();
				return form.down('#password').getValue() == form.down('#confirmPassword').getValue();
			},
			equalPasswordText: 'Error: Your new password and confirmed password do not match.'
		});
	},
	/**
	 * The event fired when cancelling the registration process
	 */
	cancelEvent: function () {
		Ext.create('Ext.window.MessageBox').show ({
			title: 'Cancel',
			msg: 'Do you wish to cancel registration?',
			buttonText: {
				yes: 'Cancel',
				no: 'Resume registration'
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
			url: '/register/process',
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
