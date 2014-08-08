/**
 * @author Brendan Annable
 */
Ext.define('FB.store.Booking', {
    extend: 'Ext.data.Store',
    model: 'FB.model.Booking',
    proxy: {
        url: 'data/bookings',
        type: 'ajax',
        reader: {
            type: 'json'
        }
    }
});
