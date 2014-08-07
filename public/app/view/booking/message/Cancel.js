/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.booking.message.Cancel', {
	extend: 'Ext.window.MessageBox',
	requires: [
		'FB.view.booking.message.CancelController'
	],
	controller: 'Cancel',
	config: {
		booking: null,
		callback: null
	},
	title: 'Cancel'
});
