Ext.define('FB.controllers.SeatSelection', {
	/**
	 * Dependencies
	 */
	requires: [
		'Ext.form.Panel',
		'Ext.form.Label',
		'Ext.button.Button'
	],
	/**
	 * A constructor that adds the click events to the flights page and converts the json file to a data store
	 * @constructor
	 */
	constructor: function () {
		Ext.onReady(function () {
			this.rowCount = 6;
			this.columnCount = 6;
			this.totalSeats = 34;
			this.passengers = 3;
			this.renderForm();
		}, this);
	},
	/**
	 * A method that renders the seat selection form
	 */
	renderForm: function () {
		var formId = 'seatsForm';
		var form = Ext.create('Ext.form.Panel', {
			id: formId,
			renderTo: 'seats',
			url: '/seat-selection/process',
			method: 'post',
			standardSubmit: true,
			height: '100%',
			items: [],
			buttons: []
		}, this);
		this.renderSeats(formId);
		this.renderButtons(form);
	},
	/**
	 *  Renders the seats for selection
	 *
	 *  @param formId the id of the form
	 */
	renderSeats: function (formId) {
		var marginRD = '0 10px 10px 0';
		var marginD = '0 0 10px 0';
		var marginR = '0 10px 0 0';
		var seatsCount = 0;
		for (var i = 0; i < this.rowCount; i++) {
			var row = String.fromCharCode(65 + i); // starts at Row 'A'
			var container = Ext.create('Ext.container.Container', {
				layout: {
					type: 'hbox',
					align: 'stretch'
				},
				renderTo: Ext.get(formId),
				cls: 'row'
			});
			container.add(Ext.create('Ext.form.Label', {
				forId: 'button_' + row + 1, // always add to button_{row}1
				cls: 'rowLabel',
				text: 'Row ' + row,
				flex: 0.5,
				margin: marginRD
			}));
			var halfColumnCount = Math.floor(this.columnCount / 2);
			for (var j = 0; j < halfColumnCount; j++, seatsCount++) {
				var id = 'button_' + row + (j + 1);
				var available = seatsCount < this.totalSeats;
				container.add(Ext.create('Ext.button.Button', {
					id: id,
					cls: available ? 'button' : 'desaturate',
					text: available ? row + (j + 1) : "",
					flex: 1,
					scale: 'large',
					margin: marginRD,
					listeners: {
						click: Ext.pass(function (id) {
							this.selectSeat(id);
						}, id),
						scope: this
					}
				}));
			}
			container.add(Ext.create('Ext.container.Container', {
				type: 'hbox',
				cls: 'aisle',
				flex: 1,
				margin: i == this.rowCount - 1 ? marginRD : marginR
			}));
			for (j = halfColumnCount; j < this.columnCount; j++, seatsCount++) {
				id = 'button_' + row + (j + 1);
				available = seatsCount < this.totalSeats;
				container.add(Ext.create('Ext.button.Button', {
					id: id,
					cls: available ? 'button' : 'desaturate',
					text: available ? row + (j + 1) : "",
					flex: 1,
					scale: 'large',
					margin: j == this.columnCount - 1 ? marginD : marginRD,
					listeners: {
						click: Ext.pass(function (id) {
							this.selectSeat(id);
						}, id),
						scope: this
					}
				}));
			}
		}
	},
	/**
	 * A method to handle clicking a seat button
	 */
	selectSeat: function (id) {
		if (Ext.get(id).hasCls('desaturate')) {
			Ext.Msg.alert('Error', 'This is not a valid seat.');
		} else {
			Ext.get(id).toggleCls('selectedButton');
			var selected = Ext.select('.selectedButton').elements.length;
			if (selected > this.passengers) {
				Ext.Msg.alert('Error', 'You have attempted to select too many tickets.');
				Ext.get(id).removeCls('selectedButton');
			}
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
				window.location.href = '/luggage';
			}
		}));
	},
	/**
	 * Renders the next button for the form
	 *
	 *  @param container the button container
	 *  @form the main form used on the page
	 */
	renderNextButton: function (container, form) {
		container.add(Ext.create('Ext.button.Button', {
			text: 'Next',
			cls: 'button',
			scale: 'large',
			formBind: true,
			handler: function () {
				var selected = Ext.select('.selectedButton').elements.length;
				if (selected == this.passengers) {
					form.getForm().submit({
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
				} else {
					Ext.Msg.alert('Error', 'You have not chosen enough seats.');
				}
			}, scope: this
		}));
	}

});
