Ext.define('FB.view.SeatSelection', {
	extend: 'Ext.form.Panel',
	requires: [
		'FB.view.SeatSelectionController'
	],
	xtype: 'SeatSelection',
	controller: 'SeatSelection',
	initComponent: function () {
		Ext.apply(this, {

		});
		return this.callParent(arguments);
	}
});
