/**
 * @author Brendan Annable
 */
Ext.define('FB.view.account.booking.ListController', {
    extend: 'FB.view.PageController',
    alias: 'controller.BookingListController',
    constructor: function () {
        this.setConfig({
            default: false,
            heading: 'Bookings'
        });
    }
});
