/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.booking.seats.SeatSelectionController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.SeatSelection',
	requires: [
		'FB.view.booking.seats.row.Row'
	],
	config: {
		rows: 6,
		columns: 6,
		seats: 34,
		selected: null
	},
	control: {
		'Seat': {
			select: function (seat) {
				this.selectSeat(seat);
			}
		}
	},
	init: function () {
        this.setSelected([]);
		var view = this.getView();
		// add the next request event to the view
		view.on('nextRequest', this.onNextRequest, this);
		// update where the flight is coming from and going to
		var flight = view.getFlight();
		var from = flight.source.name;
		var to = flight.destination.name;
		view.down('#flight').update({
			from: from,
			to: to
		});
		// update how many seats there are to choose from
		var passengers = view.getPassengers();
		view.down('#seatCount').update({
			passengers: passengers
		});
		// add all the seat rows
		var rows = this.getRows();
		var columns = this.getColumns();
		for (var i = 0; i < rows; i++) {
			view.down('#seats').add(Ext.widget('SeatRow', {
				row: i,
				columns: columns
			}));
		}
	},
	/**
	 * A method to handle clicking a seat button
	 *
	 * @param seat the seat button that was clicked
	 */
	selectSeat: function (seat) {
		var view = this.getView();
		// get the amount of selected seats and how many passengers to select seats for
		var selected = this.getSelected().length;
		var passengers = view.getPassengers();
		// a function to update the seat count
		function updateSeatCount (selected) {
			view.down('#seatCount').update({
				passengers: passengers - selected
			});
		}
		// a function to select or deselect the seat
		function changeSeat (isSelected, removeCls, addCls, selected) {
			// set whether the seat is selected and add and remove the appropriate classes
			seat.setSelected(isSelected);
			seat.removeCls(removeCls);
			seat.addCls(addCls);
			// set the config property and update the seat count
			updateSeatCount(selected);
		}
		// check if the seat has already been selected
		if (seat.getSelected()) {
			// deselect the seat
			changeSeat.call(this, false, 'button-green', 'button-blue', selected - 1);
            Ext.Array.remove(this.getSelected(), seat);
		} else {
			// check if the user is trying to select too many seats
			if (selected === passengers) {
				Ext.Msg.alert('Error', 'You have attempted to select too many seats.');
			} else {
				// select the seat
				changeSeat.call(this, true, 'button-blue', 'button-green', selected + 1);
                this.getSelected().push(seat);
			}
		}
	},
    /**
     * Returns the selected seat ids
     */
    getSelectedSeats: function () {
        var selected = this.getSelected();
        var seats = [];
        Ext.each(selected, function (seat) {
            seats.push({
                row: seat.row,
                column: seat.column
            });
        });
        return seats;
    },
	/**
	 * This method is called when the next button is pressed on the booking view
	 *
	 * @param parameters the information obtained from the booking controller
	 */
	onNextRequest: function (parameters) {
		var view = this.getView();
		var valid = view.getPassengers() === this.getSelected().length;
		// check if the correct amount of seats has been selected
		if (valid) {
			// update the booking with the selected seats and then set the page to the next one
			view.fireEvent('update', view.getIndex(), this.getSelectedSeats());
			view.fireEvent('next');
		} else {
			Ext.Msg.alert('Error', 'You must select all of the designated seats before proceeding.');
		}
	}
});
