package controllers;

import akka.util.Crypt;
import com.avaje.ebean.Ebean;
import models.User;
import play.data.Form;
import play.data.validation.Constraints;
import play.libs.Yaml;
import play.mvc.Controller;
import play.mvc.Result;

import javax.validation.Constraint;
import java.util.List;
import java.util.Map;

/**
 * Controller responsible for all authentication in the FlightPub system.
 * @author Trey Brisbane
 */
public class AuthenticationController extends Controller {
	/**
	 * Inner static class to specify and validate the fields used in the registration Form.
	 */
	public static class RegistrationDetails {
		/**
		 * First-name field from the request.
		 */
		@Constraints.Required
		@Constraints.MinLength(1)
		@Constraints.MaxLength(30)
		public String firstName;

		/**
		 * Last-name field from the request.
		 */
		@Constraints.Required
		@Constraints.MinLength(1)
		@Constraints.MaxLength(30)
		public String lastName;

		/**
		 * Email field from the request.
		 */
		@Constraints.Required
		@Constraints.Email
		public String email;

		/**
		 * Password field from the request.
		 */
		@Constraints.Required
		@Constraints.MinLength(8)
		public String password;
	}

	/**
	 * Inner static class to specify and validate the fields used in the login Form.
	 */
	public static class LoginCredentials {
		/**
		 * Email field from the request.
		 */
		@Constraints.Required
		@Constraints.Email
		public String email;

		/**
		 * Password field from the request.
		 */
		@Constraints.Required
		@Constraints.MinLength(8)
		public String password;

		/**
		 * Handles validation of the User login Form.
		 * @return The error message if an error occurred, or null if validation was successful.
		 */
		public String validate() {
			if (User.authenticate(this.email, this.password)) {
				return null;
			} else {
				return "Error: Invalid credentials. Please try again.";
			}
		}
	}

	/**
	 * Register action - displays the FlightPub registration form.
	 * @return The registration form.
	 */
	public static Result register() {
		return ok(views.html.register.render(Form.form(RegistrationDetails.class)));
	}

	/**
	 * Process-Registration action - processes the registration details supplied by the user, storing them if they are
	 * valid.
	 * @return A redirect to the specified destination page if successful, or a redirect back to the Register action on
	 * failure.
	 */
	public static Result processRegistration() {
		// Get the request parameters
		Form<RegistrationDetails> registrationForm = Form.form(RegistrationDetails.class).bindFromRequest();

		// Do we have errors?
		if (registrationForm.hasErrors()) {
			// If we do, issue a bad-request error
			return badRequest(views.html.register.render(registrationForm));
		} else {
			// Otherwise, get the form parameters' values
			RegistrationDetails details = registrationForm.get();

			// Register the user
			User.register(details.firstName, details.lastName, details.email, details.password);

			// Then log them in, and redirect to the homepage
			session().clear();
			session("email", details.email);
			return redirect(controllers.routes.MainController.home());
		}
	}

	/**
	 * Login action - displays the FlightPub login form.
	 * @return The login form.
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
		// Get request parameters
		Form<LoginCredentials> loginForm = Form.form(LoginCredentials.class).bindFromRequest();

		// Do we have errors?
		if (loginForm.hasErrors()) {
			// If we do, issue a bad-request error
			return badRequest(views.html.login.render(loginForm));
		} else {
			// Otherwise, log the user in and redirect to the homepage
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
