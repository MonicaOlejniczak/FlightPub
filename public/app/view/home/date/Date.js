/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.home.date.Date', {
	extend: 'Ext.form.field.Date',
	minDate: new Date(),
	submitFormat: 'U000',
	allowBlank: false
});
