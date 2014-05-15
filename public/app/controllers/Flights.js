Ext.define('FB.controllers.Flights', {

	requires: [
		'FB.models.Flight'
	],

	/**
	 * The sorters for each field in the model
	 */
	priceSorter: [
		'sortPrice', {
			property: 'price',
			direction: 'ASC',
			transform: function (price) {
				return price.price;
			}
		}
	],

	durationSorter: [
		'sortDuration', {
			property: 'duration',
			direction: 'ASC'
		}
	],

	departureTimeSorter: [
		'sortDepartureTime', {
			property: 'departureTime',
			direction: 'ASC'
		}
	],

	arrivalTimeSorter: [
		'sortArrivalTime', {
			property: 'arrivalTime',
			direction: 'ASC'
		}
	],

	stopOverSorter: [
		'sortStopOvers', {
			property: 'stopOver',
			direction: 'ASC',
			transform: function (stopOver) {
				return stopOver == null ? 0 : 1;
			}
		}
	],

	airlineSorter: [
		'sortAirline', {
			property: 'airline',
			direction: 'ASC',
			transform: function (airline) {
				return airline.name;
			}
		}
	],

	/**
	 * A constructor that adds the click events to the flights page and converts the json file to a data store
	 * @constructor
	 */
	constructor: function () {
		this.url = 'data/selectedFlights';
		this.lastSortedBy = null;
		Ext.onReady(function () {
			this.addEvents();
			this.dataStore = Ext.create('Ext.data.Store', {
				model: 'FB.models.Flight',
				proxy: {
					url: this.url,
					type: 'ajax',
					reader: {
						type: 'json'
					}
				},
				autoLoad: true,
				sortOnLoad: false,
				listeners: {
					load: function (store, records, successful, eOpts) {
						this.dataStore.each(function (record) {
							Ext.get('flights').createChild(new Ext.XTemplate(
								'<div id="flight_{id}">',
									'Flight id: {id}<br />',
									'Airline: {airline}<br />',
									'Flight number: {flightNumber}<br />',
									'Price: ${price}<br />',
									'Duration: {duration}<br />',
									'Departure time: {departure}<br />',
									'Arrival time: {arrival}<br />',
									'Stop overs: {stopOvers}<p></p>',
								'</div>'
							).apply({
								id: record.get('id'),
								airline: record.get('airline').name,
								flightNumber: record.get('flightNumber'),
								price: record.get('price').price,
								duration: record.get('duration'),
								departure: new Date(record.get('departureTime')),
								arrival: new Date(record.get('arrivalTime')),
								stopOvers: record.get('stopOver') == null ? 0 : 1
							}));
						});
						this.sort.apply(this, this.priceSorter);
					},
					scope: this
				}
			});
		}, this);
	},
	/**
	 * Adds click events to each sorting and filtering option
	 */
	addEvents: function () {
		Ext.get('sortPrice').on({
			'click': Ext.pass(this.sort, this.priceSorter, this)
		});
		Ext.get('sortDuration').on({
			'click': Ext.pass(this.sort, this.durationSorter, this)
		});
		Ext.get('sortDepartureTime').on({
			'click': Ext.pass(this.sort, this.departureTimeSorter, this)
		});
		Ext.get('sortArrivalTime').on({
			'click': Ext.pass(this.sort, this.arrivalTimeSorter, this)
		});
		Ext.get('sortStopOvers').on({
			'click': Ext.pass(this.sort, this.stopOverSorter, this)
		});
		Ext.get('sortAirline').on({
			'click': Ext.pass(this.sort, this.airlineSorter, this)
		});
		/*Ext.get('sortClass').on({
		 'click': Ext.pass(this.sort, 'sortClass', 'class'),
		 scope: this
		 });*/
		Ext.get('filterNone').on({
			'click': this.filterNone,
			scope: this
		});
		Ext.get('filterPrice').on({
			'click': Ext.pass(this.filter, ['filterPrice'], this)
		});
		Ext.get('filterDuration').on({
			'click': Ext.pass(this.filter, ['filterDuration'], this)
		});
		Ext.get('filterDepartureTime').on({
			'click': Ext.pass(this.filter, ['filterDepartureTime'], this)
		});
		Ext.get('filterArrivalTime').on({
			'click': Ext.pass(this.filter, ['filterArrivalTime'], this)
		});
		Ext.get('filterStopOvers').on({
			'click': Ext.pass(this.filter, ['filterStopOvers'], this)
		});
		Ext.get('filterAirline').on({
			'click': Ext.pass(this.filter, ['filterAirline'], this)
		});
		Ext.get('filterClass').on({
			'click': Ext.pass(this.filter, ['filterClass'], this)
		});
		Ext.get('filterAll').on({
			'click': this.filterAll,
			scope: this
		});
	},

	/**
	 * This method sorts the search results by first removing any selected classes and applying it to the correct
	 * flight. It then retrieves the parent element where the children (the sorted data) are stored and appends a
	 * specific flight div into the parent into the correct order.
	 */
	sort: function (id, sorter) {
		Ext.select('.sortSelected').removeCls('sortSelected');
		Ext.get(id).addCls('sortSelected');
		if (id == this.lastSortedBy) {
			this.dataStore.sorters.toggle();
		}
		this.dataStore.sort(sorter);
		var parent = Ext.get('flights');
		this.dataStore.each(function (record) {
			var el = Ext.get('flight_' + record.get('id'));
			parent.appendChild(el);
		});
		this.lastSortedBy = id;
	},

	/**
	 * Filtering the search results
	 */
	filter: function (id) {
		Ext.get(id).toggleCls('filterSelected');
	},

	filterNone: function () {
		Ext.select('.filterSelected').removeCls('filterSelected');
	},

	filterAll: function () {
		Ext.select('#filter > span').addCls('filterSelected');
	}

});

//Ext.namespace('_FB');
//_FB.Flights = Ext.create('FB.controllers.Flights');