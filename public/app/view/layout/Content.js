Ext.define('FB.view.layout.Content', {
	extend: 'Ext.container.Container',
	requires: [
		'FB.view.layout.ContentController',
		'FB.view.About',
		'FB.view.Home',
		'FB.view.layout.Footer'
	],
	xtype: 'Content',
	controller: 'Content',
	region: 'center',
	items: [{
		xtype: 'container',
		cls: 'contentContainer',
		items: [{
			xtype: 'panel',
			itemId: 'heading',
			baseCls: 'x-panel-plain',
			tpl: '<h1>{text}</h1>',
			data: {
				text: 'FlightPub'
			}
		},  {
			xtype: 'container',
			itemId: 'content',
			layout: 'card',
			cls: 'content',
			items: [{
				xtype: 'About'
			},  {
				xtype: 'Home'
			}]
		},  {
			xtype: 'Footer'
		}]
	}]
});
