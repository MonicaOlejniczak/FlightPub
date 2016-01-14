Ext.define('FB.view.Home', {
	extend: 'Ext.form.Panel',
	requires: [
		'Ext.container.Container',
		'Ext.form.Panel',
		'Ext.form.Label',
		'Ext.form.field.ComboBox',
		'Ext.form.field.Date',
		'FB.view.HomeController',
		'FB.model.Airport',
		'FB.store.Airport'
	],
	xtype: 'Home',
	controller: 'Home',
	itemId: 'Home',
	standardSubmit: true,
	baseCls: 'x-plain',
	items: [{
		xtype: 'container',
		cls: 'smallerContent',
		defaults: {
			xtype: 'container',
			layout: {
				type: 'hbox',
				align: 'stretch'
			}
		},
		items: [{
			defaults: {
				xtype: 'combo',
				model: 'FB.models.Airport',
				store: 'Airport',
				queryMode: 'remote',
				displayField: 'name',
				valueField: 'name',
				emptyText: 'none',
				margin: '0 0 5px 0',
				flex: 1
			},
			items: [{
				itemId: 'flightFrom',
				name: 'source',
				fieldLabel: 'Flight from'
			},  {
				itemId: 'flightTo',
				name: 'destination',
				fieldLabel: 'Flight to'
			}]
		},  {
			defaults: {
				xtype: 'datefield',
				minDate: new Date(),
		        submitFormat: 'U000',
				margin: '0 0 5px 0',
				flex: 1
			},
			items: [{
				itemId: 'departing',
				name: 'departing',
				fieldLabel: 'Departing'
			},  {
				itemId: 'returning',
				name: 'returning',
				fieldLabel: 'Returning'
			}]
		},  {
			defaults: {
				xtype: 'combo',
				queryMode: 'local',
				displayField: 'name',
				valueField: 'value',
				cls: 'passengers',
				flex: 1
			},
			items: [{
				itemId: 'adult',
				store: 'Adult',
				name: 'adults',
				fieldLabel: 'Passengers',
				value: 1
			},  {
				itemId: 'child',
				store: 'Child',
				name: 'children',
				value: 0
			},  {
				itemId: 'infant',
				store: 'Infant',
				name: 'infants',
				value: 0
			}]
		},  {
			xtype: 'container',
			layout: {
				type: 'hbox',
				pack: 'end'
			},
			margin: '5px 0 0 0',
			items: [{
				itemId: 'submit',
				xtype: 'button',
				text: 'Find Flights',
				cls: 'button',
				margin: '0 0 5px 0'
			}]
		}]
	},  {
		xtype: 'component',
		itemId: 'map',
		layout: {
			type: 'hbox',
			align: 'stretch'
		},
		cls: 'map'
	}]
});
