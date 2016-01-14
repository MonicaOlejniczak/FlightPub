Ext.define('FB.view.booking.BookingController', {
	extend: 'FB.view.ViewController',
	alias: 'controller.Booking',
	config: {
		content: this.getView().down('#content')
	},
	init: function () {
		var view = this.getView();
		// add the event listeners to the view
		this.addEvents(view);
	},
	/**
	 * This method adds event handlers to the form
	 *
	 * @param view the view to add the events to
	 */
	addEvents: function (view) {
		view.down('#cancel').on('click', this.cancel, this);
		view.down('#back').on('click', this.back, this);
		view.down('#next').on('click', this.next, this);
	},
	/**
	 * Cancels the booking
	 */
	cancel: function () {
	},
	/**
	 * Goes back one page in the booking
	 */
	back: function () {
	},
	/**
	 * Goes forward one page in the booking
	 */
	next: function () {
	}

});
