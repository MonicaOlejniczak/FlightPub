/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.layout.content.ContentController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Content',
    requires: [
        'FB.view.general.About',
        'FB.view.home.Home'
    ],
    pages: null,
    config: {
        content: null,
        heading: null
    },
    init: function () {
        var view = this.getView();
        var content = view.down('#content');
        this.setContent(content);
        this.setHeading(view.down('#heading'));
        this.pages = {};
        // add the home and about page
        this.addPage(Ext.create('FB.view.home.Home'));
        this.addPage(Ext.create('FB.view.general.About'));
    },
    /**
     * This method adds a page to the content
     *
     * @param component the component being added to the view
     */
    addPage: function (component) {
        this.getContent().add(component);
        this.pages[Ext.getClassName(component)] = component;
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
            delete this.pages[Ext.getClassName(page)];
        }
    },
    /**
     * This method removes all the non-default pages from the content
     */
    removeAllPages: function () {
        var content = this.getContent();
        Ext.each(content.items.items, function (page) {
            //this.removePage(page);
            //delete this.pages[Ext.getClassName(page)];
        }, this);
    },
    /**
     * This method sets which page is currently being displayed
     *
     * @param parameters the parameters for the page to be displayed
     */
    setPage: function (parameters) {
        var content = this.getContent().getLayout();
        if (parameters === undefined) {
            content.setActiveItem(this.pages['FB.view.home.Home']);
        } else {
            var className = parameters.className;
            if (className) {
                // get the component by its class name
                var component = this.pages[className];
                // check if the component exists
                if (component === undefined) {
                    // create the component since it does not exist
                    component = Ext.create(className, parameters);
                }
                // add the page to the content and set the page to be displayed
                this.addPage(component);
                content.setActiveItem(component);
            } else {
                content.setActiveItem(this.pages['FB.view.home.Home']);
            }
        }
        this.getView().fireEvent('update-ad');
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
