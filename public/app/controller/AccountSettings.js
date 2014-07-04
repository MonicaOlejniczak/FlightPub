Ext.define('FB.controller.AccountSettings', {
	extend: 'Ext.app.Controller',
	/**
	 * Dependencies
	 */
	requires: [
	    'Ext.form.Panel',
		'Ext.form.field.Number',
		'Ext.form.field.ComboBox'
	],
	views: [
		'AccountSettings'
	],
	refs: [{
		ref: 'Form',
		selector: 'AccountSettings'
	}],
	/**
	 * Initialising function
	 */
	init: function() {
		Ext.widget('AccountSettings', {
			renderTo: Ext.get('accountSettings')
		});
		this.getDetails();
		this.control({
			'AccountSettings': {
				afterrender: function () {
					debugger;
					// todo fix this not being fired
					var form = this.getForm();
					Ext.apply(form.down('#newPassword'), {
						vtype: 'confirmedPassword'
					});
					Ext.apply(form.down('#confirmPassword'), {
						vtype: 'equalPassword'
					});
				}
			},
			'AccountSettings button[action=cancel]': {
				click: {
					fn: this.cancelEvent,
					scope: this
				}
			},
			'AccountSettings button[action=submit]': {
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
					this.getForm().reset();
					window.location.href = '/';
				}
			}, scope: this
		});
	},
	/**
	 * The event fired when updating settings
	 */
	submitEvent: function () {
		// client side validation
		if (this.getForm().isValid()) {
			// server side validation
			Ext.Ajax.request({
				url: '/account/process',
				method: 'POST',
				params: this.getForm().getValues(),
				submitEmptyText: false,
				success: function (response) {
					// server side validation was successful
					Ext.Msg.alert('Success', response.responseText);
					window.location.href = '/restricted';
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
