Ext.define('FB.view.Viewport', {
	extend: 'Ext.container.Viewport',
	requires: [
		'Ext.layout.container.Border',
		'FB.view.layout.Header',
		'FB.view.layout.Content'
	],
	layout: {
		header: false,
		type: 'border'
	},
	items: [{
		xtype: 'Header'
	},  {
		xtype: 'Content'
	}]
});
