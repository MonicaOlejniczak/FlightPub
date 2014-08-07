/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.booking.passengers.passenger.PassengerController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Passenger',
	init: function () {
		// get the view, current passenger and update the value of the passenger
		var view = this.getView();
		var passenger = view.getPassenger();
		view.down('#passenger').update({
			passenger: passenger
		});
	}
});
