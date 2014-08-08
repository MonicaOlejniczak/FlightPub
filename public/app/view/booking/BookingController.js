/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.booking.BookingController', {
	extend: 'FB.view.PageController',
	alias: 'controller.Booking',
	config: {
		content: null,
		itinerary: null,
		passengers: null,
		seats: [],
		payment: null,
		currentPage: 0
	},
	control: {
		'#booking > component': { // listeners known to all parts of the booking
			next: 'onNext',
			addpage: 'onAddPage'
		},
		'#booking > Flights': {
			reset: 'onReset',
			update: {
				fn: function (itinerary) {
					this.setItinerary(itinerary);
				}
			}
		},
		'#booking > Passengers': {
			update: {
				fn: function (passengers) {
					this.setPassengers(passengers);
				}
			}
		},
		'#booking > SeatSelection': {
			update: {
				fn: function (index, seats) {
					this.getSeats()[index] = seats;
				}
			}
		},
		'#booking > Payment': {
			process: 'onProcess',
			update: {
				fn: function (payment) {
					this.setPayment(payment);
				}
			}
		}
	},
	init: function () {
		var view = this.getView();
		// set the content of the booking controller
		this.setContent(view.down('#booking'));
		// create the flight
		var flightDetails = view.getFlightDetails();
		this.onAddPage(Ext.create('FB.view.booking.flights.Flights', {
			flightDetails: flightDetails
		}));
		this.onNext();
		// add the event listeners to the view
		this.addEvents(view);
	},
	/**
	 * This method adds event handlers to the container
	 *
	 * @param view the view to add the events to
	 */
	addEvents: function (view) {
		view.down('#back').on('click', this.back, this);
		view.down('#next').on('click', this.next, this);
		view.down('#cancel').on({
			click: {
				fn: Ext.pass(this.cancel, [view, Ext.Function.pass(view.fireEvent, ['redirect', {page: 'Home'}], view)], this),
				scope: this
			}
		});
	},
	/**
	 * Returns the total amount of pages in the booking
	 */
	getTotalPages: function () {
		return this.getContent().getLayout().getLayoutItems().length;
	},
	/**
	 * Returns the total amount of passengers
	 */
	getTotalPassengers: function () {
		var flightDetails = this.getView().getFlightDetails();
		return flightDetails.adults + flightDetails.children + flightDetails.infants;
	},
	/**
	 * Cancels the booking
	 *
	 * @param booking the booking view
	 * @param callback the callback method to process, typically to redirect the user
	 */
	cancel: function (booking, callback) {
		Ext.create('FB.view.booking.message.Cancel', {
			booking: booking,
			callback: callback
		});
	},
	/**
	 * Goes back one page in the booking
	 */
	back: function () {
		// check if exiting the booking
		if (this.getCurrentPage() === 1) {
			var view = this.getView();
			view.fireEvent('removebooking', view); // gone back too far
		} else {
			this.setPage(this.getCurrentPage() - 1); // go back one page
		}
	},
	/**
	 * Goes forward one page in the booking
	 */
	next: function () {
		var active = this.getContent().getLayout().getActiveItem();
		active.fireEvent('nextRequest', {
			itinerary: this.getItinerary(),
			passengers: this.getTotalPassengers(),
			currentPage: this.getCurrentPage(),
			totalPages: this.getTotalPages()
		});
	},
	/**
	 * Adds a page to the content
	 *
	 * @param page the component to add to the content
	 */
	onAddPage: function (page) {
		this.getContent().add(page);
	},
	/**
	 * Sets the current page to the next page
	 */
	onNext: function () {
		this.setPage(this.getCurrentPage() + 1);
	},
	/**
	 * Sets the active booking display through the current page by gettings its index
	 *
	 * @param currentPage the current page being displayed
	 */
	setPage: function (currentPage) {
		var content = this.getContent();
		this.setCurrentPage(currentPage);
		content.getLayout().setActiveItem(currentPage - 1); // get the correct index
	},
	/**
	 * Resets the pages when a new itinerary has been chosen
	 */
	onReset: function () {
		var currentPage = this.getCurrentPage() - 1;    // get the index
		var totalPages = this.getTotalPages() - 1;      // get the index
		var content = this.getContent();
		// check if any pages should be removed
		if (currentPage < totalPages) {
			// remove the pages from the content
			for (var i = totalPages; i > currentPage; i--) {
				content.remove(i);
			}
		}
	},
	/**
	 * Submits and processes the booking to the server
	 */
	onProcess: function () {
        // get the member variables from the booking
		var itinerary = this.getItinerary().getFlightIds();
		var p = this.getPassengers();
		var s = this.getSeats();
		var payment = this.getPayment();
        var passengers = [];
        // loop through each passenger
        for (var i = 0; i < s.length; i++) {
            var flights = [];
            // get the flight id and seat number for the current flight in the itinerary
            Ext.each(s[i], function (seat) {
                flights.push({
                    flightId: itinerary[i],
                    seat: seat
                });
            }, this);
            // add the passenger information into the passengers array
            passengers.push({
                flights: flights,
                ticketType: p.ticketType, // TODO: per passenger?
                luggageType: p.luggageType // TODO: per passenger?
            });
        }
        // submit the booking to the server via ajax
		Ext.Ajax.request({
			url: '/booking/process',
			method: 'POST',
			jsonData: {
				itinerary: itinerary,
				passengers: passengers,
				payment: payment
			},
			success: function (response) {
				// server side validation was successful and the user is redirected to the bookings page
				// todo redirect to bookings page
				// form.fireEvent('register');
				Ext.Msg.alert('Success', 'Your booking was processed successfully.');
				console.log('The booking was submitted to the server successfully.');
			},
			failure: function (response) {
				Ext.Msg.alert('Error', 'Your booking was not able to be processed.');
			}, scope: this
		});
	}

});
