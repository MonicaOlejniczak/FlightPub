(function() {

	Ext.syncRequire('Ext.Ajax');

	Ext.define('Flights', {
		extend: 'Ext.data.Model',
		fields: [
			'airline',
			'flightNumber',
			'departureTime',
			'arrivalTime',
			'stopOver',
			'duration',
			'price'
		]
	});

	/**
	 * A constructor that adds the click events to the flights page and converts the json file to a data store
	 * @constructor
	 */
	function Flights () {
		this.url = 'data/selectedFlights';
		Ext.require('Ext.data.Store');
		Ext.onReady(function () {
			this.addEvents();
			this.dataStore = Ext.create('Ext.data.Store', {
				model: 'Flights',
				proxy: {
					url: this.url,
					type: 'ajax',
					reader: {
						type: 'json'
					}
				},
				autoLoad: true,
				listeners: {
					load: function (store, records, successful, eOpts) {
						this.sort('sortStopOvers', [{
							property: 'stopOver',
							direction: 'ASC',
							transform: function (stopOver) {
								return stopOver == null ? 0 : 1;
							}
						}]);
						this.dataStore.each(function (record) {
							Ext.get('flights').createChild(new Ext.XTemplate(
								"<div>",
									"Flight id: {id}<br />",
									"Airline: {airline}<br />",
									"Flight number: {flightNumber}<br />",
									"Price: ${price}<br />",
									"Duration: {duration}<br />",
									"Departure time: {departure}<br />",
									"Arrival time: {arrival}<br />",
									"Stop overs: {stopOvers}<p></p>",
								"</div>"
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
					},
					scope: this
				}
			});
		}, this);
	}

	Flights.prototype.addEvents = function () {
		Ext.get('sortPrice').on({
			'click': Ext.pass(this.sort, ['sortPrice', [{
				property: 'price', 
				direction: 'ASC', 
				transform: function (price) {
					return price.price;
				}
			}]], this)
		});
		Ext.get('sortDuration').on({
			'click': Ext.pass(this.sort, 'sortDuration', [[{
				property: 'duration',
				direction: 'ASC'
			}]], this)
		});
		Ext.get('sortDepartureTime').on({
			'click': Ext.pass(this.sort, 'sortDepartureTime', [[{
				property: 'departureTime',
				direction: 'ASC'
			}]], this)
		});
		Ext.get('sortArrivalTime').on({
			'click': Ext.pass(this.sort, 'sortArrivalTime', [[{
				property: 'arrivalTime',
				direction: 'ASC'
			}]], this)
		});
		Ext.get('sortStopOvers').on({
			'click': Ext.pass(this.sort, 'sortStopOvers', [[{
				property: 'stopOver',
				direction: 'ASC',
				transform: function (stopOver) {
					return stopOver == null ? 0 : 1;
				}
			}]], this)
		});
		Ext.get('sortAirline').on({
			'click': Ext.pass(this.sort, 'sortAirline', [[{
				property: 'airline',
				direction: 'ASC',
				transform: function (airline) {
					return airline.name;
				}
			}]], this)
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
	};

	/**
	 * Sorting the search results
	 */
	Flights.prototype.sort = function (id, sorter) {
		Ext.select('.sortSelected').removeCls('sortSelected');
		Ext.get(id).addCls('sortSelected');
		this.dataStore.sort(sorter);
	};

	/**
	 * Filtering the search results
	 */
	Flights.prototype.filter = function (id) {
		Ext.get(id).toggleCls('filterSelected');
	};

	Flights.prototype.filterNone = function () {
		Ext.select('.filterSelected').removeCls('filterSelected');
	};

	Flights.prototype.filterAll = function () {
		Ext.select('#filter > span').addCls('filterSelected');
	};

	window.FB.Flights = new Flights();

}());