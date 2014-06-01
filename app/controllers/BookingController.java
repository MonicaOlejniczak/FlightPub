package controllers;

import authentication.AuthenticatedUser;
import com.avaje.ebean.Expr;
import models.Luggage;
import models.Payment;
import models.Seat;
import models.User;
import play.data.Form;
import play.data.validation.Constraints;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;
import play.mvc.Security;

import java.util.List;

@Security.Authenticated(AuthenticatedUser.class)
public class BookingController extends Controller {

	public static Result flights() {
		return ok(views.html.flights.render());
	}

    public static Result seatSelection() {
	    List<Seat> seats = Seat.find.all();
        return ok(views.html.seatSelection.render(seats));
    }

    public static Result submitSeats() {
	    return payment();
    }

    public static Result luggage() {
        List<Luggage> luggageTypes = Luggage.find.all();
        return ok(views.html.luggage.render(luggageTypes));
    }

    public static Result submitLuggage() {
        return seatSelection();
    }

    /**
     * Inner static class to specify and validate the fields used in the payment form.
     */
    public static class PaymentForm {
        /**
         * First Name.
         */
        @Constraints.Required(message = "Required Field!")
        @Constraints.MaxLength(value = 30, message = "Name Too Long!")
        @Constraints.Pattern(value = "\\D*", message = "Name cannot contain numbers!")
        public String nameFirst;

        /**
         * Surname.
         */
        @Constraints.Required(message = "Required Field!")
        @Constraints.MaxLength(value = 30, message = "Name Too Long!")
        @Constraints.Pattern(value = "\\D*", message = "Name cannot contain numbers!")
        public String surname;

        /**
         * Street Address.
         */
        @Constraints.Required(message = "Required Field!")
        @Constraints.MaxLength(value = 100, message = "Address too long!")
        public String streetAddress;

        /**
         * Suburb/City.
         */
        @Constraints.Required(message = "Required Field!")
        @Constraints.MaxLength(value = 100, message = "Input too long!")
        @Constraints.Pattern(value = "\\D*", message = "Input must not contain numbers!")
        public String suburbCity;

        /**
         * State.
         */
        @Constraints.Required(message = "Required Field!")
        @Constraints.MaxLength(value = 50, message = "Input too long!")
        @Constraints.Pattern(value = "\\D*", message = "Input must not contain numbers!")
        public String stateIn;

        /**
         * Post code.
         */
        @Constraints.Required(message = "Required Field!")
        public int postCode;

        /**
         * Phone Number.
         */
        @Constraints.Required(message = "Required Field!")
        public int phoneNumber;

        /**
         * Name on card
         */
        @Constraints.MaxLength(value = 30, message = "Name too long!")
        @Constraints.Pattern(value = "\\D*", message = "Name cannot contain numbers!")
        public String mcardName;

        /**
         * Card number
         */
        public int mcardNum;

        /**
         * Card CVV number
         */
        public int mcardCCV;

        /**
         * Card expiry month
         */
        public String mcardExpMonth;

        /**
         * Card expiry year
         */
        public String mcardExpYear;

        /**
         * PayPal username
         */
        @Constraints.MaxLength(value = 130, message = "Name too long!")
        public String pPalUser;

        /**
         * PayPal password
         */
        @Constraints.MinLength(value = 8, message = "Password too short!")
        @Constraints.MaxLength(value = 20, message = "Password too long!")
        public String pPalPass;

    }

    public static Result payment() { 
        return ok(views.html.payment.render(Form.form(PaymentForm.class)));
    }

    public static Result submitPayment() {
        Form<PaymentForm> paymentForm = Form.form(PaymentForm.class).bindFromRequest();
        if (paymentForm.hasErrors()) {
            return badRequest(views.html.payment.render(paymentForm));
        } else {
            PaymentForm details = paymentForm.get();
            AuthenticatedUser loggedUser = new AuthenticatedUser();
            String username = loggedUser.getUsername(Http.Context.current());
            User temp = User.find.where(Expr.eq("email", username)).findUnique();
            Payment payTemp = new Payment(temp, details.nameFirst, details.surname, details.streetAddress, details.suburbCity, details.stateIn, details.postCode, details.phoneNumber);
            if(!(details.mcardName.isEmpty())) {
                payTemp.addCardDetails(details.mcardName, details.mcardNum, details.mcardCCV, details.mcardExpMonth, details.mcardExpYear);
            } else if (!(details.pPalUser.isEmpty())) {
                payTemp.addPPDetails(details.pPalUser, details.pPalPass);
            }
            temp.addPayDetails(payTemp);

        }
        return ok(views.html.home.render());
    }
}
