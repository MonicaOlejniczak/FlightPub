/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.layout.header.navigation.Navigation', {
	extend: 'Ext.container.Container',
	requires: [
		'FB.view.layout.header.navigation.NavigationLink',
		'FB.view.layout.header.navigation.NavigationController'
	],
	xtype: 'Navigation',
	controller: 'Navigation',
	layout: {
		type: 'hbox',
		pack: 'end'
	},
	autoEl: {
		tag: 'nav',
		role: 'navigation'
	},
	cls: 'navigation',
	defaults: {
		xtype: 'NavigationLink',
		default: true
	},
	items: [{
		itemId: 'home',
		text: 'Home'
	},  {
		itemId: 'about',
		text: 'About'
	}]
});
