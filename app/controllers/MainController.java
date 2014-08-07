package controllers;

import play.mvc.Controller;
import play.mvc.Result;

public class MainController extends Controller {

	public static Result home() {
		return ok(views.html.main.render());
	}

}
