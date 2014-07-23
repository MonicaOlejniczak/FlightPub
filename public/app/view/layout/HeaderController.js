Ext.define('FB.view.layout.HeaderController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Header',
	requires: [
		'Ext.container.Container'
	],
	control: {
		'#logo': {
			click: function () {
				FB.app.content.setPage('Home');
			}
		}
	}
});
