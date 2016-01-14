/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.administration.add.AddPanel', {
    extend: 'Ext.form.Panel',
    xtype: 'AddPanel',
    requires: [
        'FB.view.home.flight.Source',
        'FB.view.home.flight.Destination',
        'FB.view.home.date.Departing',
        'FB.view.home.date.Returning',
        'FB.view.administration.add.AddPanelController'
    ],
    controller: 'AddPanel',
    itemId: 'addPanel',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    standardSubmit: true,
    baseCls: 'x-plain',
    defaults: {
        flex: 1,
        labelWidth: 200,
        allowBlank: false,
        msgTarget: 'under'
    },
    items: [{
        xtype: 'header',
        cls: 'heading',
        html: 'Add Route',
        margin: '0 0 0 205px'
    },  {
        xtype: 'combo',
        itemId: 'airline',
        fieldLabel: 'Airline',
        store: 'Airline',
        queryMode: 'local',
        valueField:'name',
        displayField:'name',
        autoSelect: false,
        selectOnFocus: true,
        typeAhead: true,
        minChars: 1,
        emptyText: 'none'
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
        xtype: 'combo',
        itemId: 'plane',
        fieldLabel: 'Plane',
        store: 'Plane',
        queryMode: 'local',
        valueField: 'details',
        displayField: 'details',
        autoSelect: false,
        selectOnFocus: true,
        typeAhead: true,
        minChars: 1,
        emptyText: 'none'
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
            itemId: 'add',
            text: 'Add Flight',
            cls: 'button-green'
        }]
    }]
});
