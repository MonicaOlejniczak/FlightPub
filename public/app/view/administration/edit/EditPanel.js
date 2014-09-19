/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.administration.edit.EditPanel', {
    extend: 'Ext.container.Container',
    xtype: 'EditPanel',
    requires: [
        'FB.view.home.flight.Source',
        'FB.view.home.flight.Destination',
        'FB.view.home.date.Departing',
        'FB.view.home.date.Returning',
        'FB.view.administration.edit.EditPanelController'
    ],
    controller: 'EditPanel',
    config: {
        flight: null
    },
    itemId: 'editPanel',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    defaults: {
        flex: 1,
        labelWidth: 200
    },
    items: [{
        xtype: 'header',
        cls: 'heading',
        html: 'Edit',
        margin: '0 0 0 205px'
    },  {
        xtype: 'combo',
        itemId: 'airline',
        fieldLabel: 'Airline',
        store: 'Airline',
        queryMode: 'remote',
        valueField: 'name',
        displayField: 'name'
    },  {
        xtype: 'textfield',
        itemId: 'flightNumber',
        fieldLabel: 'Flight Number'
    },  {
        xtype: 'Source'
    },  {
        xtype: 'Destination'
    },  {
        xtype: 'Departing',
        itemId: 'departureTime',
        fieldLabel: 'Departure Time'
    },  {
        xtype: 'Returning',
        itemId: 'arrivalTime',
        fieldLabel: 'Arrival Time'
    },  {
        xtype: 'numberfield',
        itemId: 'price',
        fieldLabel: 'Price',
        minValue: 0,
        maxValue: 10000
    },  {
        xtype: 'container',
        layout: {
            type: 'hbox',
            pack: 'end'
        },
        items: [{
            xtype: 'button',
            itemId: 'back',
            text: 'Back',
            cls: 'button-blue',
            margin: '0 5px 0 0'
        },  {
            xtype: 'button',
            itemId: 'edit',
            text: 'Edit Flight',
            cls: 'button-green'
        }]
    }]
});
