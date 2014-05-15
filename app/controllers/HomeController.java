package controllers;

import models.Flight;
import play.mvc.Controller;
import play.mvc.Result;

import java.util.List;

public class HomeController extends Controller {

	public static Result login() {
		List<Flight> flights = Flight.find.all();
		return ok(views.html.home.render(flights));
	}

	public static Result processFlights() {
		List<Flight> flights = Flight.find.all();
		return ok(views.html.flights.render(flights.subList(0, 9)));
	}

}
