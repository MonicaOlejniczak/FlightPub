/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.home.flight.Flight', {
	extend: 'Ext.form.field.ComboBox',
	model: 'FB.models.Airport',
	store: 'Airport',
	queryMode: 'local',
    valueField:'name',
    displayField:'name',
    autoSelect: false,
    selectOnFocus: true,
    typeAhead: true,
    minChars: 1,
	emptyText: 'none',
	allowBlank: false
});
