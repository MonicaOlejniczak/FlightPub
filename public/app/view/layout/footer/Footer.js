/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.layout.footer.Footer', {
	extend: 'Ext.container.Container',
	requires: [
		'FB.view.layout.footer.FooterController'
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
