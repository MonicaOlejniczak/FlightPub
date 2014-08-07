/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.booking.flights.filters.FilterController', {
	extend: 'FB.view.ViewController',
	alias: 'controller.FlightsFilter',
	requires: [
		'FB.sorter.ArrivalTime',
		'FB.sorter.DepartureTime',
		'FB.sorter.Duration',
		'FB.sorter.Price',
		'FB.sorter.StopOver'
	],
	config: {
		lastSortedBy: null,
		arrivalTimeSorter: Ext.create('FB.sorter.ArrivalTime'),
		departureTimeSorter: Ext.create('FB.sorter.DepartureTime'),
		durationSorter: Ext.create('FB.sorter.Duration'),
		priceSorter: Ext.create('FB.sorter.Price'),
		stopOverSorter: Ext.create('FB.sorter.StopOver')
	},
	/**
	 * Adds the container for the price filter
	 */
	createPriceContainer: function () {
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
			items: [
				{
					name: 'startPrice',
					id: 'startPrice',
					emptyText: 'minimum price',
					margin: '0 10px 0 0',
					listeners: {
						blur: function () {
							this.filterStartPrice();
						},
						scope: this
					}
				},
				{
					name: 'endPrice',
					id: 'endPrice',
					emptyText: 'maximum price',
					margin: '0 10px 0 0',
					vtype: 'endPrice',
					listeners: {
						blur: function () {
							this.filterEndPrice();
						},
						scope: this
					}
				},
				{
					xtype: 'button',
					name: 'clearPrice',
					id: 'clearPrice',
					text: 'Clear',
					scale: 'small',
					cls: 'clearButton',
					listeners: {
						click: function () {
							Ext.getCmp('startPrice').setValue(null);
							Ext.getCmp('endPrice').setValue(null);
							this.filterStartPrice();
							this.filterEndPrice();
						},
						scope: this
					}
				}
			]
		});
		Ext.apply(Ext.form.field.VTypes, {
			endPrice: function (value) {
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
			return startPrice == null ? true : startPrice <= item.data.price;
		}, 'filterPrice', startPrice == null && Ext.getCmp('endPrice').getValue() == null)
	},
	/**
	 * A method that calls the generic filter function to filter the end price
	 */
	filterEndPrice: function () {
		var id = 'endPrice';
		var endPrice = Ext.getCmp(id).getValue();
		this.filterFlights(id, function (value, item) {
			return endPrice == null ? true : endPrice >= item.data.price;
		}, 'filterPrice', Ext.getCmp('startPrice').getValue() == null && endPrice == null)
	},
	/**
	 * Adds the container for the duration filter
	 */
	createDurationContainer: function () {
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
			items: [
				{
					name: 'startDuration',
					id: 'startDuration',
					emptyText: 'minimum duration',
					margin: '0 10px 0 0',
					listeners: {
						blur: function () {
							this.filterStartDuration();
						},
						scope: this
					}
				},
				{
					name: 'endDuration',
					id: 'endDuration',
					emptyText: 'maximum duration',
					margin: '0 10px 0 0',
					vtype: 'endDuration',
					listeners: {
						blur: function () {
							this.filterEndDuration();
						},
						scope: this
					}
				},
				{
					xtype: 'button',
					name: 'clearDuration',
					id: 'clearDuration',
					text: 'Clear',
					scale: 'small',
					cls: 'clearButton',
					listeners: {
						click: function () {
							Ext.getCmp('startDuration').setValue(null);
							Ext.getCmp('endDuration').setValue(null);
							this.filterStartDuration();
							this.filterEndDuration();
						},
						scope: this
					}
				}
			]
		});
		Ext.apply(Ext.form.field.VTypes, {
			endDuration: function (value, field) {
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
		//todo fix data store
		var stopOvers = Ext.create('Ext.data.Store', {
			fields: [
				'amount'
			],
			data: [
				{'amount': 0},
				{'amount': 1},
				{'amount': 2},
				{'amount': 3},
				{'amount': 4},
				{'amount': 5},
				{'amount': 6},
				{'amount': 7},
				{'amount': 8},
				{'amount': 9},
				{'amount': 10}
			]
		});
		this.stopOverContainer = Ext.create('Ext.container.Container', {
			layout: 'hbox',
			renderTo: Ext.get('filterContainer'),
			cls: 'filterContainer',
			flex: 2,
			hidden: true,
			items: [
				{
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
							this.filterStopOvers();
						},
						scope: this
					}
				},
				{
					xtype: 'button',
					flex: 0.5,
					name: 'clearStopOvers',
					id: 'clearStopOvers',
					text: 'Clear',
					scale: 'small',
					cls: 'clearButton',
					listeners: {
						click: function () {
							Ext.getCmp('stopOver').setValue(null);
							this.filterStopOvers();
						},
						scope: this
					}
				}
			]
		});
	},
	/**
	 * A method that calls the generic filter function to filter the stop overs
	 */
	filterStopOvers: function () {
		var id = 'stopOver';
		var stopOver = Ext.getCmp(id).getValue();
		this.filterFlights(id, function (value, item) {
			return stopOver === item.data.stopOvers;
		}, 'filterStopOvers', stopOver == null)
	},
	/**
	 * A method to calculate the maximum price based on the flights
	 */
	maxPrice: function () {
		var max = 0;
		this.dataStore.each(function (record) {
			max = Math.max(max, record.get('price').price);
		});
		return Math.ceil(max);
	},
	/**
	 * A methods to calculate the maximum duration based on the flights
	 */
	maxDuration: function () {
		var max = 0;
		this.dataStore.each(function (record) {
			max = Math.max(max, record.get('duration'));
		});
		return Math.ceil(max);
	},
	/**
	 * Filter the search results by hiding the filtered DOM elements
	 */
	filter: function () {
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
					filterFn: function (item) {
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