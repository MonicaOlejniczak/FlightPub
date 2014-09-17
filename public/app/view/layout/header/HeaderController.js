/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.layout.header.HeaderController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Header',
	control: {
		'#logo': {
			click: function () {
				this.fireEvent('redirect');
			}
		}
	}
});
