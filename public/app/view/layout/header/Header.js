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
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'container',
                cls: 'banner',
                items: [{
                    xtype: 'component',
                    itemId: 'logo',
                    cls: 'logo',
                    html: 'FlightPub'
                },  {
                    xtype: 'component',
                    cls: 'subtext',
                    html: 'Flights, simplified.'
                }]
            },  {
                xtype: 'container',
                itemId: 'advertisement',
                cls: 'advertisement'
            }]
		}]
	}]
});
