Ext.define('FB.views.AccountSettings', {
	extend: 'Ext.container.Container',
	initComponent: function () {
		var blah = 200;
		Ext.apply(this, {
			layout: 'fit',
			height: 200,
			items: [{
				xtype: 'form',
				title: 'testing',
				height: 100,
				width: 400,
				layout: {
					type: 'anchor'
				},
				defaults: {
					anchor: '100%'
				},
				defaultType: 'textfield',
				items: [{
					itemId: 'fuckyou',
					fieldLabel: 'First Name',
					labelWidth: blah
				}]
			}]
		});
		return this.callParent(arguments);
	}
});
