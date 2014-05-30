package controllers;

import models.Flight;
import play.mvc.Controller;
import play.mvc.Result;

public class MainController extends Controller {

	public static Result home() {
		return ok(views.html.home.render(Flight.find.all()));
	}

    public static Result about() { return ok(views.html.about.render()); }

    public static Result contact() { return ok(views.html.contact.render()); }

}
