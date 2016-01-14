Ext.define('FB.store.AccountType', {
	extend: 'Ext.data.Store',
	fields: [
		'type'
	],
	data : [{
		'type': 'Standard User'
	},  {
		'type': 'Travel Agent'
	},  {
		'type': 'Site Manager'
	}]
});