/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.ViewportController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Viewport',
	control: {
		'Navigation': {
			redirect: function (parameters) {
				// check if we are currently on a booking and pass in the redirect function as a callback
				this.checkOnBooking(Ext.Function.pass(this.redirect, [parameters], this));
			},
			logout: function () {
				// check if we are currently on a booking and pass in the logout process function as a callback
				this.checkOnBooking(this.process);
			}
		},
        'Home': {
            redirect: 'redirect'
        },
		'Register': {
			register: 'process'
		},
		'Login': {
			login: 'process'
		},
		'Booking': {
			removebooking: 'removeBooking'
		},
        'Payment': {
            redirect: 'redirect'
        }
	},
	/**
	 * This method redirects the current page to a new one
	 *
	 * @param parameters the page to redirect to and if it it to be added to the content
	 */
	redirect: function (parameters) {
		parameters = parameters || {};
		var content = this.getView().down('Content').controller;
		if (parameters.add === true) {
			content.addPage(parameters);
		}
		content.setPage(parameters);
	},
	/**
	 * The event fired when a user has registered, logged in or logged out
	 */
	process: function () {
		var navigation = this.getView().down('Navigation').controller;
		var content = this.getView().down('Content').controller;
		content.removeAllPages();
		navigation.updateNavigation();
		this.redirect();
	},
	/**
	 * Checks if the page the user is viewing belongs to a booking and asks if they wish to cancel their current booking.
	 * If this is true, then the booking will be removed and they will continue as specified with the callback function.
	 *
	 * @param callback the navigation redirect callback
	 */
	checkOnBooking: function (callback) {
		// get the active page and check if it is a booking
		var activePage = this.getView().down('Content').controller.getContent().getLayout().getActiveItem();
		if (activePage.isXType('Booking')) {
			var booking = activePage.controller;
			booking.cancel(activePage, callback);
		} else {
			callback.call(this); // not on a booking, execute callback
		}
	},
	/**
	 * Removes the active booking when the user confirms to cancel it
	 *
	 * @param booking the booking to remove
	 * @param callback the redirection to a page
	 */
	removeBooking: function (booking, callback) {
		callback();
		this.getView().down('Content').controller.removePage(booking);
	}
});
