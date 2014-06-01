package controllers;

import authentication.AuthenticatedUser;
import com.avaje.ebean.Expr;
import models.User;
import play.data.Form;
import play.data.validation.Constraints;
import play.mvc.Http;
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
            return ok(views.html.accountSettings.render(Form.form(AccountForm.class)));
		} else {
			return forbidden();
		}
	}

    /**
     * Inner static class to specify and validate the fields used in the payment form.
     */
    public static class AccountForm {
        /**
         * First Name.
         */
        @Constraints.MaxLength(value = 30, message = "Name Too Long!")
        @Constraints.Pattern(value = "\\D*", message = "Name cannot contain numbers!")
        public String accFName;

        /**
         * Surname.
         */
        @Constraints.MaxLength(value = 30, message = "Name Too Long!")
        @Constraints.Pattern(value = "\\D*", message = "Name cannot contain numbers!")
        public String accLName;

        /**
         * Email
         */
        @Constraints.Email(message = "Invalid Email Address!")
        public String accEmail;

        /**
         * Password
         */
        @Constraints.MinLength(value = 8, message = "Password Too Short!")
        public String accPassword;


    }

    public static Result processSettings() {
        Form<AccountForm> accountForm = Form.form(AccountForm.class).bindFromRequest();
        if (accountForm.hasErrors()) {
            return badRequest(views.html.accountSettings.render(accountForm));
        } else {
            AccountForm details = accountForm.get();
            AuthenticatedUser loggedUser = new AuthenticatedUser();
            String username = loggedUser.getUsername(Http.Context.current());
            if(!(details.accFName.isEmpty())) {
                User.find.where(Expr.eq("email", username)).findUnique().updateFName(details.accFName);
            }
            if(!(details.accLName.isEmpty())) {
                User.find.where(Expr.eq("email", username)).findUnique().updateLName(details.accLName);
            }
            if(!(details.accPassword.isEmpty())) {
                User.find.where(Expr.eq("email", username)).findUnique().updatePassword(details.accPassword);
            }
            if(!(details.accEmail.isEmpty())) {
                User.find.where(Expr.eq("email", username)).findUnique().updateEmail(details.accEmail);
            }

        }
        return index();
    }
}
