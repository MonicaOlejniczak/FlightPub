package controllers;

import models.Luggage;
import models.Seat;
import play.mvc.Controller;
import play.mvc.Result;
import java.util.List;

public class BookingController extends Controller {

	public static Result flights() {
		return ok(views.html.flights.render());
	}

    public static Result seatSelection() {
	    List<Seat> seats = Seat.find.all();
        return ok(views.html.seatSelection.render(seats));
    }

	public static Result luggage() {
		List<Luggage> luggageTypes = Luggage.find.all();
		return ok(views.html.luggage.render(luggageTypes));
	}

    public static Result payment() {
        return ok(views.html.payment.render());
    }

}
