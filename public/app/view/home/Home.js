/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.home.Home', {
	extend: 'Ext.form.Panel',
	requires: [
		'Ext.container.Container',
		'Ext.form.field.ComboBox',
		'Ext.form.field.Date',
		'FB.model.Airport',
		'FB.store.Airport',
		'FB.view.home.flight.Source',
		'FB.view.home.flight.Destination',
		'FB.view.home.date.Departing',
		'FB.view.home.date.Returning',
		'FB.view.home.passengers.Adults',
		'FB.view.home.passengers.Children',
		'FB.view.home.passengers.Infants',
		'FB.view.home.HomeController'
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
				margin: '0 0 5px 0',
				flex: 1
			},
			items: [{
				xtype: 'Source',
                itemId: 'flightFrom',
                fieldLabel: 'Flight from'
			},  {
				xtype: 'Destination',
                itemId: 'flightTo',
                fieldLabel: 'Flight to'
			}]
		},  {
			defaults: {
				margin: '0 0 5px 0',
				flex: 1
			},
			items: [{
				xtype: 'Departing'
			},  {
				xtype: 'Returning'
			}]
		},  {
			defaults: {
				flex: 1
			},
			items: [{
				xtype: 'Adults'
			},  {
				xtype: 'Children'
			},  {
				xtype: 'Infants'
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
				cls: 'button-blue',
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
