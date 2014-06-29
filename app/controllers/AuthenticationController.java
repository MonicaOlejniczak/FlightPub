package controllers;

import models.User;
import play.data.Form;
import play.data.validation.Constraints;
import play.mvc.Controller;
import play.mvc.Result;

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
		@Constraints.Required(message = "Required Field!")
		@Constraints.MaxLength(value = 30, message = "Name Too Long!")
		public String firstName;

		/**
		 * Last-name field from the request.
		 */
		@Constraints.Required(message = "Required Field!")
		@Constraints.MaxLength(value = 30, message = "Name Too Long!")
		public String lastName;

        /**
         * Account type field from the request
         */
        @Constraints.Required
        public String accountType;

		/**
		 * Email field from the request.
		 */
		@Constraints.Required(message = "Required Field!")
		@Constraints.Email(message = "Invalid Email Address!")
		public String email;

		/**
		 * Password field from the request.
		 */
		@Constraints.Required(message = "Required Field!")
		@Constraints.MinLength(value = 8, message = "Password Too Short!")
		public String password;
	}

	/**
	 * Inner static class to specify and validate the fields used in the login Form.
	 */
	public static class LoginCredentials {
		/**
		 * Email field from the request.
		 */
		@Constraints.Required(message = "Required Field!")
		@Constraints.Email(message = "Invalid Email Address!")
		public String email;

		/**
		 * Password field from the request.
		 */
		@Constraints.Required(message = "Required Field!")
		@Constraints.MinLength(value = 8, message = "Password Too Short!")
		public String password;

		/**
		 * Handles validation of the User login Form.
		 * @return The error message if an error occurred, or null if validation was successful.
		 */
		public String validate() {
			if (User.authenticate(this.email, this.password)) {
				return null;
			} else {
				return "Invalid credentials. Please try again.";
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
		// retrieve the request parameters
		Form<RegistrationDetails> registrationForm = Form.form(RegistrationDetails.class).bindFromRequest();
		// check for registration errors
		if (registrationForm.hasErrors()) {
			// return a bad-request error
			System.out.println("bad");
			return badRequest(views.html.register.render(registrationForm));
		} else {
			System.out.println("hello");
			// retrieve the form parameters' values
			RegistrationDetails details = registrationForm.get();
			// register the user
			User.register(details.firstName, details.lastName, details.email, details.accountType, details.password);
			// log the user in and redirect them to the homepage
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
	 * @param destination The destination page to redirect to upon a successful login.
	 * @return A redirect to the specified destination page if successful, or a redirect back to the Login action on
	 * failure.
	 */
	public static Result processLogin(String destination) {
		// Get request parameters
		Form<LoginCredentials> loginForm = Form.form(LoginCredentials.class).bindFromRequest();

		// Do we have errors?
		if (loginForm.hasErrors()) {
			// If we do, re-save the destination URL (unlike every other side, ever) and issue a bad-request error
			if (destination != null) { flash().put("destination", destination); }
			return badRequest(views.html.login.render(loginForm));
		} else {
			// Otherwise, log the user in and redirect to the previous page (if one exists) or the homepage
			session().clear();
			session("email", loginForm.get().email);
			return redirect(destination != null ? destination : controllers.routes.MainController.home().url());
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

}
