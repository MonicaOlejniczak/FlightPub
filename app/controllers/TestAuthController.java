package controllers;

import authentication.AuthenticatedUser;
import models.User;
import play.data.Form;
import play.data.validation.Constraints;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;

import static play.data.Form.form;

/**
 * A Controller class that tests User authentication.
 *
 */
@Security.Authenticated(AuthenticatedUser.class)
public class TestAuthController extends Controller {

	public static Result index() {
        if (AuthenticatedUser.isLoggedIn()) {
            return ok();
        } else {
            return forbidden();
        }
    }

    /**
     * Inner static class to specify and validate the fields used in the payment form.
     */
    public static class AccountForm {
        /**
         * Email
         */
        @Constraints.Required(message = "Email is a required field.")
        @Constraints.Email(message = "Invalid Email Address!")
        public String email;

        /**
         * Password
         */
        @Constraints.Required(message = "Password is a required field.")
        @Constraints.MinLength(value = 8, message = "Password Too Short!")
        public String password;

	    /**
	     * New password
	     */
	    // todo make new and confirm new the same server side
	    @Constraints.MinLength(value = 8, message = "Password Too Short!")
	    public String newPassword;

	    /**
	     * Confirmed password
	     */
	    @Constraints.MinLength(value = 8, message = "Password Too Short!")
	    public String confirmNewPassword;

	    /**
	     * First name
	     */
	    @Constraints.Required(message = "First name is a required field.")
	    @Constraints.MaxLength(value = 30, message = "Name Too Long!")
	    @Constraints.Pattern(value = "\\D*", message = "Name cannot contain numbers!")
	    public String firstName;

	    /**
	     * Surname
	     */
	    @Constraints.Required(message = "Last name is a required field.")
	    @Constraints.MaxLength(value = 30, message = "Name Too Long!")
	    @Constraints.Pattern(value = "\\D*", message = "Name cannot contain numbers!")
	    public String lastName;

	    /**
	     * Phone number
	     */
	    public Integer phoneNumber;

        /**
         * Street address
         */
        @Constraints.MaxLength(value = 100, message = "Address too long!")
        public String streetAddress;

        /**
         * Suburb or city
         */
        @Constraints.MaxLength(value = 100, message = "Input too long!")
        @Constraints.Pattern(value = "\\D*", message = "Input must not contain numbers!")
        public String suburb;

        /**
         * State
         */
        @Constraints.MaxLength(value = 50, message = "Input too long!")
        @Constraints.Pattern(value = "\\D*", message = "Input must not contain numbers!")
        public String state;

        /**
         * Post code
         */
        public Integer postCode;

        /**
         * Preferred payment method
         */
        public String paymentMethod;
    }

	/**
	 * A method that processes any account setting changes made by the user
	 *
	 * @return whether the settings were processed successfully
	 */
    public static Result processSettings() {
        Form<AccountForm> accountForm = form(AccountForm.class).bindFromRequest();
	    if (accountForm.hasErrors()) {
            return badRequest("There were errors processing your account changes.");
        } else {
            AccountForm details = accountForm.get();
		    User user = User.find.where().eq("email", session().get("email")).findUnique();
		    if (!details.email.equals(user.email)) {
			    // check if the username is taken
			    if (AuthenticationController.isUsernameTaken(details.email)) {
				    return badRequest("The email you have supplied is already in use.");
			    }
			    user.email = details.email;
		    }
		    if (!details.newPassword.isEmpty()) {
			    String newPassword = User.hashPassword(details.newPassword, user.email);
			    if (!newPassword.equals(user.password)) {
				    user.password = newPassword;
			    }
		    }
		    if (!details.firstName.equals(user.firstName)) {
			    user.firstName = details.firstName;
		    }
		    if (!details.lastName.equals(user.lastName)) {
			    user.lastName = details.lastName;
		    }
		    if (details.phoneNumber != null) {
			    if (!details.phoneNumber.equals(user.phoneNumber)) {
				    user.phoneNumber = details.phoneNumber;
			    }
		    } else {
			    user.phoneNumber = null;
		    }
		    if (!details.streetAddress.isEmpty()) {
			    if (!details.streetAddress.equals(user.streetAddress)) {
				    user.streetAddress = details.streetAddress;
			    }
		    } else {
			    user.streetAddress = null;
		    }
		    if (!details.suburb.isEmpty()) {
			    if (!details.suburb.equals(user.suburb)) {
				    user.suburb = details.suburb;
			    }
		    } else {
			    user.suburb = null;
		    }
		    //todo country
		    if (!details.state.isEmpty()) {
			    if (!details.state.equals(user.state)) {
				    user.state = details.state;
			    }
		    } else {
			    user.state = null;
		    }
		    if (details.postCode != null) {
			    if (!details.postCode.equals(user.postcode)) {
				    user.postcode = details.postCode;
			    }
		    } else {
			    user.postcode = null;
		    }
		    if (!details.paymentMethod.isEmpty()) {
			    if (!details.paymentMethod.equals(user.lastPayment.paymentMethod)) {
				    user.lastPayment.paymentMethod = details.paymentMethod;
			    }
		    } else {
			    user.lastPayment.paymentMethod = null;
		    }
		    user.save();
        }
        return ok("Account settings have been processed successfully.");
    }
}
