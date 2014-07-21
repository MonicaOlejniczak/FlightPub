Ext.define('FB.view.PaymentOptionsController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.PaymentOptions',
	requires: [
		'Ext.form.Panel',
		'Ext.form.field.Number',
		'Ext.form.field.ComboBox'
	],
	control: {
		'PaymentOptions': {
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
		'PaymentOptions button[action=cancel]': {
			click: {
				fn: this.cancelEvent,
				scope: this
			}
		},
		'PaymentOptions button[action=submit]': {
			click: {
				fn: this.submitEvent,
				scope: this
			}
		}
	},
	init: function() {
		Ext.onReady(function () {
			this.getDetails();
		}, this);
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
			msg: 'Do you wish to cancel your booking?',
			buttonText: {
				yes: 'Cancel Booking',
				no: 'Resume Booking'
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
		this.getForm().submit({
			url: '/payment/process',
			method: 'post',
			submitEmptyText: false,
			params: {
				params: Ext.encode(POST_PARAMS)
			},
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
