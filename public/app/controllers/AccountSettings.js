Ext.define('FB.controllers.AccountSettings', {
	/**
	 * Dependencies
	 */
	requires: [
		'Ext.form.Panel',
		'Ext.form.Label',
		'Ext.form.field.Text',
		'Ext.button.Button'
	],
	/**
	 * A constructor that adds the click events to the flights page and converts the json file to a data store
	 * @constructor
	 */
	constructor: function () {
		Ext.onReady(function () {
			this.getRequests();
		}, this);
	},
	/**
	 * Gets the ajax requests required for the inputs
	 */
	getRequests: function () {
		Ext.Ajax.request({
			url: '/data/account-details',
			success: function(response){
				var text = response.responseText;
				var details = Ext.decode(text);
				this.renderForm(details);
			}, scope: this
		});
	},
	/**
	 * A method that renders the account settings form
	 *
	 * @param details the user account details
	 */
	renderForm: function (details) {
		var formId = 'accountSettingsForm';
		var form = Ext.create('Ext.form.Panel', {
			id: formId,
			renderTo: 'accountSettings',
			url: '/account/process',
			method: 'post',
			standardSubmit: true,
			height: '100%',
			items: [],
			buttons: []
		}, this);
		this.renderAccountSettings(formId, details);
		this.renderButtons(form);
	},
	/**
	 * Renders the account settings inputs
	 *
	 * @param formId the id of the form
	 * @param details the user account details
	 */
	renderAccountSettings: function (formId, details) {
		var container = Ext.create('Ext.container.Container', {
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			renderTo: Ext.get(formId)
		});
		var labelWidth = 200;
		container.add(Ext.create('Ext.form.field.Text', {
			fieldLabel: 'First name',
			labelWidth: labelWidth,
			value: details.firstName,
			maxLength: 50,
			flex: 1
		}));
		container.add(Ext.create('Ext.form.field.Text', {
			fieldLabel: 'Last name',
			labelWidth: labelWidth,
			value: details.lastName,
			maxLength: 50,
			flex: 1
		}));
		container.add(Ext.create('Ext.form.field.Text', {
			inputType: 'email',
			fieldLabel: 'Email address',
			labelWidth: labelWidth,
			value: details.email,
			flex: 1
		}));
		container.add(Ext.create('Ext.form.field.Text', {
			inputType: 'password',
			fieldLabel: '* Current password',
			labelWidth: labelWidth,
			emptyText: "please enter your current password",
			allowBlank: false,
			msgTarget: 'under',
			flex: 1
		}));
		var newPassword = Ext.create('Ext.form.field.Text', {
			inputType: 'password',
			fieldLabel: 'New password',
			labelWidth: labelWidth,
			emptyText: "please enter your new password",
			vtype: 'confirmedPassword',
			msgTarget: 'under',
			flex: 1
		});
		var confirmPassword = Ext.create('Ext.form.field.Text', {
			inputType: 'password',
			fieldLabel: 'Confirm new password',
			labelWidth: labelWidth,
			emptyText: "please enter your new password again",
			vtype: 'equalPassword',
			msgTarget: 'under',
			flex: 1
		});
		container.add(newPassword);
		container.add(confirmPassword);
		Ext.apply(Ext.form.field.VTypes, {
			confirmedPassword: function() {
				return confirmPassword.getValue() !== "";
			},
			confirmedPasswordText: 'Error: You must confirm your password.'
		});
		Ext.apply(Ext.form.field.VTypes, {
			equalPassword: function() {
				return newPassword.getValue() == confirmPassword.getValue();
			},
			equalPasswordText: 'Error: Your new password and confirmed password do not match.'
		});
	},
	/**
	 * A method that renders each button in a container
	 *
	 * @param form the main form used on the page
	 */
	renderButtons: function (form) {
		var container = Ext.create('Ext.container.Container', {
			id: 'buttons',
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			renderTo: Ext.get(form.getId())
		});
		this.renderCancelButton(container, form);
		this.renderUpdateDetailsButton(container, form);
	},
	/**
	 * Renders the cancel button for the form
	 *
	 * @param container the button container
	 * @param form the main form used on the page
	 */
	renderCancelButton: function (container, form) {
		container.add(Ext.create('Ext.button.Button', {
			text: 'Cancel',
			cls: 'cancelButton',
			scale: 'large',
			handler: function () {
				Ext.create('Ext.window.MessageBox').show ({
					title: 'Cancel',
					msg: 'Do you wish to cancel updating your settings?',
					buttonText: {
						yes: 'Cancel',
						no: 'Resume updating settings'
					},
					fn: function (buttonId, text, opt) {
						if (buttonId == "yes") {
							form.getForm().reset();
							window.location.href = '/';
						}
					}
				});
			}
		}));
	},
	/**
	 * Renders the update details button for the form
	 *
	 * @param container the button container
	 * @param form the main form used on the page
	 */
	renderUpdateDetailsButton: function (container, form) {
		container.add(Ext.create('Ext.button.Button', {
			text: 'Update Details',
			cls: 'button',
			scale: 'large',
			formBind: true,
			handler: function () {
				form.getForm().submit({
					success: function(form, action) {
						if (form.isValid()) {
							return confirmPassword();
						} else {
							Ext.Msg.alert('Error', 'Your form input contains errors.');
						}
					},
					failure: function(form, action) {
						switch (action.failureType) {
							case Ext.form.action.Action.CLIENT_INVALID:
								Ext.Msg.alert('Failure', 'Form fields may not be submitted with invalid values');
								break;
							case Ext.form.action.Action.CONNECT_FAILURE:
								Ext.Msg.alert('Failure', 'Ajax communication failed');
								break;
							case Ext.form.action.Action.SERVER_INVALID:
								Ext.Msg.alert('Failure', action.result.msg);
						}
					}
				});
			}, scope: this
		}));
	}

});
