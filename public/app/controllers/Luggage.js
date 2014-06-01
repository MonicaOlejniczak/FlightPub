Ext.define('FB.controllers.Luggage', {
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
	 * A constructor that adds the click events to the flights page and converts the json file to a data store
	 * @constructor
	 */
	constructor: function () {
		Ext.onReady(function () {
			this.passengers = 3;
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
			renderTo: 'luggage',
			url: '/payment',
			method: 'post',
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
		var buttonClass = 'button';
		this.renderCancelButton(container, buttonClass);
		this.renderBackButton(container, buttonClass);
		this.renderNextButton(container, form, buttonClass);
	},
	/**
	 *  Renders the cancel button for the form
	 *
	 *  @param container the button container
	 *  @param buttonClass the class being used for all buttons on the page
	 */
	renderCancelButton: function (container, buttonClass) {
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
	 *  @param buttonClass the class being used for all buttons on the page
	 */
	renderBackButton: function (container, buttonClass) {
		container.add(Ext.create('Ext.button.Button', {
			text: 'Back',
			cls: 'button',
			scale: 'large',
			handler: function () {
				window.location.href = '/seatSelection';
			}
		}));
	},
	/**
	 * Renders the next button for the form
	 *
	 *  @param container the button container
	 *  @param form the main form used on the page
	 *  @param buttonClass the class being used for all buttons on the page
	 */
	renderNextButton: function (container, form, buttonClass) {
		container.add(Ext.create('Ext.button.Button', {
			text: 'Next',
			cls: 'button',
			scale: 'large',
			formBind: true,
			handler: function () {
				window.location = '/payment';
			}, scope: this
		}));
	}

});
