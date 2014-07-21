Ext.define('FB.view.ContentController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Content',
	requires: [
		'Ext.container.Container'
	],
	config: {
		content: null,
		heading: null
	},
	init: function () {
		var view = this.getView();
		this.setContent(view.down('#content'));
		this.setHeading(view.down('#heading'));
	},
	/**
	 * This method removes all the pages from the content
	 */
	removeAllPages: function () {
		this.getContent().removeAll();
	},
	/**
	 * This method sets what page is being displayed in the content
	 *
	 * @param xtype the type of the page to add to the view
	 * @param text the text to update in the h1
	 */
	setPage: function (xtype, text) {
		Ext.suspendLayouts();
		this.getContent().add({
			xtype: xtype
		});
		this.getHeading().update({
			text: text
		});
		Ext.resumeLayouts(true);
	}
});
