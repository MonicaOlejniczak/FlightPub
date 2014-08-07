/**
 * @author Brendan Annable
 */
Ext.define('FB.view.account.booking.List', {
    extend: 'Ext.container.Container',
    requires: [
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
        layout: {
            type: 'accordion',
            animate: true
        }/*,
        items: [{
            title: 'Booking 1',
            html: 'bookingz 1111'
        }, {
            title: 'Booking 2',
            html: 'bookingz 2222'
        }]*/
    }]
});

