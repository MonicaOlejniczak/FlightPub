/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.account.settings.SettingsController', {
	extend: 'FB.view.PageController',
	alias: 'controller.AccountSettings',
	constructor: function () {
		this.setConfig({
			default: false,
			heading: 'Account Settings'
		});
	},
	init: function() {
		var form = this.getView();
		Ext.apply(form.down('#newPassword'), {
			vtype: 'confirmedPassword',
			vtypeText: 'You must confirm your password.'
		});
		Ext.apply(form.down('#confirmPassword'), {
			vtype: 'equalPassword',
			vtypeText: 'Your new password and confirmed password do not match'
		});
		Ext.apply(Ext.form.field.VTypes, {
			confirmedPassword: function() {
				return form.down('#confirmPassword').getValue() !== "";
			}
		}, this);
		Ext.apply(Ext.form.field.VTypes, {
			equalPassword: function() {
				return form.down('#newPassword').getValue() == form.down('#confirmPassword').getValue();
			}
		});
		this.getDetails(form);
		form.down('#cancel').on('click', this.cancel, this);
		form.down('#updateDetails').on('click', this.updateDetails, this);
	},
	/**
	 * Gets the details of the user through an ajax request to the server
	 *
	 * @param form the form to render the user account details to
	 */
	getDetails: function (form) {
		Ext.Ajax.request({
			url: '/data/account-details',
			success: function (response) {
				this.renderDetails(form, Ext.decode(response.responseText));
			}, scope: this
		});
	},
	/**
	 * Renders the form details
	 *
	 * @param form the form to render the user account details to
	 * @param details the user account details
	 */
	renderDetails: function (form, details) {
        if (details !== null) {
            form.down("#email").setValue(details.email);
            form.down('#firstName').setValue(details.firstName);
            form.down("#lastName").setValue(details.lastName);
            form.down("#phoneNumber").setValue(details.phoneNumber);
            form.down("#address").setValue(details.address);
            form.down("#suburb").setValue(details.suburb);
            //todo form.down("#country").setValue(details.country);
            form.down("#state").setValue(details.state);
            form.down("#postcode").setValue(details.postcode);
            if (details.paymentMethod != null) {
                form.down("#paymentMethod").setValue(details.paymentMethod);
            }
        }
	},
	/**
	 * The event fired when cancelling any setting updates
	 */
	cancel: function () {
		Ext.create('Ext.window.MessageBox').show ({
			title: 'Cancel',
			msg: 'Do you wish to cancel updating your settings?',
			buttonText: {
				yes: 'Cancel',
				no: 'Resume updating settings'
			},
			fn: function (buttonId, text, opt) {
				if (buttonId == "yes") {
					this.getView().fireEvent('redirect');
				}
			}, scope: this
		});
	},
	/**
	 * The event fired when updating settings
	 */
	updateDetails: function () {
		var form = this.getView();
		// client side validation
		if (form.isValid()) {
			// server side validation
			Ext.Ajax.request({
				url: '/account/process',
				method: 'POST',
				params: form.getValues(),
				submitEmptyText: false,
				success: function (response) {
					// server side validation was successful
					Ext.Msg.alert('Success', response.responseText);
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
