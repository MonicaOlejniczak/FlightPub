Ext.define('FB.sorters.StopOver', {
	extend: 'Ext.util.Sorter',
	root: 'data',
	property: 'stopOver',
	direction: 'ASC',
	transform: function (stopOver) {
		return stopOver == null ? 0 : 1;
	}
});
