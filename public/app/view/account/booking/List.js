/**
 * @author Brendan Annable
 */
Ext.define('FB.view.account.booking.List', {
    extend: 'Ext.container.Container',
    requires: [
        'Ext.layout.container.Accordion',
        'FB.view.account.booking.ListController'
    ],
    xtype: 'BookingList',
    controller: 'BookingListController',
    itemId: 'BookingList',
    cls: 'smallerContent',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [{
        xtype: 'header',
        cls: 'heading',
        html: 'Bookings'
    }, {
        itemId: 'list',
        layout: {
            type: 'accordion',
            animate: true
        }
    }]
});

