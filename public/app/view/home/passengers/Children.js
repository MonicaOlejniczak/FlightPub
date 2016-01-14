/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.home.passengers.Children', {
	extend: 'Ext.container.Container',
    xtype: 'Children',
    itemId: 'childPassengers',
    requires: [
        'FB.view.home.passengers.Passengers'
    ],
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [{
        xtype: 'Passenger',
        itemId: 'children',
        store: 'Child',
        name: 'children',
        value: 0
    },  {
        xtype: 'component',
        html: '2 - 11 years'
    }],
    margin: '0 5px 0 0'
});
