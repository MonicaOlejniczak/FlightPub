/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.account.details.personal.PhoneNumber', {
	extend: 'Ext.form.field.Number',
	xtype: 'PhoneNumber',
	itemId: 'phoneNumber',
	name: 'phoneNumber',
	fieldLabel: 'Phone number',
	emptyText: 'please enter your phone number',
	minValue: 0,
    minLength: 7,
    maxLength: 15
});
