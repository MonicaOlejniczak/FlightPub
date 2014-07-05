Ext.define('FB.view.layout.Footer', {
	extend: 'Ext.container.Container',
	alias: 'widget.layout.Footer',
	region: 'south',
	layout: {
		type: 'fit'
	},
	items: [{
		xtype: 'container',
		itemId: 'footer',
		cls: 'footer',
		html: 'FlightPub &copy; 2014-present. All rights reserved.'
	}]
});
