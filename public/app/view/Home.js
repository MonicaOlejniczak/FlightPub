Ext.define('FB.view.Home', {
	extend: 'Ext.form.Panel',
	alias: 'widget.Home',
	standardSubmit: true,
	cls: 'x-plain',
	baseCls: 'x-plain',
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
			name: 'flightFrom',
			fieldLabel: 'Flight from'
		},  {
			itemId: 'flightTo',
			name: 'flightTo',
			fieldLabel: 'Flight to'
		}]
	},  {
		defaults: {
			xtype: 'datefield',
			minDate: new Date(),
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
			valueField: 'name',
			labelCls: 'passengers',
			flex: 1
		},
		items: [{
			itemId: 'adult',
			store: 'Adult',
			name: 'adult',
			fieldLabel: 'Passengers',
			value: '1 Adult',
			margin: '0 10px 0 0'
		},  {
			itemId: 'child',
			store: 'Child',
			name: 'child',
			value: '0 Children',
			margin: '0 10px 0 0'
		},  {
			itemId: 'infant',
			store: 'Infant',
			name: 'infant',
			value: '0 Infants'
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
	},  {
		itemId: 'map',
		xtype: 'container',
		layout: {
			type: 'hbox',
			align: 'stretch'
		},
		cls: 'map'
	}]
});
