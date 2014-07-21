Ext.define('FB.view.Footer', {
	extend: 'Ext.container.Container',
	requires: [
		'FB.view.FooterController'
	],
	xtype: 'Footer',
	controller: 'Footer',
	items: [{
		xtype: 'container',
		itemId: 'footer',
		cls: 'footer',
		html: 'FlightPub &copy; 2014-present. All rights reserved.'
	}]
});
