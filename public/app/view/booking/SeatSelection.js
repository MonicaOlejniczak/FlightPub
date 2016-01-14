Ext.define('FB.view.booking.SeatSelection', {
	extend: 'Ext.form.Panel',
	requires: [
		'FB.view.booking.SeatSelectionController'
	],
	xtype: 'SeatSelection',
	controller: 'SeatSelection',
	initComponent: function () {
		Ext.apply(this, {

		});
		return this.callParent(arguments);
	}
});
