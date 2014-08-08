/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.booking.flights.display.Flight', {
	extend: 'Ext.container.Container',
	alias: 'widget.Flight',
	requires: [
		'Ext.Component'
	],
	cls: 'flight',
	defaults: {
		style: {
			float: 'left'
		}
	},
	items: [{
		xtype: 'component',
		cls: 'node'
	},  {
		xtype: 'component',
		itemId: 'content',
		tpl: '${price}',
		data: {
			price: 0
		}
	},  {
		xtype: 'component',
		itemId: 'hidden',
		tpl: '<strong>{content}</strong>',
		cls: 'hidden'
	},  {
		xtype: 'component',
		cls: 'node',
		style: {
			float: 'right'
		}
	}]
});
