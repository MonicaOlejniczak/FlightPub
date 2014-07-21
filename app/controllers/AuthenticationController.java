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
	 * A method that checks if the specified username is taken
	 *
	 * @param username the account username being checked
	 * @return whether the specified username is taken
	 */
	public static boolean isUsernameTaken(String username) {
		return User.find.where().eq("email", username).findUnique() != null;
	}
	/**
	 * Inner static class to specify and validate the fields used in the registration Form.
	 */
	public static class RegistrationForm {
		/**
		 * First-name field from the request.
		 */
		@Constraints.Required(message = "First name is a required field.")
		@Constraints.MaxLength(value = 30, message = "The first name provided is too long.")
		public String firstName;

		/**
		 * Last-name field from the request.
		 */
		@Constraints.Required(message = "Last name is a required Field.")
		@Constraints.MaxLength(value = 30, message = "The last name provided is too long.")
		public String lastName;

        /**
         * Account type field from the request
         */
        @Constraints.Required
        public String accountType;

		/**
		 * Email field from the request.
		 */
		@Constraints.Required(message = "Email is a required field.")
		@Constraints.Email(message = "The email address provided is invalid.")
		public String email;

		/**
		 * Password field from the request.
		 */
		@Constraints.Required(message = "Password is a required field.")
		@Constraints.MinLength(value = 8, message = "The password provided is too short.")
		public String password;

	}

	/**
	 * Inner static class to specify and validate the fields used in the login Form.
	 */
	public static class LoginCredentials {
		/**
		 * Email field from the request.
		 */
		@Constraints.Required(message = "Email is a required field.")
		@Constraints.Email(message = "The email address provided is invalid.")
		public String email;

		/**
		 * Password field from the request.
		 */
		@Constraints.Required(message = "Password is a required field.")
		@Constraints.MinLength(value = 8, message = "The password provided is too short.")
		public String password;

		/**
		 * Handles validation of the User login Form.
		 * @return The error message if an error occurred, or null if validation was successful.
		 */
		public String validate() {
			return User.authenticate(this.email, this.password) ? null : "Invalid credentials. Please try again.";
		}
	}

	/**
	 * Register action - displays the FlightPub registration form.
	 * @return The registration form.
	 */
	public static Result register() {
		return ok(views.html.register.render());
	}

	/**
	 * Process-Registration action - processes the registration details supplied by the user, storing them if they are
	 * valid.
	 * @return A redirect to the specified destination page if successful, or a redirect back to the Register action on
	 * failure.
	 */
	public static Result registerUser() {
		// get the form
		Form<RegistrationForm> registrationForm = Form.form(RegistrationForm.class).bindFromRequest();
		// retrieve the registration details
		RegistrationForm details = registrationForm.get();
		// return validity
		if (registrationForm.hasErrors()) {
			// the form is invalid and a bad request must be sent
			return badRequest("There was an error processing your registration.");
		} else if (AuthenticationController.isUsernameTaken(details.email)) {
			// the username is invalid and a bad request must be sent
			return badRequest("The email you have supplied is already in use.");
		} else {
			// register the user
			User.register(details.firstName, details.lastName, details.email, details.accountType, details.password);
			// log the user in and return a success
			session().clear();
			session("email", details.email);
			return ok("Registration was successful.");
		}
	}

	/**
	 * Login action - displays the FlightPub login form.
	 * @return The login form.
	 */
	public static Result login() {
		return ok(views.html.login.render());
	}

	/**
	 * Process-Login action - processes the login credentials supplied by the user, authenticating them if the details
	 * are valid.
	 * @param destination The destination page to redirect to upon a successful login.
	 * @return A redirect to the specified destination page if successful, or a redirect back to the Login action on
	 * failure.
	 */
	public static Result loginUser(String destination) {
		// get the form
		Form<LoginCredentials> loginForm = Form.form(LoginCredentials.class).bindFromRequest();
		if (loginForm.hasErrors()) {
			return badRequest("The login details provided are incorrect.");
		} else {
			// log the user in and redirect to the previous page (if one exists) or the homepage
			session().clear();
			session("email", loginForm.get().email);
			return ok("Login was successful.");
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
	 * Checks if the user is logged in
	 *
	 * @return whether the user is logged in or not
	 */
	public static Result isLoggedIn() {
		return authentication.AuthenticatedUser.isLoggedIn() ? status(1) : status(0);
	}

}
