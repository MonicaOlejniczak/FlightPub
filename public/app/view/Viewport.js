/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.Viewport', {
	extend: 'Ext.container.Viewport',
	requires: [
		'Ext.layout.container.Border',
		'FB.view.layout.header.Header',
		'FB.view.layout.content.Content',
		'FB.view.ViewportController'
	],
	controller: 'Viewport',
	itemId: 'viewport',
	layout: 'fit',
	items: [{
		xtype: 'container',
		layout: 'auto',
		autoScroll: true,
		style: {
			'background-color': '#000'
		},
		items: [{
			xtype: 'Header'
		},  {
			xtype: 'Content'
		}]
	}]
});
