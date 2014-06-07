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
         * Phone number
         */
        public Integer phone;

        /**
         * Preferred payment method
         */
        public String payment;

        /**
         * Name on card
         */
        @Constraints.MaxLength(value = 30, message = "Name too long!")
        @Constraints.Pattern(value = "\\D*", message = "Name cannot contain numbers!")
        public String cardName;

        /**
         * Card number
         */
        public int cardNumber;

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
            if (!details.firstName.equals(user.firstName)) {
                user.setFirstName(details.firstName);
            }
		    if (!details.lastName.equals(user.lastName)) {
			    user.setLastName(details.lastName);
		    }
		    if (!details.email.equals(user.email)) {
			    user.setEmail(details.email);
		    }
		    if (!details.newPassword.equals(user.password)) {
			    user.setPassword(details.newPassword);
		    }
		    /*

            if(!(details.accEmail.isEmpty())) {
                User.find.where(Expr.eq("email", username)).findUnique().updateEmail(details.accEmail);
            }
            if(details.accPhone > 0) {
                User.find.where(Expr.eq("email", username)).findUnique().updatePhone(details.accPhone);
            }
            if(!(details.accStreetAddress.isEmpty())) {
                User.find.where(Expr.eq("email", username)).findUnique().updateAddress(details.accStreetAddress);
            }
            if(!(details.accSuburb.isEmpty())) {
                User.find.where(Expr.eq("email", username)).findUnique().updateSuburb(details.accSuburb);
            }
            if(!(details.accState.isEmpty())) {
                User.find.where(Expr.eq("email", username)).findUnique().updateState(details.accState);
            }
            if(details.accPCode > 0) {
                User.find.where(Expr.eq("email", username)).findUnique().updatePCode(details.accPCode);
            }
            if(!(details.accPay.isEmpty())) {
                User.find.where(Expr.eq("email", username)).findUnique().updatePay(details.accPay);
            }
            if(!(details.accCardName.isEmpty())) {
                User.find.where(Expr.eq("email", username)).findUnique().updateCName(details.accCardName);
            }
            if(details.accCardNum > 0) {
                User.find.where(Expr.eq("email", username)).findUnique().updateCNum(details.accCardNum);
            }
            if(!(details.accPPUsername.isEmpty())) {
                User.find.where(Expr.eq("email", username)).findUnique().updatePPUser(details.accPPUsername);
            }*/
        }
        return index();
    }
}
