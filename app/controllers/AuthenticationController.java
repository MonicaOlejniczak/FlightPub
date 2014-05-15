package controllers;

import akka.util.Crypt;
import com.avaje.ebean.Ebean;
import models.User;
import play.data.Form;
import play.data.validation.Constraints;
import play.libs.Yaml;
import play.mvc.Controller;
import play.mvc.Result;

import java.util.List;
import java.util.Map;

/**
 * Controller responsible for all authentication in the FlightPub system.
 * @author Trey Brisbane
 */
public class AuthenticationController extends Controller {
	/**
	 * Inner static class to specify and validate the fields used in the login Form.
	 */
	public static class LoginCredentials {
		@Constraints.Required
		public String email;
		@Constraints.Required
		public String password;

		/**
		 * Handles validation of the User login Form.
		 * @return The error message if an error occurred, or null if validation was successful.
		 */
		public String validate() {
			if (User.authenticate(this.email, Crypt.sha1(this.password))) {
				return null;
			} else {
				return "Error: Invalid credentials. Please try again.";
			}
		}
	}

	/**
	 * Login action - displays the FlightPub login form.
	 * @return The Login form.
	 */
	public static Result login() {
		return ok(views.html.login.render(Form.form(LoginCredentials.class)));
	}

	/**
	 * Process-Login action - processes the login credentials supplied by the user, authenticating them if the details
	 * are valid.
	 * @return A redirect to the specified destination page if successful, or a redirect back to the Login action on
	 * failure.
	 */
	public static Result processLogin() {
		Form<LoginCredentials> loginForm = Form.form(LoginCredentials.class).bindFromRequest();
		if (loginForm.hasErrors()) {
			return badRequest(views.html.login.render(loginForm));
		} else {
			session().clear();
			session("email", loginForm.get().email);
			return redirect(controllers.routes.MainController.home());
		}
	}

	/**
	 * Logout action - invalidates the current user's session, logging them out of the FlightPub system.
	 * @return A redirect to the FlightPub homepage.
	 */
	public static Result logout() {
		session().clear();
		return redirect(controllers.routes.MainController.home());
	}

	/**
	 * TODO: Remove this abomination.
	 * @return Shhhh...
	 */
	public static Result hax() {
		if (Ebean.find(User.class).findRowCount() == 0) {
			@SuppressWarnings("unchecked")
			Map<String,List<Object>> all = (Map<String,List<Object>>)Yaml.load("initial-data.yml");
			Ebean.save(all.get("users"));
		}
		return redirect("/");
	}
}
