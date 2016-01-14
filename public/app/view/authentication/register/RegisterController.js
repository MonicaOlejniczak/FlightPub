/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.authentication.register.RegisterController', {
	extend: 'FB.view.PageController',
	alias: 'controller.Register',
	constructor: function () {
		this.setConfig({
			default: false,
			heading: 'Register'
		});
	},
	init: function () {
		var form = this.getView();
		// add client side validation and event handling
		this.addValidation(form);
		this.addEvents(form);
	},
	/**
	 * Adds the client side validation to the form
	 *
	 *  @param form the form to apply the validation to
	 */
	addValidation: function (form) {
		Ext.apply(form.down('#password'), {
			vtype: 'confirmedPassword',
			vtypeText: 'You must confirm your password.'
		});
		Ext.apply(form.down('#confirmPassword'), {
			vtype: 'equalPassword',
			vtypeText: 'Your new password and confirmed password do not match.'
		});
		Ext.apply(Ext.form.field.VTypes, {
			confirmedPassword: function() {
				return form.down('#confirmPassword').getValue() !== "";
			}
		}, this);
		Ext.apply(Ext.form.field.VTypes, {
			equalPassword: function() {
				return form.down('#password').getValue() == form.down('#confirmPassword').getValue();
			}
		});
	},
	/**
	 * Adds the click events to the form
	 *
	 * @param form the form to apply events to
	 */
	addEvents: function (form) {
		form.down('#cancel').on('click', this.cancel, this);
		form.down('#register').on('click', this.register, this);
	},
	/**
	 * The event fired when cancelling the registration process
	 */
	cancel: function () {
		Ext.create('Ext.window.MessageBox').show({
			title: 'Cancel',
			msg: 'Do you wish to cancel registration?',
			buttonText: {
				yes: 'Cancel',
				no: 'Resume registration'
			},
			fn: function (buttonId, text, opt) {
				if (buttonId == "yes") {
					this.getView().fireEvent('redirect');
				}
			}, scope: this
		});
	},
	/**
	 * The event fired when processing registration
	 */
	register: function () {
		var form = this.getView();
		// client side validation
		if (form.isValid()) {

            // hash password before sending form
            // SHA-512 is used for it is well tested.
            // SHA-3 (Keccak) is also available.  CryptoJS.SHA3("Message");
            password = form.down('#password').getValue();
            var hashedPassword = CryptoJS.SHA512(password);

            var hashedConfirmPassword = hashedPassword;   //TODO: this is a quick fix. dont need to send this.

//            var params = form.getValues();
//            params.password = hashedPassword;
//            debugger;

            var values = form.getValues();
            var params={

                firstName: values.firstName,
                lastName: values.lastName,
                accountType: values.accountType,
                email: values.email,
                password: hashedPassword,
//                confirmPassword: values.confirmPassword
                confirmPassword: hashedConfirmPassword

            }

            console.log(params)

            debugger;


            // server side validation
		var	sendRegisterToServer = Ext.Ajax.request({
				url: '/register/process',
				method: 'POST',
				submitEmptyText: false,
//				params: form.getValues(),
                params: params,
                success: function (response) {
					// server side validation was successful and the user is redirected to the home page
                    Ext.Msg.alert('Success', 'You have successfully registered.');
                    form.fireEvent('register');
					console.log(response.responseText);
				},
				failure: function (response) {
					Ext.Msg.alert('Error', response.responseText);
				}, scope: this
			});
		} else {
			Ext.Msg.alert('Error', 'Form fields may not be submitted with invalid values.');
		}
        debugger;
	}

});
