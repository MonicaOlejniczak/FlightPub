Ext.define('FB.view.PageController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Page',
	config: {
		default: false,
		heading: 'FlightPub'
	},
	/**
	 * A method that sets the initial configuration using the parameters or its defaults
	 *
	 * @param parameters the object containing the config parameters
	 */
	setConfig: function (parameters) {
		parameters = parameters || {};
		this.setDefault(parameters.default || this.getDefault());
		this.setHeading(parameters.heading || this.getHeading());
	},
	/**
	 * This method redirects the current page to a new one
	 *
	 * @param page the page to redirect to
	 */
	redirect: function (page) {
		FB.app.content.setPage(page);
	}
});
