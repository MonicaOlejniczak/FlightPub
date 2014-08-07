/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.layout.content.Content', {
	extend: 'Ext.container.Container',
	requires: [
		'Ext.Component',
		'FB.view.general.About',
		'FB.view.home.Home',
		'FB.view.layout.footer.Footer',
		'FB.view.layout.content.ContentController'
	],
	xtype: 'Content',
	controller: 'Content',
	region: 'center',
	cls: 'contentContainer',
	items: [{
		xtype: 'component',
		itemId: 'heading',
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
});
