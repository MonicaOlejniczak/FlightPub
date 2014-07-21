Ext.define('FB.view.layout.ContentController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Content',
	requires: [
		'Ext.container.Container',
		'FB.controller.Pages',
		'FB.view.authentication.Login',
		'FB.view.authentication.Register'
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
	 * This method adds a page to the content
	 *
	 * @param page the page being added to the view
	 */
	addPage: function (page) {
		var xtype = FB.controller.Pages.getXtype(page);
		this.getContent().add({
			xtype: xtype
		});
	},
	/**
	 * This method removes a particular page from the content by its item identification
	 *
	 * @param page the page to be removed
	 */
	removePage: function (page) {
		var content = this.getContent();
		var itemId = FB.controller.Pages.getItemId(page);
		// check if the child exists before removing
		if (content.getComponent(itemId)) {
			content.remove(itemId);
		}
	},
	/**
	 * This method removes all the non-default pages from the content
	 */
	removeAllPages: function () {
		// todo fix
		var content = this.getContent();
		Ext.each(content.items.keys, function (key) {
			Ext.Object.eachValue(FB.controller.Pages.DefaultPage, function (value) {
				// check if the page should be removed
				if (value.itemId !== key) {
					this.removePage(key);
				}
			}, this);
		}, this);
	},
	/**
	 * This method sets which page is currently being displayed
	 *
	 * @param page the page to be displayed
	 */
	setPage: function (page) {
		var controller = FB.controller.Pages;
		this.getContent().setActiveItem(controller.getItemId(page));
		this.updateHeading(controller.getHeading(page));
	},
	/**
	 * This method updates the text in the h1
	 *
	 * @param text the text to update in the h1
	 */
	updateHeading: function (text) {
		this.getHeading().update({
			text: text
		});
	}
});
