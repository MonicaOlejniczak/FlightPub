/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.booking.message.CancelController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Cancel',
	init: function () {
		var view = this.getView();
		var booking = view.getBooking();
		var callback = view.getCallback();
		view.show({
			msg: 'Do you wish to cancel your booking?',
			buttonText : {
				yes: 'Cancel booking',
				no: 'Resume'
			},
			fn: function (buttonId) {
				// checks if the user cancels and fires the event to remove the booking page
				if (buttonId == "yes") {
					booking.fireEvent('removebooking', booking, callback);
				}
			}
		});
	}
});
