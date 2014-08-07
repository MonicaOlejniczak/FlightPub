/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.layout.header.Header', {
	extend: 'Ext.container.Container',
	requires: [
		'FB.view.layout.header.HeaderController',
		'FB.view.layout.header.navigation.Navigation'
	],
	xtype: 'Header',
	controller: 'Header',
	region: 'north',
	items: [{
		xtype: 'container',
		cls: 'header',
		items: [{
			xtype: 'Navigation'
		},  {
			xtype: 'container',
			cls: 'bannerContainer',
			items: [{
				xtype: 'container',
				cls: 'bannerGradient',
				items: [{
					xtype: 'container',
					layout: 'fit',
					cls: 'banner',
					defaults: {
						xtype: 'panel',
						baseCls: 'x-panel-plain',
						header: false
					},
					items: [{
						itemId: 'logo',
						cls: 'logo',
						html: 'FlightPub'
					},  {
						cls: 'subtext',
						html: 'Flights, simplified.'
					}]
				}]
			}]
		}]
	}]
});
