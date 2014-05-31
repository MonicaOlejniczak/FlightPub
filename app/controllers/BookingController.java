package controllers;

import models.Luggage;
import models.Seat;
import models.User;
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

    public static Result luggage() {
        List<Luggage> luggageTypes = Luggage.find.all();
        return ok(views.html.luggage.render(luggageTypes));
    }

    /**
     * Inner static class to specify and validate the fields used in the payment form.
     */
    public static class PaymentForm {
        /**
         * First Name.
         */
        @Constraints.Required(message = "Required Field!")
        public String nameFirst;

        /**
         * Surname.
         */
        @Constraints.Required(message = "Required Field!")
        public String surname;

        /**
         * Street Address.
         */
        @Constraints.Required(message = "Required Field!")
        public String streetAddress;

        /**
         * Suburb/City.
         */
        @Constraints.Required(message = "Required Field!")
        public String suburbCity;

        /**
         * State.
         */
        @Constraints.Required(message = "Required Field!")
        public String stateIn;

        /**
         * Post code.
         */
        @Constraints.Required(message = "Required Field!")
        public String postCode;

        /**
         * Phone Number.
         */
        @Constraints.Required(message = "Required Field!")
        public String phoneNumber;
    }

    public static Result payment() { return ok(views.html.payment.render(Form.form(PaymentForm.class))); }

    public static Result submitPayment(String destination) { return ok (views.html.home.render()); }

}
