Ext.define('FB.view.layout.Header', {
	extend: 'Ext.container.Container',
	requires: [
		'FB.view.layout.HeaderController'
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
				xtype: 'container',
				itemId: 'navigation',
				layout: {
					type: 'hbox',
					pack: 'end'
				},
				autoEl: {
					tag: 'nav',
					role: 'navigation'
				},
				defaults: {
					xtype: 'button',
					baseCls: 'x-btn-plain'
				},
				items: [{
					itemId: 'home',
					text: 'Home'
				},  {
					itemId: 'about',
					text: 'About'
				},  {
					itemId: 'contact',
					text: 'Contact'
				}]
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
