/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.home.passengers.Adults', {
    extend: 'Ext.container.Container',
    xtype: 'Adults',
    itemId: 'adults',
    requires: [
        'FB.view.home.passengers.Passengers'
    ],
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [{
        xtype: 'Passenger',
        store: 'Adult',
        name: 'adults',
        fieldLabel: 'Passengers',
        value: 1
    }],
    margin: '0 5px 0 0'
});

