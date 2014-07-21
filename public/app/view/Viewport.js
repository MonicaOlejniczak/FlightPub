Ext.define('FB.view.Viewport', {
	extend: 'Ext.container.Viewport',
	requires: [
		'Ext.layout.container.Border',
		'FB.view.Header',
		'FB.view.Content',
		'FB.view.Footer'
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
