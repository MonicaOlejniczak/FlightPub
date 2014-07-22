Ext.define('FB.view.layout.NavigationController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Navigation',
	control: {
		'#home': {
			click: function () {
				this.displayPage({
					page: FB.controller.Pages.Page.HOME
				});
			}
		},
		'#about': {
			click: function () {
				this.displayPage({
					page: FB.controller.Pages.Page.ABOUT
				});
			}
		},
		'#contact': {
			click: function () {
				this.displayPage({
					page: FB.controller.Pages.Page.CONTACT
				});
			}
		},
		'#register': {
			click: function () {
				this.addPage(FB.controller.Pages.Page.REGISTER);
			}
		},
		'#login': {
			click: function () {
				this.addPage(FB.controller.Pages.Page.LOGIN);
			}
		}
	},
	init: function () {
		this.updateNavigation();
	},
	/**
	 * Adds and displays the specified page
	 *
	 * @param page the page being added then displayed
	 */
	addPage: function (page) {
		var content = FB.app.content;
		content.addPage(page);
		this.displayPage({
			content: content,
			page: page
		});
	},
	/**
	 * This displays the specified page
	 */
	displayPage: function (parameters) {
		var content = parameters.content || FB.app.content;
		var page = parameters.page || FB.controller.Pages.Page.HOME;
		content.setPage(page);
	},
	/**
	 * Updates the navigation
	 */
	updateNavigation: function () {
		debugger;
		var content = FB.app.content;
		var navigation = this.getView();
		var controller = FB.controller.Pages;
		this.removeLinks(content, navigation);
		this.addLinks(navigation, controller);
	},
	/**
	 * Removes any non-default page links
	 *
	 * @param content the controller that holds the content
	 * @param navigation the container where the links are being added to
	 */
	removeLinks: function (content, navigation) {
		// check if the content has loaded
		if (content !== undefined) {
			// get the actual content
			content = content.getContent();
			// remove the non-default links
			Ext.each(content.items.keys, function (key) {
				Ext.Object.eachValue(FB.controller.Pages.DefaultPage, function (value) {
					// check if the link should be removed
					if (value.linkItemId !== key) {
						// an anonymous function that checks if the link exists in the navigation and then removes it
						(function (itemId) {
							if (navigation.getComponent(itemId)) {
								navigation.remove(itemId);
							}
						}(key));
					}
				}, this);
			}, this);
		}
	},
	/**
	 * Adds the extra links to the navigation through a ajax request
	 *
	 * @param navigation the container where the links are being added to
	 * @param controller the pages controller
	 */
	addLinks: function (navigation, controller) {
		var page;
		Ext.Ajax.request({
			url: '/authentication/is-logged-in',
			success: function (response) {
				// the user is logged in
				page = controller.Page.ACCOUNT;
				navigation.add(Ext.create('Ext.button.Button', {
					itemId: controller.getLinkItemId(page),
					text: controller.getLinkText(page),
					baseCls: 'x-btn-plain'
				}));
				page = controller.Page.LOGOUT;
				navigation.add(Ext.create('Ext.button.Button', {
					itemId: controller.getLinkItemId(page),
					text: controller.getLinkText(page),
					baseCls: 'x-btn-plain'
				}));
				// todo add bookings
			},
			failure: function (response) {
				// the user is not logged in
				page = controller.Page.REGISTER;
				navigation.add(Ext.create('Ext.button.Button', {
					itemId: controller.getLinkItemId(page),
					text: controller.getLinkText(page),
					baseCls: 'x-btn-plain'
				}));
				page = controller.Page.LOGIN;
				navigation.add(Ext.create('Ext.button.Button', {
					itemId: controller.getLinkItemId(page),
					text: controller.getLinkText(page),
					baseCls: 'x-btn-plain'
				}));
			}, scope: this
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