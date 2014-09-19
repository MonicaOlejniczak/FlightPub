/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.layout.header.navigation.NavigationController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Navigation',
	control: {
		'#home': {
            click: function () {
                this.getView().fireEvent('redirect');
            }
        },
		'#about': {
			click: function () {
				this.getView().fireEvent('redirect', {
                    className: 'FB.view.general.About'
				});
			}
		},
		'#register': {
			click: function () {
				this.getView().fireEvent('redirect', {
                    className: 'FB.view.authentication.register.Register'
				});
			}
		},
		'#login': {
			click: function () {
				this.getView().fireEvent('redirect', {
                    className: 'FB.view.authentication.login.Login'
				});
			}
		},
        '#administration': {
            click: function () {
                this.getView().fireEvent('redirect', {
                    className: 'FB.view.administration.Administration'
                });
            }
        },
		'#account': {
			click: function () {
				// todo server side check permissions
				this.getView().fireEvent('redirect', {
                    className: 'FB.view.account.settings.Settings'
                });
            }
        },
		'#bookings': {
			click: function () {
                this.getView().fireEvent('redirect', {
                    className: 'FB.view.account.booking.List'
				});
			}
		},
		'#logout': {
			click: function () {
				Ext.Ajax.request({
					url: '/logout',
					success: function (response) {
						// the user has been logged out successfully
						this.getView().fireEvent('logout');
						Ext.Msg.alert('Success', 'You have logged out successfully.');
					},
					failure: function (response) {
						// an error occurred while logging the user out
						Ext.Msg.alert('Error', 'An error occurred upon logout and your attempt was unsuccessful.');
					}, scope: this
				}, this);
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
			url: '/authentication/account-type',
			success: function (response) {
				var account = Ext.decode(response.responseText).account;
				switch (account) {
					case 'SITE_MANAGER':
						navigation.add(Ext.widget('NavigationLink', {
							itemId: 'administration',
							text: 'Administration Panel'
						}));
						this.addAccountLinks(navigation);
						break;
					case 'TRAVEL_AGENT':
						navigation.add(Ext.widget('NavigationLink', {
							itemId: 'bookingRequests',
							text: 'Booking Requests'
						}));
						this.addAccountLinks(navigation);
						break;
					case 'STANDARD_USER':
						navigation.add(Ext.widget('NavigationLink', {
							itemId: 'bookings',
							text: 'Bookings'
						}));
						this.addAccountLinks(navigation);
						break;
					case 'GUEST':
						this.addDefaultLinks(navigation);
						break;
				}
			},
			failure: function (response) {
				this.addDefaultLinks(navigation);
			}, scope: this
		}, this);
	},
	/**
	 * This method adds the account links for a user that is logged in
	 *
	 * @param navigation the navigation to add the links to
	 */
	addAccountLinks: function (navigation) {
		navigation.add(Ext.widget('NavigationLink', {
			itemId: 'account',
			text: 'Account'
		}));
		navigation.add(Ext.widget('NavigationLink', {
			itemId: 'logout',
			text: 'Logout'
		}));
		console.log("The user is logged in.");
	},
	/**
	 * This method adds the default links for a user that is not logged in
	 *
	 * @param navigation the navigation to add the links to
	 */
	addDefaultLinks: function (navigation) {
		navigation.add(Ext.widget('NavigationLink', {
			itemId: 'register',
			text: 'Register'
		}));
		navigation.add(Ext.widget('NavigationLink', {
			itemId: 'login',
			text: 'Login'
		}));
		console.log("The user is not logged in.");
	}
});
