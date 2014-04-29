package controllers;

import models.Flight;
import play.mvc.Controller;
import play.mvc.Result;

import java.util.List;

public class MainController extends Controller {

	public static Result home() {
		List<Flight> flights = Flight.find.all();
		return ok(views.html.home.render(flights));
	}

}
