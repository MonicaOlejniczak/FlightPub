Ext.define('FB.view.layout.Header', {
	extend: 'Ext.container.Container',
	alias: 'widget.layout.Header',
	region: 'north',
	layout: {
		type: 'fit'
	},
	items: [{
		xtype: 'container',
		itemId: 'header',
		cls: 'header',
		items: [{
			xtype: 'container',
			itemId: 'navigation',
			cls: 'navigation',
			items: [{
				xtype: 'panel',
				itemId: 'navigationLinks',
				cls: 'navigationLinks'
			}]
		},  {
			xtype: 'container',
			cls: 'bannerContainer',
			items: [{
				xtype: 'container',
				cls: 'bannerGradient',
				items: [{
					xtype: 'container',
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
