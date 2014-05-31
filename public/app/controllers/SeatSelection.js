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
			url: '/luggage',
			method: 'post',
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
				flex: 1,
				margin: marginRD
			}));
			var halfColumnCount = Math.floor(this.columnCount / 2);
			for (var j = 0; j < halfColumnCount; j++) {
				var id = 'button_' + row + (j + 1);
				container.add(Ext.create('Ext.button.Button', {
					id: id,
					text: row + (j + 1),
					flex: 1,
					scale: 'large',
					margin: marginRD
				}));
			}
			container.add(Ext.create('Ext.container.Container', {
				type: 'hbox',
				cls: 'aisle',
				flex: 1,
				margin: i == this.rowCount - 1 ? marginRD : marginR
			}));
			for (j = halfColumnCount; j < this.columnCount; j++) {
				id = 'button_' + row + (j + 1);
				container.add(Ext.create('Ext.button.Button', {
					id: id,
					text: row + (j + 1),
					flex: 1,
					scale: 'large',
					margin: j == this.columnCount - 1 ? marginD : marginRD
				}));
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
			cls: buttonClass,
			scale: 'large',
			handler: function () {
				var answer = confirm("Are you sure you wish to cancel your current booking?\nClick OK to confirm or CANCEL to continue with your booking.");
				if (answer) {
					window.location.href = "/";
				}
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
			cls: buttonClass,
			scale: 'large',
			handler: function () {
				window.location.href = '/flights';
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
			cls: buttonClass,
			scale: 'large',
			formBind: true,
			handler: function () {
				var form = Ext.get(form.getId()).getForm();
				if (form.isValid()) {
					form.submit({
						success: function (form, action) {
							window.location = action.result.data.url;
						},
						failure: function (form, action) {
							Ext.MessageBox.alert('ERROR: You have not chosen enough seats.');
						}
					});
				}
			}
		}));
	}

});
