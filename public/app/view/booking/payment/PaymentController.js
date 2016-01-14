/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.booking.payment.PaymentController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Payment',
	init: function() {
		var view = this.getView();
		// update the details of the form via an ajax request
		//this.getDetails(view);
		// add the next request event to the view
		view.on('nextRequest', this.onNextRequest, this);
	},
	/**
	 * Gets the details of the user through an ajax request to the server
	 *
	 * @param form the form to render the details to
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
	 * @param form the form to render the account details to
	 * @param details the user account details
	 */
	renderDetails: function (form, details) {
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
	},
	/**
	 * This method is called when the next button is pressed on the booking view
	 *
	 * @param parameters the information obtained from the booking controller
	 */
	onNextRequest: function (parameters) {
		var form = this.getView();
		// check if the form is valid
		if (form.isValid()) {
			// set the payment config and submit the form to the server
			form.fireEvent('update', form.getValues());
			form.fireEvent('process');
		} else {
			Ext.Msg.alert('Error', 'The form you have attempted to submit contains errors.');
		}
	}
});
