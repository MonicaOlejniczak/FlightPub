Ext.define('FB.controllers.Flights', {
	/**
	 * Dependencies
	 */
	requires: [
		'FB.models.Flight',
		'FB.models.Airline',
		'FB.stores.Flight',
		'FB.stores.Airline',
		'FB.sorters.Price',
		'FB.sorters.Duration',
		'FB.sorters.DepartureTime',
		'FB.sorters.ArrivalTime',
		'FB.sorters.StopOver',
		'FB.sorters.Airline',
		'Ext.container.Container',
		'Ext.layout.container.Border',
		'Ext.form.field.Number',
		'Ext.form.field.ComboBox'
	],
	/**
	 * A constructor that adds the click events to the flights page and converts the json file to a data store
	 * @constructor
	 */
	constructor: function () {
		Ext.onReady(function () {
			this.lastSortedBy = null;
			this.activeContainer = null;
			this.priceSorter = Ext.create('FB.sorters.Price');
			this.durationSorter = Ext.create('FB.sorters.Duration');
			this.departureTimeSorter = Ext.create('FB.sorters.DepartureTime');
			this.arrivalTimeSorter = Ext.create('FB.sorters.ArrivalTime');
			this.stopOverSorter = Ext.create('FB.sorters.StopOver');
			this.airlineSorter = Ext.create('FB.sorters.Airline');
			this.priceContainer = null;
			this.durationContainer = null;
			this.stopOverContainer = null;
			this.airlineContainer = null;
			this.dataStore = Ext.create('FB.stores.Flight');
			this.dataStore.addListener('load', function(store, records, successful, eOpts) {
				this.renderFlights();
				this.sort.apply(this, ['sortPrice', this.priceSorter]);
			}, this);
			this.createPriceContainer();
			this.createDurationContainer();
			this.createStopOverContainer();
			this.createAirlineContainer();
			this.addEvents();
		}, this);
	},
	/**
	 * Renders the flight results
	 */
	renderFlights: function () {
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
					'Stop overs: {stopOvers}<br /><br />',
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
	},
	/**
	 * Adds the container for the price filter
	 */
	createPriceContainer: function () {
		var me = this;
		var maxValue = this.maxPrice();
		this.priceContainer = Ext.create('Ext.container.Container', {
			layout: 'hbox',
			renderTo: Ext.get('filterContainer'),
			cls: 'filterContainer',
			flex: 2,
			hidden: true,
			defaults: {
				xtype: 'numberfield',
				flex: 1,
				minValue: 0,
				maxValue: maxValue,
				maxLength: maxValue.toString().length,
				enforceMaxLength: true,
				hideTrigger: true
			},
			items: [{
				name: 'startPrice',
				id: 'startPrice',
				emptyText: 'minimum price',
				margin: '0 10px 0 0',
				listeners: {
					blur: function () {
						me.filterStartPrice();
					}
				}
			},  {
				name: 'endPrice',
				id: 'endPrice',
				emptyText: 'maximum price',
				margin: '0 10px 0 0',
				vtype: 'endPrice',
				listeners: {
					blur: function () {
						me.filterEndPrice();
					}
				}
			}, {
				xtype: 'button',
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
			endPrice: function(value) {
				return Ext.getCmp('startPrice').getValue() < value;
			},
			endPriceText: 'Not a valid end price. This must be greater than the start price.'
		});
	},
	/**
	 * A method that calls the generic filter function to filter the start price
	 */
	filterStartPrice: function () {
		var id = 'startPrice';
		var startPrice = Ext.getCmp(id).getValue();
		this.filterFlights(id, function (value, item) {
			return startPrice == null ? true : startPrice <= item.data.price.price;
		}, 'filterPrice', startPrice == null && Ext.getCmp('endPrice').getValue() == null)
	},
	/**
	 * A method that calls the generic filter function to filter the end price
	 */
	filterEndPrice: function () {
		var id = 'endPrice';
		var endPrice = Ext.getCmp(id).getValue();
		this.filterFlights(id, function (value, item) {
			return endPrice == null ? true : endPrice >= item.data.price.price;
		}, 'filterPrice', Ext.getCmp('startPrice').getValue() == null && endPrice == null)
	},
	/**
	 * Adds the container for the duration filter
	 */
	createDurationContainer: function () {
		var me = this;
		var maxValue = this.maxDuration();
		this.durationContainer = Ext.create('Ext.container.Container', {
			layout: 'hbox',
			renderTo: Ext.get('filterContainer'),
			cls: 'filterContainer',
			flex: 2,
			hidden: true,
			defaults: {
				xtype: 'numberfield',
				flex: 1,
				minValue: 0,
				maxValue: maxValue,
				maxLength: maxValue.toString().length,
				enforceMaxLength: true,
				hideTrigger: true
			},
			items: [{
				name: 'startDuration',
				id: 'startDuration',
				emptyText: 'minimum duration',
				margin: '0 10px 0 0',
				listeners: {
					blur: function () {
						me.filterStartDuration();
					}
				}
			},  {
				name: 'endDuration',
				id: 'endDuration',
				emptyText: 'maximum duration',
				margin: '0 10px 0 0',
				vtype: 'endDuration',
				listeners: {
					blur: function () {
						me.filterEndDuration();
					}
				}
			},  {
				xtype: 'button',
				name: 'clearDuration',
				id: 'clearDuration',
				text: 'Clear',
				scale: 'small',
				cls: 'filterStyleButton',
				listeners: {
					click: function () {
						Ext.getCmp('startDuration').setValue(null);
						Ext.getCmp('endDuration').setValue(null);
						me.filterStartDuration();
						me.filterEndDuration();
					}
				}
			}]
		});
		Ext.apply(Ext.form.field.VTypes, {
			endDuration: function(value, field) {
				return Ext.getCmp('startDuration').getValue() < value;
			},
			endPriceText: 'Not a valid end duration. This must be greater than the start duration.'
		});
	},
	/**
	 * A method that calls the generic filter function to filter the start duration
	 */
	filterStartDuration: function () {
		var id = 'startDuration';
		var startDuration = Ext.getCmp(id).getValue();
		this.filterFlights(id, function (value, item) {
			return startDuration == null ? true : startDuration <= item.data.duration;
		}, 'filterDuration', startDuration == null && Ext.getCmp('endDuration').getValue() == null)
	},
	/**
	 * A method that calls the generic filter function to filter the end duration
	 */
	filterEndDuration: function () {
		var id = 'endDuration';
		var endDuration = Ext.getCmp(id).getValue();
		this.filterFlights(id, function (value, item) {
			return endDuration == null ? true : endDuration >= item.data.duration;
		}, 'filterDuration', Ext.getCmp('startDuration').getValue() == null && endDuration == null)
	},
	/**
	 * Adds the container for the airline filter
	 */
	createStopOverContainer: function () {
		var me = this;
		//todo fix data store
		var stopOvers = Ext.create('Ext.data.Store', {
			fields: [
				'amount'
			],
			data : [
				{"amount": 0},
				{"amount": 1}
			]
		});
		this.stopOverContainer = Ext.create('Ext.container.Container', {
			layout: 'hbox',
			renderTo: Ext.get('filterContainer'),
			cls: 'filterContainer',
			flex: 2,
			hidden: true,
			items: [{
				xtype: 'combobox',
				name: 'stopOver',
				id: 'stopOver',
				store: stopOvers,
				displayField: 'amount',
				valueField: 'amount',
				editable: false,
				flex: 1,
				emptyText: 'none',
				margin: '0 10px 0 0',
				listeners: {
					select: function () {
						me.filterStopOvers();
					}
				}
			},  {
				xtype: 'button',
				flex: 0.5,
				name: 'clearStopOvers',
				id: 'clearStopOvers',
				text: 'Clear',
				scale: 'small',
				cls: 'filterStyleButton',
				listeners: {
					click: function () {
						Ext.getCmp('stopOver').setValue(null);
						me.filterStopOvers();
					}
				}
			}]
		});
	},
	/**
	 * A method that calls the generic filter function to filter the stop overs
	 */
	filterStopOvers: function () {
		var id = 'stopOver';
		var stopOver = Ext.getCmp(id).getValue();
		this.filterFlights(id, function (value, item) {
			return stopOver == null ? true : stopOver == (item.data.stopOver == null ? 0 : 1);
		}, 'filterStopOvers', stopOver == null)
	},
	/**
	 * Adds the container for the airline filter
	 */
	createAirlineContainer: function () {
		var me = this;
		//todo fix data store
		var airlines = Ext.create('Ext.data.Store', {
			fields: [
				'name',
				'code'
			],
			data : [
				{'name': 'Virgin Blue', 'code': 'Alabama'},
				{'name': 'Air Canada',  'code': 'Alaska'},
				{'name': 'Finnair',     'code': 'Arizona'}
			]
		});
		this.airlineContainer = Ext.create('Ext.container.Container', {
			layout: 'hbox',
			renderTo: Ext.get('filterContainer'),
			cls: 'filterContainer',
			flex: 2,
			hidden: true,
			items: [{
				xtype: 'combobox',
				name: 'airline',
				id: 'airline',
				store: airlines,
				model: 'FB.models.Airline',
				displayField: 'name',
				valueField: 'name',
				editable: false,
				flex: 1,
				emptyText: 'no airline selected',
				margin: '0 10px 0 0',
				listeners: {
					select: function () {
						me.filterAirline();
					}
				}
			},  {
				xtype: 'button',
				flex: 0.5,
				name: 'clearAirlines',
				id: 'clearAirlines',
				text: 'Clear',
				scale: 'small',
				cls: 'filterStyleButton',
				listeners: {
					click: function () {
						Ext.getCmp('airline').setValue(null);
						me.filterAirline();
					}
				}
			}]
		});
	},
	/**
	 * A method that calls the generic filter function to filter the stop overs
	 */
	filterAirline: function () {
		var id = 'airline';
		var airline = Ext.getCmp(id).getValue();
		this.filterFlights(id, function (value, item) {
			return airline == null ? true : airline.toLowerCase() == item.data.airline.name.toLowerCase();
		}, 'filterAirline', airline == null)
	},
	/**
	 * A method to calculate the maximum price based on the flights
	 */
	maxPrice: function() {
		var max = 0;
		this.dataStore.each(function (record) {
			max = Math.max(max, record.get('price').price);
		});
		return Math.ceil(max);
	},
	/**
	 * A methods to calculate the maximum duration based on the flights
	 */
	maxDuration: function() {
		var max = 0;
		this.dataStore.each(function (record) {
			max = Math.max(max, record.get('duration'));
		});
		return Math.ceil(max);
	},
	/**
	 * This method toggles the container's visibility and hides any active containers and text
	 *
	 * @param container the container to toggle whether it is shown or hidden
	 * @param text the filter text associated with the container
	 */
	toggleContainer: function (container, text) {
		Ext.select('.filterSelected').removeCls('filterSelected');
		if (container.isHidden()) {
			container.show();
			if (this.activeContainer != null) {
				this.activeContainer.hide();
			}
			text.addCls('filterSelected');
			this.activeContainer = container;
		} else {
			container.hide();
			this.activeContainer = null;
		}
	},
	/**
	 * Adds click events to each sorting and filtering option
	 */
	addEvents: function () {
		Ext.get('sortPrice').on({
			'click': Ext.pass(this.sort, ['sortPrice', this.priceSorter], this)
		});
		Ext.get('sortDuration').on({
			'click': Ext.pass(this.sort, ['sortDuration', this.durationSorter], this)
		});
		Ext.get('sortDepartureTime').on({
			'click': Ext.pass(this.sort, ['sortDepartureTime', this.departureTimeSorter], this)
		});
		Ext.get('sortArrivalTime').on({
			'click': Ext.pass(this.sort, ['sortArrivalTime', this.arrivalTimeSorter], this)
		});
		Ext.get('sortStopOvers').on({
			'click': Ext.pass(this.sort, ['sortStopOvers', this.stopOverSorter], this)
		});
		Ext.get('sortAirline').on({
			'click': Ext.pass(this.sort, ['sortAirline', this.airlineSorter], this)
		});
		Ext.get('filterNone').on({
			'click': this.filterNone,
			scope: this
		});
		Ext.get('filterPrice').on({
			'click': Ext.pass(this.toggleContainer, [this.priceContainer, Ext.get('filterPrice')], this)
		});
		Ext.get('filterDuration').on({
			'click': Ext.pass(this.toggleContainer, [this.durationContainer, Ext.get('filterDuration')], this)
		});
		Ext.get('filterStopOvers').on({
			'click': Ext.pass(this.toggleContainer, [this.stopOverContainer, Ext.get('filterStopOvers')], this)
		});
		Ext.get('filterAirline').on({
			'click': Ext.pass(this.toggleContainer, [this.airlineContainer, Ext.get('filterAirline')], this)
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
			this.dataStore.sorters.each(function (sorter) {
				sorter.toggle();
			});
		}
		this.dataStore.sort(sorter);
		var parent = Ext.get('flights');
		this.dataStore.each(function (record) {
			parent.appendChild(Ext.get('flight_' + record.get('id')));
		});
		this.lastSortedBy = id;
	},
	/**
	 * Filter the search results by hiding the filtered DOM elements
	 */
	filter: function() {
		Ext.select('#flights > div').addCls('filter');
		this.dataStore.each(function (record) {
			Ext.get('flight_' + record.get('id')).removeCls('filter');
		});
	},
	/**
	 * Clears the values in each input, hides any active containers and removes all filters
	 */
	filterNone: function () {
		var inputs = Ext.select('input');
		inputs.each(function (input) {
			input.dom.value = null;
		});
		if (this.activeContainer != null) {
			this.activeContainer.hide();
			this.activeContainer = null;
		}
		Ext.select('.filterActive').removeCls('filterActive');
		Ext.select('.filterSelected').removeCls('filterSelected');
		this.dataStore.clearFilter();
		this.filter();
	},
	/**
	 * Filters the specified component
	 *
	 * @param id the id of the component to filter
	 * @param compare the comparator function
	 * @param filterId the id of the html class to underline as active
	 * @param inactive whether the text for the filter id is active
	 */
	filterFlights: function (id, compare, filterId, inactive) {
		var component = Ext.getCmp(id);
		var filterName = id + 'Filter';
		if (component.isValid()) {
			this.dataStore.filters.removeAtKey(filterName);
			this.dataStore.addFilter([
				Ext.create('Ext.util.Filter', {
					id: filterName,
					filterFn: function(item) {
						if (inactive) {
							Ext.get(filterId).removeCls('filterActive');
						} else {
							Ext.get(filterId).addCls('filterActive');
						}
						return compare(component.getValue(), item);
					}
				})
			]);
			this.filter();
		}
	}

});
