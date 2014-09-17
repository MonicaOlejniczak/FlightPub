/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.booking.BookingProcess', {
	extend: 'Ext.container.Container',
    alias: 'widget.BookingProcess',
	requires: [
		'FB.view.booking.BookingProcessController'
	],
	controller: 'BookingProcess',
	itemId: 'Booking',
	cls: 'booking',
	config: {
		flightDetails: null
	},
	items: [{
		xtype: 'container',
		itemId: 'booking',
		layout: 'card'
	},  {
		xtype: 'container',
		itemId: 'buttons',
		layout: {
			type: 'hbox',
			pack: 'end'
		},
		margin: '5px 0 0 0',
		items: [{
			xtype: 'button',
			itemId: 'cancel',
			text: 'Cancel',
            baseCls: 'x-btn-plain',
			cls: 'button-red',
			margin: '0 5px 0 0'
		},  {
			xtype: 'button',
			itemId: 'back',
			text: 'Back',
            baseCls: 'x-btn-plain',
			cls: 'button-blue',
			margin: '0 5px 0 0'
		},  {
			xtype: 'button',
			itemId: 'next',
			text: 'Next',
            baseCls: 'x-btn-plain',
			cls: 'button-blue'
		}]
	}]
});
