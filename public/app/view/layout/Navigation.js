Ext.define('FB.view.layout.Navigation', {
	extend: 'Ext.container.Container',
	requires: [
		'FB.view.layout.NavigationController'
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
});
