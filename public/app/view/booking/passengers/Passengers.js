/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.booking.passengers.Passengers', {
	extend: 'Ext.form.Panel',
	requires: [
		'Ext.form.Panel',
		'Ext.Component',
		'FB.view.booking.passengers.PassengersController'
	],
	xtype: 'Passengers',
	controller: 'Passengers',
	standardSubmit: true,
	baseCls: 'x-plain',
	config: {
		passengers: null
	},
	items: [{
		xtype: 'component',
		html: 'For each passenger, please enter their first and last name, then select what class of ticket and ' +
                'whether you wish to include only carry-on luggage with your booking, or if you wish to also ' +
                'include checked luggage.',
		margin: '0 0 10px 0'
	},  {
        xtype: 'container',
        itemId: 'passengers'
    }]
});
