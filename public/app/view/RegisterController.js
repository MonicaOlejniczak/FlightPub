Ext.define('FB.view.RegisterController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Register',
	requires: [
		'Ext.form.Panel',
		'Ext.form.field.ComboBox'
	],
	control: {
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
	},
	init: function() {
		// todo apply vtype to email
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
		// client side validation
		if (this.getForm().isValid()) {
			// server side validation
			Ext.Ajax.request({
				url: '/register/process',
				method: 'POST',
				submitEmptyText: false,
				params: this.getForm().getValues(),
				success: function(response) {
					// server side validation was successful and the user is redirected to the home page
					console.log(response.responseText);
					window.location.href = '/';
				},
				failure: function(response) {
					Ext.Msg.alert('Error', response.responseText);
				}, scope: this
			});
		} else {
			Ext.Msg.alert('Error', 'Form fields may not be submitted with invalid values.');
		}
	}

});
