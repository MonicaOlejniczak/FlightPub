Ext.define('FB.view.AboutController', {
	extend: 'FB.view.PageController',
	alias: 'controller.About',
	requires: [
		'Ext.container.Container'
	],
	constructor: function () {
		this.setConfig({
			default: true,
			heading: 'About'
		});
	}
});
