Ext.define('FB.view.Content', {
	extend: 'Ext.container.Container',
	requires: [
		'FB.view.ContentController'
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
			cls: 'content'
		},  {
			xtype: 'Footer'
		}]
	}]
});
