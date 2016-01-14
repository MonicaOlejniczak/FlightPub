Ext.define('FB.Application', {
	extend: 'Ext.app.Application',
	name: 'FB',
	paths: {
		'FB': '/assets/app'
	},
	requires: [
		'FB.view.Viewport'
	],
	/**
	 * This method is called when the application boots
	 */
	init: function () {
		window._FB = this;
	},
	/**
	 * This method is called when the page has loaded
	 */
	launch: function () {
		Ext.create('FB.view.Viewport');
	},
	/**
	 * This method is called when the viewport has rendered
	 */
	onLaunch: function () {
		// create application wide variables for the viewport and content
		this.viewport = Ext.ComponentQuery.query('viewport')[0];
		this.content = this.viewport.down('[region=center]');
	}
});


/*// horrible things ahead
Ext.syncRequire('Ext.data.Request');
Ext.syncRequire('Ext.data.Store');


/*loadStores([
 'FB.store.Airport'
 ]);

 function loadStores (stores) {
 if (!Ext.isArray(stores)) {
 stores = [stores];
 }
 stores.forEach(function (store) {
 if (Ext.getStore(store) === undefined) {
 var storeObj = Ext.create(store);
 if (storeObj.storeId === undefined) {
 var cls = storeObj.$className;
 var namespaced = cls.indexOf('.') !== -1;
 storeObj.storeId = namespaced ? cls.substr(cls.lastIndexOf('.') + 1) : cls;
 Ext.StoreManager.register(storeObj);
 }
 }
 }, this);
 }*/