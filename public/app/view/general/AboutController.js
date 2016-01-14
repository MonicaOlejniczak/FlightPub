/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.general.AboutController', {
	extend: 'FB.view.PageController',
	alias: 'controller.About',
	constructor: function () {
		this.setConfig({
			default: true,
			heading: 'About'
		});
	}
});
