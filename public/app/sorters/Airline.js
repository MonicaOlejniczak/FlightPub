Ext.define('FB.sorters.Airline', {
	extend: 'Ext.util.Sorter',
	root: 'data',
	property: 'airline',
	direction: 'ASC',
	transform: function (airline) {
		return airline.name;
	}
});
