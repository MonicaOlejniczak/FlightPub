Ext.define('FB.controller.AccountSettings', {
	extend: 'Ext.app.Controller',
	requires: [
	  'Ext.form.Panel'
	],
	views: [
		'accountSettings'
	],
	refs: [{
		ref: 'Form',
		selector: 'accountSettingsForm'
	}],
	init: function() {
		this.getDetails();
		this.control({
			'accountSettingsForm': {
				afterrender: function () {
					var form = this.getForm();
						Ext.apply(form.down('#newPassword'), {
						vtype: 'confirmedPassword'
					});
					Ext.apply(form.down('#confirmPassword'), {
						vtype: 'equalPassword'
					});
				}
			},
			'accountSettingsForm button[action=cancel]': {
				click: {
					fn: this.cancelEvent,
					scope: this
				}
			},
			'accountSettingsForm button[action=submit]': {
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
				return form.down('#newPassword').getValue() == form.down('#confirmPassword').getValue();
			},
			equalPasswordText: 'Error: Your new password and confirmed password do not match.'
		});
		Ext.widget('accountSettingsForm'); // display and render the form
	},
	/**
	 * Gets the details of the user through an ajax request to the server
	 */
	getDetails: function () {
		Ext.Ajax.request({
			url: '/data/account-details',
			success: function(response) {
				this.renderDetails(Ext.decode(response.responseText));
			}, scope: this
		});
	},
	/**
	 * Renders the form details
	 *
	 * @param details the user account details
	 */
	renderDetails: function (details) {
		var form = this.getForm();
		form.down("#email").setValue(details.email);
		form.down('#firstName').setValue(details.firstName);
		form.down("#lastName").setValue(details.lastName);
		form.down("#phoneNumber").setValue(details.phoneNumber);
		form.down("#address").setValue(details.address);
		form.down("#suburb").setValue(details.suburb);
		//form.down("#country").setValue(details.country);
		form.down("#state").setValue(details.state);
		form.down("#postcode").setValue(details.postcode);
		if (details.paymentMethod != null) {
			form.down("#paymentMethod").setValue(details.paymentMethod);
		}
		form.down("#cardName").setValue(details.cardName);
		form.down("#cardNumber").setValue(details.cardNumber);
		form.down("#ppUsername").setValue(details.ppUsername);
	},
	/**
	 * The event fired when cancelling any setting updates
	 */
	cancelEvent: function () {
		Ext.create('Ext.window.MessageBox').show ({
			title: 'Cancel',
			msg: 'Do you wish to cancel updating your settings?',
			buttonText: {
				yes: 'Cancel',
				no: 'Resume updating settings'
			},
			fn: function (buttonId, text, opt) {
				if (buttonId == "yes") {
					form.getForm().reset();
					window.location.href = '/';
				}
			}
		});
	},
	/**
	 * The event fired when updating settings
	 */
	submitEvent: function () {
		this.getForm().submit({
			url: '/account/process',
			method: 'post',
			submitEmptyText: false,
			success: function(form, action) {
				if (form.isValid()) {
					return confirmPassword();
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
