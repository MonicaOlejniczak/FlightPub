Ext.define('FB.controllers.Flights', {

	requires: [
		'FB.models.Flight',
		'Ext.container.Container',
		'Ext.layout.container.Border',
		'Ext.form.field.Number'
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
	 * The pop-up for each filter
	 */
	priceContainer: null,

	/**
	 * A constructor that adds the click events to the flights page and converts the json file to a data store
	 * @constructor
	 */
	constructor: function () {
		this.url = 'data/selectedFlights';
		this.lastSortedBy = null;
		Ext.onReady(function () {
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
							Ext.get('flights').createChild(Ext.create('Ext.XTemplate',
								'<div id="flight_{id}">',
									'Flight id: {id}<br />',
									'Airline: {airline}<br />',
									'Flight number: {flightNumber}<br />',
									'Price: ${price}<br />',
									'Duration: {duration}<br />',
									'Departure time: {departure}<br />',
									'Arrival time: {arrival}<br />',
									'Stop overs: {stopOvers}<p></p>',
								'</div>', {
									compiled: true
								}
							).apply({
								id: record.get('id'),
								airline: record.get('airline').name,
								flightNumber: record.get('flightNumber'),
								price: record.get('price').price,
								duration: record.get('duration'),
								departure: new Date(record.get('departureTime')),
								arrival: new Date(record.get('arrivalTime')),
								stopOvers: record.get('stopOver') == null ? 0 : 1
							}))
						});
						this.sort.apply(this, this.priceSorter);
						this.createPriceContainer();
						this.addEvents();
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
		Ext.get('filterPriceContainer').on({
			'click': this.filterPriceContainer,
			scope: this
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
	 * Adds the containers for each filter
	 */
	createPriceContainer: function () {
		var minPrice = 0;//this.minPrice();
		var maxPrice = this.maxPrice();
		var maxLength = (Math.ceil(this.maxPrice()) + "").length;
		var me = this;
		this.priceContainer = Ext.create('Ext.container.Container', {
			layout: 'hbox',
			renderTo: Ext.get('filterContainer'),
			cls: 'filterStyle',
			flex: 2,
			hidden: true,
			defaults: {
				xtype: 'numberfield',
				flex: 1,
				minValue: minPrice,
				maxValue: maxPrice,
				maxLength: maxLength,
				enforceMaxLength: true,
				hideTrigger: true
			},
			items: [{
				name: 'startPrice',
				id: 'startPrice',
				margin: '0 10px 0 0',
				emptyText: 'start price',
				listeners: {
					blur: function () {
						me.filterStartPrice();
					}
				}
			},  {
				name: 'endPrice',
				id: 'endPrice',
				margin: '0 10px 0 0',
				emptyText: 'end price',
				vtype: 'endPrice',
				listeners: {
					blur: function () {
						me.filterEndPrice();
					}
				}
			}, {
				xtype: 'button',
				flex: 0.5,
				name: 'clearPrice',
				id: 'clearPrice',
				text: 'Clear',
				scale: 'small',
				cls: 'filterStyleButton',
				listeners: {
					click: function () {
						Ext.getCmp('startPrice').setValue(null);
						Ext.getCmp('endPrice').setValue(null);
						me.filterStartPrice();
						me.filterEndPrice();
					}
				}
			}]
		});
		Ext.apply(Ext.form.field.VTypes, {
			endPrice: function(value, field) {
				return Ext.getCmp('startPrice').value < value;
			},
			endPriceText: 'Not a valid end price. This must be greater than the start price.'
		});
	},
	/**
	 * Methods to calculate the minimum and maximum price
	 */
	minPrice: function() {
		var min = this.maxPrice();
		this.dataStore.each(function (record) {
			min = Math.min(min, record.get('price').price);
		});
		return Math.floor(min);
	},

	maxPrice: function() {
		var max = 0;
		this.dataStore.each(function (record) {
			max = Math.max(max, record.get('price').price);
		});
		return Math.ceil(max);
	},

	validatePrice: function (price, startPrice, endPrice) {
		return startPrice != null && endPrice != null && (price < startPrice || price > endPrice);
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
	toggleContainer: function (container) {
		if (container.isHidden()) {
			container.show();
		 } else {
			container.hide();
		 }
	},

	filterNone: function () {
		Ext.select('.filterSelected').removeCls('filterSelected');
		Ext.select('.filter').removeCls('filter');
	},

	filterPriceContainer: function () {
		this.toggleContainer(this.priceContainer);
	},

	filterStartPrice: function () {
		if (Ext.getCmp('startPrice').isValid()) {
			var me = this;
			this.dataStore.each(function (record) {
				var price = record.get('price').price;
				var startPrice = Ext.getCmp('startPrice').getValue();
				var endPrice = Ext.getCmp('endPrice').getValue();
				var remove = false;
				if (startPrice == null && endPrice == null) {
					remove = true;
				} else if (startPrice == null && endPrice != null) {
					remove = price <= endPrice;
				} else {
					remove = (endPrice == null && price < startPrice) || me.validatePrice(price, startPrice, endPrice) ? false : true;
				}
				me.filterRecord(remove, record);
			});
		}
	},

	filterEndPrice: function () {
		if (Ext.getCmp('endPrice').isValid()) {
			var me = this;
			this.dataStore.each(function (record) {
				var price = record.get('price').price;
				var startPrice = Ext.getCmp('startPrice').getValue();
				var endPrice = Ext.getCmp('endPrice').getValue();
				var remove = false;
				if (startPrice == null && endPrice == null) {
					remove = true;
				} else if (endPrice == null && startPrice != null) {
					remove = price >= startPrice;
				} else {
					remove = (startPrice == null && price > endPrice) || me.validatePrice(price, startPrice, endPrice) ? false : true;
				}
				me.filterRecord(remove, record);
			});
		}
	},

	filterRecord: function(remove, record) {
		if (remove) {
			Ext.get('flight_' + record.get('id')).removeCls('filter');
		} else {
			Ext.get('flight_' + record.get('id')).addCls('filter');
		}
	},

	filterAll: function () {
		Ext.select('#filter > span').addCls('filterSelected');
	}

});

//Ext.namespace('_FB');
//_FB.Flights = Ext.create('FB.controllers.Flights');