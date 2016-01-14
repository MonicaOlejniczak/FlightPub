package controllers;

import authentication.AuthenticatedUser;
import com.avaje.ebean.Expr;
import com.fasterxml.jackson.databind.JsonNode;
import models.*;
import org.joda.time.DateTime;
import play.api.libs.json.JsValue;
import play.data.Form;
import play.data.validation.Constraints;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;
import play.mvc.Security;
import util.algorithm.FlightFinder;

import java.util.ArrayList;
import java.util.List;

/**
 * Controller responsible for handling all aspects of the FlightPub booking process.
 * @author Chris Emery, Trey Brisbane
 */
@Security.Authenticated(AuthenticatedUser.class)
public class BookingController extends Controller {
	/**
	 * Inner static class to facilitate the cancellation of a Booking via POST, as opposed to GET.
	 */
	public static class CancelBooking {
		/**
		 * The ID of the Booking to cancel.
		 */
		@Constraints.Required(message = "No Booking Specified!")
		public Long bookingId;
	}

	/**
	 * Inner static class to facilitate the completion of a Booking via POST, as opposed to GET.
	 */
	public static class CompleteBooking {
		/**
		 * The ID of the Booking to complete.
		 */
		@Constraints.Required(message = "No Booking Specified!")
		public Long bookingId;
	}

	/**
	 * Inner static class defining the fields involved in the 'Recommend Flights' Form.
	 */
	public static class RecommendFlights {
		/**
		 * The ID of the Booking involved involved in the recommendations.
		 */
		@Constraints.Required(message = "No Booking Specified!")
		public Long bookingId;

		/**
		 * The List of Itinerary IDs to recommend.
		 */
		@Constraints.Required(message = "No Flights Selected!")
		public List<Long> recommendedItineraryIds;
	}

	/**
	 * Bookings action - displays a List of a User's past and present Bookings, along with information about their
	 * status in the Booking process.
	 * @return A List of a User's past and present Bookings, or forbidden if no User is logged in.
	 */
	public static Result bookings() {
		if (AuthenticatedUser.isLoggedIn()) {
			// First, get the currently logged-in user
			AuthenticatedUser authedUser = new AuthenticatedUser();

			// Pull in the user from the database, joining with them their bookings and their bookings' itinerary
			User user = User.find.where(Expr.eq("email", authedUser.getUsername(Http.Context.current()))).fetch("bookings").fetch("bookings.itinerary").findUnique();

			// Testing code
			List<Flight> flights = new ArrayList<>();
			Flight f1 = new Flight(null, "107", null, null, new DateTime(), new DateTime(), null, 1);
			f1.id = (long)1;
			Flight f2 = new Flight(null, "108", null, null, new DateTime(), new DateTime(), null, 1);
			f2.id = (long)2;
			Flight f3 = new Flight(null, "109", null, null, new DateTime(), new DateTime(), null, 1);
			f3.id = (long)3;
			flights.add(f1);
			flights.add(f2);
			flights.add(f3);
			Itinerary i1 = new Itinerary(flights);
			i1.id = (long)1;
			User testUser = User.find.where(Expr.eq("email", "test@test.com")).findUnique();
			List<Booking> bookings = new ArrayList<>();
			bookings.add(new Booking(Booking.Status.PENDING, testUser, null, null));
			bookings.add(new Booking(Booking.Status.AWAITING_RECOMMENDATION_RESPONSE, testUser, i1, null));
			bookings.add(new Booking(Booking.Status.AWAITING_CONFIRMATION, testUser, null, null));
			bookings.add(new Booking(Booking.Status.COMPLETED, testUser, null, null));
			for (int i = 0; i < bookings.size(); i++) {
				bookings.get(i).id = (long)i;
			}

			// Choose result
			List<Booking> result;
			if (user == null || user.bookings == null || user.bookings.size() == 0) {
				result = bookings;
			} else {
				result = user.bookings;
			}

			// Send the form back to the user
			return ok();
			//return ok(views.html.bookings.render(result, Form.form(CancelBooking.class), Form.form(ReviewRecommendations.class)));
		} else {
			return forbidden();
		}
	}

	/**
	 * Booking Requests action - displays a List of currently pending Booking Requests, sent in by Users.
	 * @return A List of currently pending Booking Requests.
	 */
	public static Result bookingRequests() {
		if (AuthenticatedUser.isLoggedIn()) {
			// Pull down all bookings from the database that have a status of either PENDING or AWAITING_CONFIRMATION, along with their itineraries and by extension, full flight listings
			List<Booking> bookings = Booking.find.where(Expr.or(Expr.eq("status", Booking.Status.PENDING.ordinal()), Expr.eq("status", Booking.Status.AWAITING_CONFIRMATION.ordinal()))).fetch("itinerary").fetch("itinerary.flights").findList();

			// Testing code
			User testUser = User.find.where(Expr.eq("email", "test@test.com")).findUnique();
			List<Booking> bookings2 = new ArrayList<>();
			bookings2.add(new Booking(Booking.Status.PENDING, testUser, null, null));
			bookings2.add(new Booking(Booking.Status.AWAITING_CONFIRMATION, testUser, null, null));
			bookings2.add(new Booking(Booking.Status.AWAITING_CONFIRMATION, testUser, null, null));
			bookings2.add(new Booking(Booking.Status.PENDING, testUser, null, null));
			for (int i = 0; i < bookings2.size(); i++) {
				bookings2.get(i).id = (long)i;
			}

			// Choose result
			List<Booking> result;
			if (bookings == null || bookings.size() == 0) {
				result = bookings2;
			} else {
				result = bookings;
			}

			// Send the form back to the user
			return ok();
			//return ok(views.html.bookingRequests.render(result, Form.form(CompleteBooking.class)));
		} else {
			return forbidden();
		}
	}

	/**
	 * Cancel action - cancels the Booking specified by POST.
	 * @return A redirect to the Booking Requests page, or forbidden if a User is not logged in.
	 */
	public static Result cancel() {
		if (AuthenticatedUser.isLoggedIn()) {
			// Get the request parameters
			Form<CancelBooking> cancelBookingForm = Form.form(CancelBooking.class).bindFromRequest();

			// Do we have errors?
			if (cancelBookingForm.hasErrors()) {
				// If we do, issue a bad-request error

				// First, get the currently logged-in user
				AuthenticatedUser authedUser = new AuthenticatedUser();

				// Pull in the user from the database, joining with them their bookings and their bookings' itinerary
				User user = User.find.where(Expr.eq("email", authedUser.getUsername(Http.Context.current()))).fetch("bookings").fetch("bookings.itinerary").findUnique();

				return badRequest();
				//return badRequest(views.html.bookings.render(user.bookings, Form.form(CancelBooking.class), Form.form(ReviewRecommendations.class)));
			} else {
				// Otherwise, get the form parameters' values
				CancelBooking details = cancelBookingForm.get();

				// Now get the specified booking
				Booking booking = Booking.find.where(Expr.eq("id", details.bookingId)).findUnique();

				// Finally, update its status flag
				booking.status = Booking.Status.CANCELLED;
				booking.update();

				// Once done, redirect to the booking requests page
				return redirect(controllers.routes.BookingController.bookings());
			}
		} else {
			return forbidden();
		}
	}

	/**
	 * Complete action - comfirms and completes the Booking specified by POST.
	 * @return A redirect to the Booking Requests page, or forbidden if a User is not logged in.
	 */
	public static Result complete() {
		if (AuthenticatedUser.isLoggedIn()) {
			// Get the request parameters
			Form<CompleteBooking> completeBookingForm = Form.form(CompleteBooking.class).bindFromRequest();

			// Do we have errors?
			if (completeBookingForm.hasErrors()) {
				// If we do, issue a bad-request error

				// Pull down all bookings from the database that have a status of either PENDING or AWAITING_CONFIRMATION, along with their itineraries and by extension, full flight listings
				List<Booking> bookings = Booking.find.where(Expr.or(Expr.eq("status", Booking.Status.PENDING.ordinal()), Expr.eq("status", Booking.Status.AWAITING_CONFIRMATION.ordinal()))).fetch("itinerary").fetch("itinerary.flights").findList();

				return badRequest();
				//return badRequest(bookingRequests.render(bookings, Form.form(CompleteBooking.class)));
			} else {
				// Otherwise, get the form parameters' values
				CompleteBooking details = completeBookingForm.get();

				// Now get the specified booking
				Booking booking = Booking.find.where(Expr.eq("id", details.bookingId)).findUnique();

				// Finally, update its status flag
				booking.status = Booking.Status.COMPLETED;
				booking.update();

				// Once done, redirect to the booking requests page
				return redirect(routes.BookingController.bookingRequests());
			}
		} else {
			return forbidden();
		}
	}

    /**
     * Inner static class to specify and validate the fields used in the payment form.
     */
    public static class PaymentForm {

	    /**
	     * List of flight ids
	     */
	    public String params;

	    /**
         * First Name
         */
        @Constraints.Required(message = "Required Field!")
        @Constraints.MaxLength(value = 30, message = "Name Too Long!")
        @Constraints.Pattern(value = "\\D*", message = "Name cannot contain numbers!")
        public String firstName;

        /**
         * Last Name
         */
        @Constraints.Required(message = "Required Field!")
        @Constraints.MaxLength(value = 30, message = "Name Too Long!")
        @Constraints.Pattern(value = "\\D*", message = "Name cannot contain numbers!")
        public String lastName;

	    /**
	     * Phone Number
	     */
	    @Constraints.Required(message = "Required Field!")
	    public Integer phoneNumber;

        /**
         * Street Address
         */
        @Constraints.Required(message = "Required Field!")
        @Constraints.MaxLength(value = 100, message = "Address too long!")
        public String streetAddress;

        /**
         * Suburb
         */
        @Constraints.Required(message = "Required Field!")
        @Constraints.MaxLength(value = 100, message = "Input too long!")
        @Constraints.Pattern(value = "\\D*", message = "Input must not contain numbers!")
        public String suburb;

        /**
         * State
         */
        @Constraints.Required(message = "Required Field!")
        @Constraints.MaxLength(value = 50, message = "Input too long!")
        @Constraints.Pattern(value = "\\D*", message = "Input must not contain numbers!")
        public String state;

        /**
         * Post code
         */
        @Constraints.Required(message = "Required Field!")
        public Integer postcode;

	    /**
	     * Preferred payment method
	     */
	    @Constraints.Required(message = "Required Field!")
	    public String paymentMethod;
    }

    public static Result processBooking() {
        // TODO: validate data!
        User user = User.find.where().eq("email", session().get("email")).findUnique();
	    JsonNode jData = request().body().asJson();
        JsonNode jPayment = jData.get("payment");

        Itinerary itinerary = new Itinerary();
        for (JsonNode jFlightId : jData.get("itinerary")) {
            itinerary.flights.add(Flight.find.byId(jFlightId.asLong()));
        }

        Payment payment = new Payment(jPayment.get("paymentMethod").asText());

        itinerary.save();
        Booking booking = new Booking(user, itinerary, payment);
        booking.save();

        for (JsonNode passenger : jData.get("passengers")) {
            Luggage.LuggageType luggageType = Luggage.getLuggageType(passenger.get("luggageType").asText());
            String ticketType = passenger.get("ticketType").asText();

            double weight = 0; // TODO: =(
            Luggage luggage = new Luggage(luggageType, weight);
            Person person = new Person(passenger.get("firstName").asText(), passenger.get("lastName").asText());
            person.save();

            for (JsonNode flightInfo : passenger.get("flights")) {
                Flight flight = Flight.find.byId(flightInfo.get("flightId").asLong());
                JsonNode seatNode = flightInfo.get("seat");
                int row = seatNode.get("row").asInt();
                int column = seatNode.get("column").asInt();
                Seat seat = new Seat(row, column);
                Ticket ticket = new Ticket(
                       person,
                       PassengerType.find.where().eq("typeOfPassenger", PassengerType.TypeOfPassenger.ADULT).findUnique(), // TODO: fix?
                       DateTime.now(),
                       flight,
                       booking,
                       TicketType.find.where().eq("code", ticketType).findUnique(),
                       TicketClass.find.where().eq("code", "ECO").findUnique(), // TODO: fix?!?!
                       luggage,
                       seat
                       );
                ticket.save();
            }
        }

        user.lastPayment = payment;
        user.bookings.add(booking);
        user.save();
        return ok();
    }
}
