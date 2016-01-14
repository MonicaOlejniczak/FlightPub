/**
 * @author Brendan Annable
 */
Ext.define('FB.model.Airport', {
    extend: 'Ext.data.Model',
    fields: [
        'name',
        'code',
	    'latitude',
	    'longitude'
    ]
});