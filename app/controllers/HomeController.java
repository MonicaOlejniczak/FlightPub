package controllers;

import play.mvc.Controller;
import play.mvc.Result;

public class HomeController extends Controller {

	public static Result login() {
		return ok(views.html.home.render());
	}

	public static Result processFlights() {
		return ok(views.html.flights.render());
	}

}
