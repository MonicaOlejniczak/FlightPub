Ext.define('FB.view.AboutController', {
	extend: 'FB.view.PageController',
	alias: 'controller.About',
	constructor: function () {
		this.setConfig({
			default: true,
			heading: 'About'
		});
	}
});
