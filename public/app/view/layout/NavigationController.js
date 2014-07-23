Ext.define('FB.view.layout.NavigationController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Navigation',
	requires: [
		'FB.controller.AuthenticationController'
	],
	control: {
		'Navigation #home': {
			click: function () {
				FB.app.content.setPage('Home');
			}
		},
		'Navigation #about': {
			click: function () {
				FB.app.content.setPage('About');
			}
		},
		'Navigation #contact': {
			click: function () {
				FB.app.content.setPage('Contact');
			}
		},
		'Navigation #register': {
			click: function () {
				var content = FB.app.content;
				var page = 'Register';
				content.addPage(page);
				content.setPage(page);
			}
		},
		'Navigation #login': {
			click: function () {
				var content = FB.app.content;
				var page = 'Login';
				content.addPage(page);
				content.setPage(page);
			}
		},
		'Navigation #account': {
			click: function () {
				var content = FB.app.content;
				var page = 'AccountSettings';
				content.addPage(page);
				content.setPage(page);
			}
		},
		'Navigation #logout': {
			click: function () {
				Ext.create('controller.Authentication').logout();
			}
		}
	},
	init: function () {
		this.addLinks(this.getView());
	},
	/**
	 * Updates the navigation
	 */
	updateNavigation: function () {
		var navigation = this.getView();
		this.removeLinks(navigation);
		this.addLinks(navigation);
	},
	/**
	 * Removes all the non-default navigation links
	 *
	 * @param navigation the container where the links are being added to
	 */
	removeLinks: function (navigation) {
		var links = [];
		Ext.each(navigation.items.items, function (link) {
			// check if the link is not default and add it to the array
			if (!link.getDefault()) {
				links.push(link);
			}
		}, this);
		// remove the navigation items from the navigation
		Ext.each(links, function (link) {
			navigation.remove(link);
		});
	},
	/**
	 * Adds the extra navigation links to the navigation through an ajax request
	 *
	 * @param navigation the container where the links are being added to
	 */
	addLinks: function (navigation) {
		Ext.Ajax.request({
			url: '/authentication/is-logged-in',
			success: function (response) {
				// the user is logged in
				navigation.add(Ext.create('widget.NavigationLink', {
					itemId: 'accountSettings',
					text: 'Account'
				}));
				navigation.add(Ext.create('widget.NavigationLink', {
					itemId: 'logout',
					text: 'Logout'
				}));
				console.log("The user is logged in.");
				// todo add bookings
			},
			failure: function (response) {
				// the user is not logged in
				navigation.add(Ext.create('widget.NavigationLink', {
					itemId: 'register',
					text: 'Register'
				}));
				navigation.add(Ext.create('widget.NavigationLink', {
					itemId: 'login',
					text: 'Login'
				}));
				console.log("The user is logged out.");
			}
		}, this);
	}
});

	/*
	 @@if(authentication.AuthenticatedUser.isLoggedIn) {
	 <!--@@if(User.find.where().eq("email", new authentication.AuthenticatedUser().getUsername(Http.Context.current())).findUnique().userType.equals("travel")) {
	 <a href="/booking-requests" class="@activeLink("/booking-requests")">Booking Requests</a>
	 } else {
	 <a href="/bookings" class="@activeLink("/bookings")">Bookings</a>
	 }-->
	 */