Ext.define('FB.view.Home', {
	extend: 'Ext.form.Panel',
	requires: [
		'FB.view.HomeController',
		'FB.controller.Pages'
	],
	xtype: FB.controller.Pages.getXtype(FB.controller.Pages.Page.HOME),
	controller: FB.controller.Pages.getXtype(FB.controller.Pages.Page.HOME),
	itemId: FB.controller.Pages.getItemId(FB.controller.Pages.Page.HOME),
	standardSubmit: true,
	cls: 'x-plain',
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
				margin: '0 0 2px 0',
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
				labelCls: 'passengers',
				flex: 1
			},
			items: [{
				itemId: 'adult',
				store: 'Adult',
				name: 'adults',
				fieldLabel: 'Passengers',
				value: 1,
				margin: '0 10px 0 0'
			},  {
				itemId: 'child',
				store: 'Child',
				name: 'children',
				value: 0,
				margin: '0 10px 0 0'
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
				action: 'submit',
				text: 'Find Flights',
				cls: 'button',
				scale: 'large',
				margin: '0 0 10px 0'
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
