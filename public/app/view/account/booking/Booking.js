/**
 * @author Brendan Annable
 */
Ext.define('FB.view.account.booking.Booking', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.Booking',
    controller: 'Booking',
    requires: [
        'FB.view.account.booking.BookingController'
    ],
    config: {
        booking: null
    },
    tpl: '{id}'
});

