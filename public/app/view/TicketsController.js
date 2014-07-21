Ext.define('FB.view.TicketsController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Tickets',
	/**
	 * Dependencies
	 */
	requires: [
		'Ext.form.Panel',
		'Ext.form.Label',
		'Ext.form.field.ComboBox',
		'Ext.button.Button'
	],
	/**
	 * The initialising function
	 */
	init: function () {
		Ext.onReady(function () {
			this.passengers = POST_PARAMS.numTickets;
			this.renderForm();
		}, this);
	},
	/**
	 * A method that renders the seat selection form
	 */
	renderForm: function () {
		var formId = 'luggageForm';
		var form = Ext.create('Ext.form.Panel', {
			id: formId,
			renderTo: 'tickets',
			url: '/seat-selection',
			method: 'post',
			standardSubmit: true,
			height: '100%',
			items: [],
			buttons: []
		}, this);
		this.renderLuggage(formId);
		this.renderButtons(form);
	},
	/**
	 *  Renders the luggage and ticket type for selection
	 *
	 *  @param formId the id of the form
	 */
	renderLuggage: function (formId) {
		var ticketTypes = Ext.create('Ext.data.Store', {
			fields: ['name'],
			data : [
				{'name': 'Economy'},
				{'name': 'Premium Economy'},
				{'name': 'Business Class'},
				{'name': 'First Class'}
			]
		});
		var luggageTypes = Ext.create('Ext.data.Store', {
			fields: ['name'],
			data : [
				{'name': 'Only Carry-On Luggage'},
				{'name': 'Carry-On Plus Checked Baggage'}
			]
		});
		for (var i = 0; i < this.passengers; i++) {
			var container = Ext.create('Ext.container.Container', {
				layout: {
					type: 'hbox',
					align: 'stretch'
				},
				renderTo: Ext.get(formId),
				cls: 'passenger'
			});
			container.add(Ext.create('Ext.form.Label', {
				forId: 'passenger_' + (i + 1),
				cls: 'passengerLabel',
				text: 'Passenger ' + (i + 1) + ': ',
				flex: 0.25
			}));
			container.add(Ext.create('Ext.form.ComboBox', {
				store: ticketTypes,
				queryMode: 'local',
				displayField: 'name',
				valueField: 'name',
				fieldCls: 'passengerLabel',
				value: 'Economy',
				flex: 1,
				editable: false,
				triggerAction: 'all',
				cls: 'ticketType',
				margin: '0 10px 0 10px'
			}));
			container.add(Ext.create('Ext.form.ComboBox', {
				store: luggageTypes,
				queryMode: 'local',
				displayField: 'name',
				valueField: 'name',
				value: 'Only Carry-On Luggage',
				flex: 1,
				editable: false,
				cls: 'luggageType',
				triggerAction: 'all'
			}));
		}
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
		this.renderBackButton(container);
		this.renderNextButton(container, form);
	},
	/**
	 *  Renders the cancel button for the form
	 *
	 *  @param container the button container
	 *  @param form the main form used on the page
	 */
	renderCancelButton: function (container, form) {
		container.add(Ext.create('Ext.button.Button', {
			text: 'Cancel',
			cls: 'cancelButton',
			scale: 'large',
			handler: function () {
				Ext.create('Ext.window.MessageBox').show ({
					title: 'Cancel Booking',
					msg: 'Do you wish to cancel your booking?',
					buttonText: {
						yes: 'Cancel Booking',
						no: 'Resume Booking'
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
	 * Renders the back button for the form
	 *
	 *  @param container the button container
	 */
	renderBackButton: function (container) {
		container.add(Ext.create('Ext.button.Button', {
			text: 'Back',
			cls: 'button',
			scale: 'large',
			handler: function () {
				window.history.back();
			}
		}));
	},
	/**
	 * Renders the next button for the form
	 *
	 *  @param container the button container
	 *  @param form the main form used on the page
	 */
	renderNextButton: function (container, form) {
		container.add(Ext.create('Ext.button.Button', {
			text: 'Next',
			cls: 'button',
			scale: 'large',
			formBind: true,
			handler: function () {
				form.getForm().submit({
                    params: {
                        params: Ext.encode(POST_PARAMS)
                    },
					success: function(form, action) {
						Ext.Msg.alert('Success', action.result.msg);
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
