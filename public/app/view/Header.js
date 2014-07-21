Ext.define('FB.view.Header', {
	extend: 'Ext.container.Container',
	requires: [
		'FB.view.HeaderController'
	],
	xtype: 'Header',
	controller: 'Header',
	region: 'north',
	layout: 'fit',
	items: [{
		xtype: 'container',
		cls: 'header',
		items: [{
			xtype: 'container',
			cls: 'navigation',
			items: [{
				xtype: 'component',
				itemId: 'navigationLinks',
				autoEl: {
					tag: 'nav',
					role: 'navigation'
				}
			}]
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
						cls: 'logo',
						html: '<a href="/">FlightPub</a>'
					},  {
						cls: 'subtext',
						html: 'Flights, simplified.'
					}]
				}]
			}]
		}]
	}]
});
