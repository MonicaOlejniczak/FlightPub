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
     * Reformats how the passenger values are sent
     *
     * @param values the values obtained from the form
     */
    getPassengers: function (values) {
        var passengers = [];
        var j = this.getView().getPassengers();
        for (var i = 0; i < j; i++) {
            passengers.push({
                firstName: values.firstName[i],
                lastName: values.lastName[i],
                ticketType: values.ticketType[i],
                luggageType: values.luggageType[i]
            });
        }
        return passengers;
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
            if (parameters.currentPage === parameters.totalPages) {
                // a function that creates the seats view for each flight
                function createSeats(itinerary, passengers) {
                    var flights = itinerary.data.flights;
                    var j = flights.length;
                    for (var i = 0; i < j; i++) {
                        form.fireEvent('addpage', Ext.create('FB.view.booking.seats.SeatSelection', {
                            index: i,
                            passengers: passengers,
                            flight: flights[i]
                        }));
                    }
                }
                // a function that create the payment form
                function createPayment() {
                    form.fireEvent('addpage', Ext.create('FB.view.booking.payment.Payment'));
                }
                // create the seat selection pages and the payment form
                createSeats.call(this, parameters.itinerary, parameters.passengers);
                createPayment.call(this);
            }
            // update the booking with the new passengers and set the next page
            form.fireEvent('update', this.getPassengers(form.getValues()));
            form.fireEvent('next');
        } else {
            Ext.Msg.alert('Error', 'You must fill out the form before proceeding.');
        }
	}
});
