/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.home.passengers.Infants', {
    extend: 'Ext.container.Container',
    xtype: 'Infants',
    itemId: 'infants',
    requires: [
        'FB.view.home.passengers.Passengers'
    ],
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [{
        xtype: 'Passenger',
        store: 'Infant',
        name: 'infants',
        value: 0
    },  {
        xtype: 'component',
        html: '0 - 23 months'
    }]

});
