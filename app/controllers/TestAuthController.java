package controllers;

import authentication.AuthenticatedUser;
import models.User;
import play.data.Form;
import play.data.validation.Constraints;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;
import play.mvc.Security;

import static play.data.Form.form;

/**
 * A Controller class that tests User authentication.
 *
 * @author Trey Brisbane
 */
@Security.Authenticated(AuthenticatedUser.class)
public class TestAuthController extends Controller {

	public static Result index() {
        if (AuthenticatedUser.isLoggedIn()) {
            return ok(views.html.accountSettings.render(form(AccountForm.class)));
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
        @Constraints.Email(message = "Invalid Email Address!")
        public String email;

        /**
         * Password
         */
        @Constraints.MinLength(value = 8, message = "Password Too Short!")
        public String password;

	    /**
	     * New password
	     */
	    @Constraints.MinLength(value = 8, message = "Password Too Short!")
	    public String newPassword;

	    /**
	     * Confirmed password
	     */
	    @Constraints.MinLength(value = 8, message = "Password Too Short!")
	    public String confirmPassword;

	    /**
	     * First name
	     */
	    @Constraints.MaxLength(value = 30, message = "Name Too Long!")
	    @Constraints.Pattern(value = "\\D*", message = "Name cannot contain numbers!")
	    public String firstName;

	    /**
	     * Surname
	     */
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

        /**
         * Name on card
         */
        @Constraints.MaxLength(value = 30, message = "Name too long!")
        @Constraints.Pattern(value = "\\D*", message = "Name cannot contain numbers!")
        public String cardName;

        /**
         * Card number
         */
        public Integer cardNumber;

        /**
         * PayPal username
         */
        @Constraints.MaxLength(value = 130, message = "Name too long!")
        public String ppUsername;
    }

    public static Result processSettings() {
	    // todo more server side checking
        Form<AccountForm> accountForm = form(AccountForm.class).bindFromRequest();
	    if (accountForm.hasErrors()) {
            return badRequest(views.html.accountSettings.render(accountForm));
        } else {
            AccountForm details = accountForm.get();
		    User user = User.find.where().eq("email", session().get("email")).findUnique();
		    if (!details.email.equals(user.email)) {
			    user.setEmail(details.email);
		    }
		    if (!details.newPassword.equals(user.password)) {
			    user.setPassword(details.newPassword);
		    }
		    if (!details.firstName.equals(user.firstName)) {
			    user.setFirstName(details.firstName);
		    }
		    if (!details.lastName.equals(user.lastName)) {
			    user.setLastName(details.lastName);
		    }
		    if (details.phoneNumber != null) {
			    if (!details.phoneNumber.equals(user.phoneNumber)) {
				    user.setPhoneNumber(details.phoneNumber);
			    }
		    } else {
			    user.setPhoneNumber(null);
		    }
		    if (details.streetAddress != null) {
			    if (!details.streetAddress.equals(user.streetAddress)) {
				    user.setStreetAddress(details.streetAddress);
			    }
		    } else {
			    user.setStreetAddress(null);
		    }
		    if (details.suburb != null) {
			    if (!details.suburb.equals(user.suburb)) {
				    user.setSuburb(details.suburb);
			    }
		    } else {
			    user.setSuburb(null);
		    }
		    //todo country
		    if (details.state != null) {
			    if (!details.state.equals(user.state)) {
				    user.setState(details.state);
			    }
		    } else {
			    user.setState(null);
		    }
		    if (details.postCode != null) {
			    if (!details.postCode.equals(user.postcode)) {
				    user.setPostcode(details.postCode);
			    }
		    } else {
			    user.setPostcode(null);
		    }
		    if (details.paymentMethod != null) {
			    if (!details.paymentMethod.equals(user.paymentMethod)) {
				    user.setPaymentMethod(details.paymentMethod);
			    }
		    } else {
			    user.setCardName(null);
		    }
		    if (details.cardName != null) {
			    if (!details.cardName.equals(user.cardName)) {
				    user.setCardName(details.cardName);
			    }
		    } else {
			    user.setCardName(null);
		    }
		    if (details.cardNumber != null) {
			    if (!details.cardNumber.equals(user.cardNumber)) {
				    user.setCardNumber(details.cardNumber);
			    }
		    } else {
			    user.setCardNumber(null);
		    }
		    if (details.ppUsername != null) {
			    if (!details.ppUsername.equals(user.ppUsername)) {
				    user.setPpUsername(details.ppUsername);
			    }
		    } else {
			    user.setPpUsername(null);
		    }
        }
        return index();
    }
}
