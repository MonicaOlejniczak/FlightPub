/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.booking.flights.FlightsController', {
	extend: 'FB.view.PageController',
	alias: 'controller.Flights',
	requires: [
		'Ext.Component',
		'FB.view.booking.flights.display.Itinerary',
		'FB.view.booking.flights.display.Flight',
		'FB.view.booking.flights.display.WaitBar',
		'FB.model.Flight',
		'FB.model.Airline',
		'FB.store.Itinerary',
		'FB.store.Airline',
		'FB.store.Airport'
	],
	config: {
		source: null,
		destination: null,
		departing: null,
		returning: null,
		dataStore: null,
		itineraries: null,
		itinerary: null
	},
    statics: {
        RESULTS: 10
    },
	constructor: function () {
		this.setConfig({
			default: false,
			heading: 'Flights'
		});
	},
	init: function () {
		var view = this.getView();
		// add the sort and next request event to the view
		view.on('nextRequest', this.onNextRequest, this);
        view.down('#sort').on('sort', this.sort, this);
		// set the config values of the flight
		var flightDetails = view.getFlightDetails();
		this.setSource(flightDetails.source);
		this.setDestination(flightDetails.destination);
		this.setDeparting(flightDetails.departing);
		this.setReturning(flightDetails.returning);
		// set the config value of the data store
		this.setDataStore(Ext.create('FB.store.Itinerary', {
			autoLoad: true,
			listeners: {
				beforeload: function (store) {
					store.getProxy().setExtraParams({
						source: this.getSource(),
						destination: this.getDestination(),
						departing: this.getDeparting(),
						returning: this.getReturning()
					});
				},
				load: function (records) {
					this.renderItinerary(view, records);
				}, scope: this
			}
		}));
	},
	/**
	 * Renders the itineraries
	 *
	 * @param view the view to render the data to
	 * @param records the data from the store
	 */
	renderItinerary: function (view, records) {
		// check if the records are empty
		if (Object.keys(records).length === 0) {
			// display no flights have been found in the information
            this.renderInformation(view, 'No flights found.');
		} else {
			// update the flight selection text to select an option
            this.renderInformation(view, 'Please select a flight from the options below.');
			// specify the width for each hour (in px)
			var hourWidth = 30;
			var itineraries = {};
			// loop through the data store
			records.each(function (record, i) {
				// create the itinerary and its flights
				var itinerary = Ext.widget('Itinerary', {
					itemId: Ext.String.format('itinerary_{0}', record.id),
                    listeners: {
						render: function (component) {
							component.getEl().on({
								click: Ext.bind(this.selectItinerary, this, [record], true)
							});
						}, scope: this
					}
				});
                // get the flights from the record and render the views
				var flights = record.get('flights');
				this.renderFlights(flights, itinerary.down('#flights'), i, hourWidth);
                // add the departure and arrival times to the itinerary
                this.renderTimes(itinerary, flights);
				// add the itinerary to the itineraries object
				itineraries[record.id] = itinerary;
                if (i <= this.self.RESULTS) {
                    // add the itinerary to the array
                    view.down('#itineraries').add(itinerary);
                }
			}, this);
			// set the config itineraries variable
			this.setItineraries(itineraries);
		}
	},
    /**
     * Renders the information to display to the user on the flights page
     *
     * @param view the view to display the information on
     * @param information the information to display to the user
     */
    renderInformation: function (view, information) {
        view.down('#information').update({
            information: information
        });
    },
	/**
	 * Selects the itinerary record
	 *
	 * @param event the even triggered
	 * @param target the dom element that had the event triggered
	 * @param eOpts the extra options
	 * @param e some event firing listener
	 * @param record the particular record associate with the itinerary
	 */
	selectItinerary: function (event, target, eOpts, e, record) {
		var element = Ext.get(target);
		if (!element.hasCls('itinerary')) {
			Ext.select('.selectFlight').removeCls('selectFlight');
			element.up('.itinerary').addCls('selectFlight');
			this.setItinerary(record);
		}
	},
	/**
	 *
	 * @param flights the flight records in the itinerary
	 * @param itinerary the itinerary view
	 * @param i the current index in the itinerary loop
	 * @param hourWidth the width of each hour for the flight
	 */
	renderFlights: function (flights, itinerary, i, hourWidth) {
		// loop through each flight in the itinerary
		flights.forEach(function (flight, j) {
			// create the flight and add it to the itinerary
			var width = Math.max(110, (flight.duration / 60) * hourWidth);
			var price = flight.price.price.toFixed(2);
			var airline = flight.airline.name;
			var component = Ext.widget('Flight', {
				details: flight,
				width: width,
				listeners: {
					render: function () {
						this.getEl().dom.title = airline;
					}
				}
			});
            // update the data in the flight
			component.down('#content').update({
				price: price
			});
			component.down('#hidden').update({
				content: airline
			});
			itinerary.add(component);
			// check if the bar needs to be rendered and then render it
			if (j < flights.length - 1) {
				this.renderWaitBar(itinerary, flights, j, hourWidth);
			}
		}, this);
	},
	/**
	 * Renders the waiting bar to the itinerary
	 *
     * @param itinerary the itinerary view
	 * @param flights the flight records in the itinerary
	 * @param i the index of the flight
	 * @param hourWidth the width of each hour for the flight
	 */
	renderWaitBar: function (itinerary, flights, i, hourWidth) {
		var currentFlight = flights[i];
		var nextFlight = flights [i + 1];
		var hours = 1000 * 60 * 60;
		var arrivalTime = new Date(currentFlight.arrivalTime);
		var nextFlightArrival = new Date(nextFlight.departureTime);
		var startTime = arrivalTime.getTime() / hours;
		var endTime = nextFlightArrival.getTime() / hours;
        var scalingFactor = 0.1;
		var width = Math.max(hourWidth, (endTime - startTime) * hourWidth * scalingFactor);
		var destination = currentFlight.destination;
		var html = destination.code;
		var title = destination.name;
		itinerary.add(Ext.widget('WaitBar', {
			width: width,
			html: html,
			listeners: {
				render: function () {
					this.getEl().dom.title = title;
				}
			}
		}));
	},
    /**
     * Renders the departure and arrival time of the itinerary
     *
     * @param itinerary the itinerary to render the times to
     * @param flights the flight information from the itinerary
     */
    renderTimes: function (itinerary, flights) {
        // a function that formats the date object that is passed in into a date
        function date (date) {
            return Ext.Date.format(date, 'Y-m-d'); // 2000-01-01
        }
        // a function that formats the date object that is passed in into a time
        function time (date) {
            return Ext.Date.format(date, 'D H:i'); // MON 23:10
        }
        // get the departure and arrival time from the flights
        var departure = new Date(flights[0].departureTime);
        var arrival = new Date(flights[flights.length - 1].arrivalTime);
        // update the itinerary view with the new information
        itinerary.down('#departure').update({
            date: date(departure),
            time: time(departure)
        });
        itinerary.down('#arrival').update({
            date: date(arrival),
            time: time(arrival)
        });
    },
    /**
     * Applies the specified sort to the itineraries and displays the results
     *
     * @param sorter the sort specified by the user to sort by
     */
    sort: function (sorter) {
        // get the data store, itinerary view data and all of the current displays
        var dataStore = this.getDataStore();
        var itineraries = this.getItineraries();
        var flights = this.getView().down('#itineraries');
        // remove all of the current itinerary views
        flights.removeAll(false);
        // apply the sorting to the data store
        dataStore.sort(sorter);
        // display the new results
        var components = [];
        for (var i = 0; i < this.self.RESULTS; i++) {
            // add the itinerary to the view
            components.push(itineraries[dataStore.getAt(i).id]);
        }
        flights.add(components);
    },
	/**
	 * This method is called when the next button is pressed on the booking view
	 *
	 * @param parameters the information obtained from the booking controller
	 */
	onNextRequest: function (parameters) {
		var valid = this.getItinerary() !== null;
		// check if an itinerary has been selected
		if (valid) {
			var view = this.getView();
			// a function that creates the passengers view that enables the user to choose their ticket type and luggage
			function createPassengers (passengers) {
				view.fireEvent('addpage', Ext.create('FB.view.booking.passengers.Passengers', {
					passengers: passengers
				}));
			}
			// get the itinerary from the parameters
			var itinerary = this.getItinerary();
			// check if the flight has been changed
			if (parameters.itinerary !== itinerary) {
				// update the booking with the new itinerary
				view.fireEvent('update', itinerary);
				// reset the pages since a new itinerary has been chosen
				view.fireEvent('reset');
				// create the passengers page
				createPassengers.call(this, parameters.passengers);
			}
			view.fireEvent('next');
		} else {
			Ext.Msg.alert('Error', 'You must select a flight before proceeding.');
		}
	}
});
