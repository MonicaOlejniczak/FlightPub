/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.home.passengers.Passengers', {
	extend: 'Ext.form.field.ComboBox',
	xtype: 'Passenger',
    queryMode: 'local',
	displayField: 'name',
	valueField: 'value',
	editable: false,
	cls: 'passengers'
});
