package controllers;

import models.User;
import play.data.Form;
import play.mvc.Controller;
import play.mvc.Result;

/**
 * Controller responsible for all authentication in the FlightPub system.
 * @author Trey Brisbane
 */
public class AuthenticationController extends Controller {
	/**
	 * Login form to be presented to the user when they request to login to the FlightPub system.
	 */
	final static Form<User> loginForm = Form.form(User.class, User.LoginFields.class);

	/**
	 * Login action - displays the FlightPub login form.
	 * @return The Login form.
	 */
	public static Result login() {
		return ok(views.html.login.render(loginForm));
	}

	/**
	 * Process-Login action - processes the login credentials supplied by the user, authenticating them if the details
	 * are valid.
	 * @return A redirect to the specified destination page if successful, or a redirect back to the Login action on
	 * failure.
	 */
	public static Result processLogin() {
		//@TODO: Process login
		return null;
	}

	/**
	 * Logout action - invalidates the current user's session, logging them out of the FlightPub system.
	 * @return A redirect to the FlightPub homepage.
	 */
	public static Result logout() {
		//@TODO: Invalidate session
		return redirect("/");
	}
}
