/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.booking.passengers.PassengersController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Passengers',
	requires: [
		'FB.view.booking.passengers.passenger.Passenger'
	],
	init: function () {
		var view = this.getView();
		var passengers = view.getPassengers() || 1;
		// add the next request event to the view
		view.on('nextRequest', this.onNextRequest, this);
		// render the passengers
		this.render(passengers);
	},
	/**
	 * A method that renders the tickets and luggage options
	 *
	 * @params passengers the amount of passengers to render the options for
	 */
	render: function (passengers) {
		var view = this.getView();
		for (var i = 0; i < passengers; i++) {
			var passenger = i + 1;
			view.add(Ext.widget('Passenger', {
				passenger: passenger
			}));
		}
	},
	/**
	 * This method is called when the next button is pressed on the booking view
	 *
	 * @param parameters the information obtained from the booking controller
	 */
	onNextRequest: function (parameters) {
		var view = this.getView();
		if (parameters.currentPage === parameters.totalPages) {
			// a function that creates the seats view for each flight
			function createSeats (itinerary, passengers) {
				var flights = itinerary.data.flights;
				var j = flights.length;
				for (var i = 0; i < j; i++) {
					view.fireEvent('addpage', Ext.create('FB.view.booking.seats.SeatSelection', {
						index: i,
						passengers: passengers,
						flight: flights[i]
					}));
				}
			}
			// a function that create the payment form
			function createPayment () {
				view.fireEvent('addpage', Ext.create('FB.view.booking.payment.Payment'));
			}
			// create the seat selection pages and the payment form
			createSeats.call(this, parameters.itinerary, parameters.passengers);
			createPayment.call(this);
		}
		// update the booking with the new passengers and set the next page
		view.fireEvent('update', view.getValues());
		view.fireEvent('next');
	}
});
