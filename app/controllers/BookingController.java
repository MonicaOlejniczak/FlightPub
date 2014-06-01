package controllers;

import models.Luggage;
import models.Seat;
import play.data.Form;
import play.data.validation.Constraints;
import play.mvc.Controller;
import play.mvc.Result;

import java.util.List;

public class BookingController extends Controller {

    public static Result seatSelection() {
        List<Seat> seats = Seat.find.all();
        return ok(views.html.seatSelection.render(seats));
    }

    public static Result submitSeats() { return payment(); }

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
        @Constraints.MinLength(value = 4, message = "Post code too short!")
        @Constraints.MaxLength(value = 4, message = "Post code too long!")
        public String postCode;

        /**
         * Phone Number.
         */
        @Constraints.Required(message = "Required Field!")
        @Constraints.MinLength(value = 10, message = "Phone number too short!")
        @Constraints.MaxLength(value = 10, message = "Phone number too long!")
        public String phoneNumber;
    }

    public static Result payment() { return ok(views.html.payment.render(Form.form(PaymentForm.class))); }

    public static Result submitPayment(String destination) { return ok (views.html.home.render()); }

}
