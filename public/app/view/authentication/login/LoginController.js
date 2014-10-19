/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.authentication.login.LoginController', {
	extend: 'FB.view.PageController',
    require: 'FB.CryptoJS_v3.1.2',
	alias: 'controller.Login',
	constructor: function () {
		this.setConfig({
			default: false,
			heading: 'Login'
		});
	},
	init: function () {
		// todo why is control not working????
		var form = this.getView();
		form.down('#cancel').on('click', this.cancel, this);
		form.down('#login').on('click', this.login, this);
	},
	/**
	 * The event fired when cancelling the login process
	 */
	cancel: function () {
		Ext.create('Ext.window.MessageBox').show ({
			title: 'Cancel',
			msg: 'Do you wish to cancel login?',
			buttonText: {
				yes: 'Cancel',
				no: 'Resume login'
			},
			fn: function (buttonId, text, opt) {
				if (buttonId == "yes") {
					this.getView().fireEvent('redirect');
				}
			}, scope: this
		});
	},
	/**
	 * The event fired when processing a login
	 */
	login: function () {
		// client side validation
		var form = this.getView();
		if (form.isValid()) {

            // hash password before sending form
            // SHA-512 is used for it is well tested.
            // SHA-3 (Keccak) is also available.  CryptoJS.SHA3("Message");
            password = form.down().getValue("#password").getValue();
            form.down().setValue(CryptoJS.SHA512(password));

			// server side validation
			var request = Ext.Ajax.request({
				url: '/login/process',
				method: 'POST',
				params: form.getValues(),
				submitEmptyText: false,
				success: function (response) {
					// server side validation was successful and the user is redirected to the home page
                    Ext.Msg.alert('Success', 'You have successfully logged in.');
					form.fireEvent('login');
					console.log(response.responseText);
				},
				failure: function (response) {
					Ext.Msg.alert('Error', response.responseText);
				}, scope: this
			});
		} else {
			Ext.Msg.alert('Error', 'Form fields may not be submitted with invalid values.');
		}

        console.log('The request was: ',request)
	}

});
