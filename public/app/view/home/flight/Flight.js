/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.home.flight.Flight', {
	extend: 'Ext.form.field.ComboBox',
	model: 'FB.models.Airport',
	store: 'Airport',
	queryMode: 'remote',
	displayField: 'name',
	valueField: 'name',
	emptyText: 'none',
	allowBlank: false
});
