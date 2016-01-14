Ext.define('FB.view.booking.Booking', {
	extend: 'Ext.container.Container',
	requires: [
		'FB.view.booking.BookingController'
	],
	xtype: 'Booking',
	controller: 'Booking',
	items: [{
		xtype: 'container',
		itemId: 'booking',
		layout: 'card',
		items: [{
			xtype: 'Flights'
		}]
	},  {
		xtype: 'container',
		layout: {
			type: 'hbox',
			pack: 'end'
		},
		margin: '5px 0 0 0',
		items: [{
			xtype: 'button',
			itemId: 'cancel',
			text: 'Cancel Booking',
			cls: 'cancelButton',
			margin: '0 5px 0 0'
		},  {
			xtype: 'button',
			itemId: 'back',
			text: 'Back',
			cls: 'button'
		},  {
			xtype: 'button',
			itemId: 'next',
			text: 'Next',
			cls: 'button'
		}]
	}]
});
