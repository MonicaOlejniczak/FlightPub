Ext.define('FB.view.HeaderController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Header',
	requires: [
		'Ext.container.Container',
		'Ext.form.Panel'
	],
	control: {
		'Header': {
			afterrender: function () {
				var contents = [];
				// push the default links and update the display
				contents.push(this.getLink('/', 'Home'));
				contents.push(this.getLink('/about', 'About'));
				contents.push(this.getLink('/contact', 'Contact'));
				this.updateNavigation(contents);
				this.getLinks(contents);
			}
		}
	},
	/**
	 * Retrieves the remaining links through ajax requests
	 *
	 * @param contents the current html link array
	 */
	getLinks: function (contents) {
		Ext.Ajax.request({
			url: '/authentication/is-logged-in',
			success: function (response) {
				// the user is logged in
				contents.push(this.getLink('/restricted', 'Account'));
				contents.push(this.getLink('/logout', 'Logout'));
				this.updateNavigation(contents);
				// todo add bookings
			},
			failure: function (response) {
				// the user is not logged in
				contents.push(this.getLink('/register', 'Register'));
				contents.push(this.getLink('/login', 'Login'));
				this.updateNavigation(contents);
			}, scope: this
		}, this);
	},
	/**
	 * Retrieves the navigation link for the header
	 *
	 * @param path the current website URL
	 * @param name the name used for the navigation link
	 * @returns {String|*} the navigation link
	 */
	getLink: function (path, name) {
		var active = window.location.pathname === path ? 'active' : '';
		return Ext.String.format('<a href="{0}" class="{1}">{2}</a>', path, active, name);
	},
	/**
	 * Updates the navigation links using an array that contains the html
	 *
	 * @param contents the links array
	 */
	updateNavigation: function (contents) {
		this.getView().down('#navigationLinks').update(contents.join(''));
	}
	/*
	 @@if(authentication.AuthenticatedUser.isLoggedIn) {
	 <!--@@if(User.find.where().eq("email", new authentication.AuthenticatedUser().getUsername(Http.Context.current())).findUnique().userType.equals("travel")) {
	 <a href="/booking-requests" class="@activeLink("/booking-requests")">Booking Requests</a>
	 } else {
	 <a href="/bookings" class="@activeLink("/bookings")">Bookings</a>
	 }-->
	 */
});
