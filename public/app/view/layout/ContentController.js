Ext.define('FB.view.layout.ContentController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Content',
	requires: [
		'Ext.container.Container',
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
	 * @param xtype the page being added to the view
	 */
	addPage: function (xtype) {
		this.getContent().add({
			xtype: xtype
		});
	},
	/**
	 * This method removes a particular page from the content by its item identification
	 *
	 * @param page the itemId of the page to be removed
	 */
	removePage: function (page) {
		var content = this.getContent();
		// check if the child exists before removing
		if (content.getComponent(page)) {
			content.remove(page);
		}
	},
	/**
	 * This method removes all the non-default pages from the content
	 */
	removeAllPages: function () {
		var content = this.getContent();
		var pages = [];
		Ext.each(content.items.items, function (page) {
			// check it is not a default page and then add the page to the array
			if (!page.controller.getDefault()) {
				pages.push(page);
			}
		}, this);
		// remove the pages from the content
		Ext.each(pages, function (page) {
			this.removePage(page)
		}, this);
	},
	/**
	 * This method sets which page is currently being displayed
	 *
	 * @param page the itemId of the page to be displayed
	 */
	setPage: function (page) {
		var content = this.getContent().getLayout();
		content.setActiveItem(page);
		this.updateHeading(content.getActiveItem().controller.getHeading());
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
