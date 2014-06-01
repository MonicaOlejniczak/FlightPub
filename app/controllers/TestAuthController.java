package controllers;

/*
 * TestAuthController.java
 * Date created: 16/05/2014
 * Copyright 2014 Trey Brisbane
 */

import authentication.AuthenticatedUser;
import play.mvc.Result;
import play.mvc.Controller;
import play.mvc.Security;

/**
 * A Controller class that tests User authentication.
 *
 * @author Trey Brisbane
 */
@Security.Authenticated(AuthenticatedUser.class)
public class TestAuthController extends Controller {
	public static Result index() {
		if (AuthenticatedUser.isLoggedIn()) {
			return ok(views.html.accountSettings.render());
		} else {
			return forbidden();
		}
	}

    public static Result processSettings() { return ok(views.html.accountSettings.render()); }
}
