Ext.define('FB.containers.Duration', {

	/**
	 * A constructor that adds the duration container
	 * @constructor
	 */
	constructor: function() {
		Ext.onReady(function () {
			this.createDurationContainer();
			this.flights = Ext.create('FB.controllers.Flight');
		}, this);
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
			items: [
				{
					name: 'startDuration',
					id: 'startDuration',
					emptyText: 'minimum duration',
					margin: '0 10px 0 0',
					listeners: {
						blur: function () {
							me.filterStartDuration();
						}
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
							me.filterEndDuration();
						}
					}
				},
				{
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
		this.flights.filterFlights(id, function (value, item) {
			return startDuration == null ? true : startDuration <= item.data.duration;
		}, 'filterDuration', startDuration == null && Ext.getCmp('endDuration').getValue() == null)
	},
	/**
	 * A method that calls the generic filter function to filter the end duration
	 */
	filterEndDuration: function () {
		var id = 'endDuration';
		var endDuration = Ext.getCmp(id).getValue();
		this.flights.filterFlights(id, function (value, item) {
			return endDuration == null ? true : endDuration >= item.data.duration;
		}, 'filterDuration', Ext.getCmp('startDuration').getValue() == null && endDuration == null)
	},
	/**
	 * A methods to calculate the maximum duration based on the flights
	 */
	maxDuration: function() {
		var max = 0;
		this.flights.getDataStore().each(function (record) {
			max = Math.max(max, record.get('duration'));
		});
		return Math.ceil(max);
	}

});
