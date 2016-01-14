Ext.define('FB.view.booking.FlightsController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Flights',
	requires: [
		'FB.model.Flight',
		'FB.model.Airline',
		'FB.store.Itinerary',
		'FB.store.Airline',
		'FB.store.Airport'
	],
	config: {
		dataStore: null,
		itinerary: null
	},
	init: function () {
		/*Ext.onReady(function () {
            this.selectedItinerary = null;
			this.dataStore = Ext.create('FB.store.Itinerary', {
                autoLoad: false,
				listeners: {
					'load': function (store, records, successful, eOpts) {
						this.renderFlights();
					},
					scope: this
				}
			});
            var params = Ext.Object.fromQueryString(document.location.search);
            Ext.apply(this.dataStore.getProxy().extraParams, {
                source: params.source,
                destination: params.destination,
                departing: params.departing,
                returning: params.returning
            });
            this.dataStore.load();
		}, this);*/
	},
	/**
	 * Renders the flight results
	 */
	renderFlights: function () {
        var count = 0;
        function pad(n, width, z) {
            z = z || '0';
            n = n + '';
            return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
        }
		this.dataStore.each(function (record) {
            var itineraryId = record.get('id');
            var itinerary = record.get('flights');
            var contents = [];
			var hourWidth = 100;
            contents.push('<div id="flight_{itineraryId}" class="itinerary">'),
            itinerary.forEach(function (flight, i) {
	            var flightId = flight.id;
		        var flightNumber = flight.flightNumber;
		        var price = flight.price.price;
		        var duration = flight.duration;
		        var source = flight.source.name;
                var departureTime = new Date(flight.departureTime);
                var arrivalTime = new Date(flight.arrivalTime);
	            var airline = flight.airline.name;
	            var destinationCode = flight.destination.code;
	            var flightWidth = (duration / 60) * hourWidth;
                contents.push(
                    '<div id="flight_{itineraryId}_' + flightId + '" class="flight" style="width:' + flightWidth.toFixed(2) + 'px">',
                        '<div class="flightBar">',
                            '<div class="departure">',
                                '<div class="node"></div>',
                            '</div>',
                            '<div class="flightBarText">',
                                '<div class="flightBarTextVisible">',
                                    i === 0 ? '$' + record.get('price').toFixed(2) : '',
                                '</div>',
                                '<div class="flightBarTextHidden">',
                                    '<strong>' + airline + '</strong>',
                                '</div>',
                            '</div>',
                            '<div class="arrival">',
                                '<div class="node"></div>',
                            '</div>',
                        '</div>',
                    '</div>'
                );
	            if (i < itinerary.length - 1) {
		            var hours = 1000 * 60 * 60;
		            var nextFlightArrival = new Date(itinerary[i + 1].departureTime);
		            var startTime = arrivalTime.getTime() / hours;
		            var endTime = nextFlightArrival.getTime() / hours;
		            var width = (endTime - startTime) * hourWidth;
		            contents.push(
			            '<div class="waitBar" style="width:' + width.toFixed(2) + 'px">' + destinationCode + '</div>'
		            );
	            }
            });
			/*' + pad(departureTime.getHours(), 2) + ':' + pad(departureTime.getMinutes(), 2) + ' - ' + pad(arrivalTime.getHours(), 2) + ':' + pad(arrivalTime.getMinutes(), 2) + '*/
            contents.push('</div>');
			Ext.get('flights').createChild(Ext.create('Ext.XTemplate', contents.join(''), {
                compiled: true
            }).apply({
                itineraryId: itineraryId,
				stopOvers: itinerary.length - 1
			}));
			debugger;
			var weekday = new Array(7);
			weekday[0]=  "Sun";
			weekday[1] = "Mon";
			weekday[2] = "Tue";
			weekday[3] = "Wed";
			weekday[4] = "Thu";
			weekday[5] = "Fri";
			weekday[6] = "Sat";
			var itId = 'flight_' + itineraryId;
            //var id = 'flight_' + itineraryId + "_" + flight.id;
			var date = new Date(itinerary[0].departureTime);
			var departureTime = Ext.create('Ext.container.Container', {
				plain: true,
				renderTo: Ext.get('flight_' + itineraryId + '_' + itinerary[0].id),
				html: weekday[date.getDay()] + ' ' + + pad(date.getHours(), 2) + ':' + pad(date.getMinutes(), 2),
				cls: 'source',
				hidden: true
			});
			date = new Date(itinerary[itinerary.length - 1].arrivalTime);
			var arrivalTime = Ext.create('Ext.container.Container', {
				plain: true,
				renderTo: Ext.get('flight_' + itineraryId + '_' + itinerary[itinerary.length - 1].id),
                html: weekday[date.getDay()] + ' ' + pad(date.getHours(), 2) + ':' + pad(date.getMinutes(), 2),
				cls: 'destination',
				hidden: true
			});
			Ext.get(itId).on({
				'click': Ext.bind(this.selectFlight, this, [record], true),
				'mouseenter': function () {
					departureTime.show();
					arrivalTime.show();
				},
				'mouseleave': function () {
					departureTime.hide();
					arrivalTime.hide();
				}
			});
            var count = 0;
            Ext.select('.itinerary').each(function (el) {
                if (++count >= 10) {
                    el.addCls('hidden');
                }
            });
		}, this);
        if (this.dataStore.getTotalCount() === 0) {
            Ext.get('flights').createChild(Ext.create('Ext.XTemplate',
                '<div style="font-size: 2em; text-align: center; padding: 30px">No Flights Found</div>').apply({
            }));
        }
	},
	/**
	 * Selects a particular flight
	 */
	selectFlight: function (e, target, eOpts, record) {
		var element = Ext.get(target);
		if (!element.hasCls('itinerary')) {
			Ext.select('.selectFlight').removeCls('selectFlight');
			element.up('.itinerary').addCls('selectFlight');
			this.selectedItinerary = record; // select
		}
	}
	//var itinerary = this.selectedItinerary;
	//itinerary: itinerary.getFlightIds(),
});
