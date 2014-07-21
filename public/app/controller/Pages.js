Ext.define('FB.controller.Pages', {
	extend: 'Ext.app.Controller',
	statics: {
		Page: {
			ABOUT: {
				xtype: 'About',
				itemId: 'About',
				linkItemId: 'about',
				linkText: 'About',
				heading: 'About'
			},
			ACCOUNT: {
				xtype: 'AccountSettings',
				itemId: 'AccountSettings',
				linkItemId: 'account',
				linkText: 'Account',
				heading: 'Account Settings'
			},
			CONTACT: {
				xtype: 'Contact',
				itemId: 'Contact',
				linkItemId: 'contact',
				linkText: 'Contact',
				heading: 'Contact'
			},
			HOME: {
				xtype: 'Home',
				itemId: 'Home',
				linkItemId: 'home',
				linkText: 'Home',
				heading: 'Home'
			},
			LOGIN: {
				xtype: 'Login',
				itemId: 'Login',
				linkItemId: 'login',
				linkText: 'Login',
				heading: 'Login'
			},
			LOGOUT: {
				linkItemId: 'logout',
				linkText: 'Logout'
			},
			REGISTER: {
				xtype: 'Register',
				itemId: 'Register',
				linkItemId: 'register',
				linkText: 'Register',
				heading: 'Register'
			}
		},
		DefaultPage: {
			ABOUT: {
				itemId: 'About',
				link: 'about'
			},
			CONTACT: {
				itemId: 'Contact',
				link: 'contact'
			},
			HOME: {
				itemId: 'Home',
				link: 'home'
			}
		},
		getXtype: function (page) {
			return page.xtype;
		},
		getItemId: function (page) {
			return page.itemId;
		},
		getLinkItemId: function (page) {
			return page.linkItemId;
		},
		getLinkText: function (page) {
			return page.linkText;
		},
		getHeading: function (page) {
			return page.heading;
		}
	}
});
