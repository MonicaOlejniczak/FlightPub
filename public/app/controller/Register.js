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
		// client side validation
		if (this.getForm().isValid()) {
			// server validation
			Ext.Ajax.request({
				url: '/register/is-valid',
				method: 'POST',
				params: this.getForm().getValues(),
				success: function(response) {
					console.log(response.responseText);
					this.submitForm();
				},
				failure: function(response) {
					Ext.Msg.alert('Error', response.responseText);
				}, scope: this
			});
		} else {
			Ext.Msg.alert('Error', 'Form fields may not be submitted with invalid values.');
		}
	},
	/**
	 * The method called when a server side check is performed on the form
	 */
	submitForm: function () {
		this.getForm().submit({
			url: '/register/process',
			method: 'POST',
			submitEmptyText: false,
			success: function(form, action) {
				// always successful at this point
				Ext.Msg.alert('Success', action.result.msg);
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
