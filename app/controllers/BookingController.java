package controllers;

import authentication.AuthenticatedUser;
import com.avaje.ebean.Expr;
import models.*;
import org.joda.time.DateTime;
import play.data.Form;
import play.data.validation.Constraints;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;
import play.mvc.Security;
import util.algorithm.FlightFinder;
import views.html.bookingRequests;

import java.util.*;

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
	 * Inner static class defining the fields involved in the 'Review Recommendations' Form.
	 */
	public static class ReviewRecommendations {
		/**
		 * The ID of the Booking involved involved in the recommendations.
		 */
		@Constraints.Required(message = "No Booking Specified!")
		public Long bookingId;

		/**
		 * The accepted recommended Itinerary.
		 */
		@Constraints.Required(message = "No Flight Selected!")
		public Long acceptedItinerary;
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
			return ok(views.html.bookings.render(result, Form.form(CancelBooking.class), Form.form(ReviewRecommendations.class)));
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
			return ok(views.html.bookingRequests.render(result, Form.form(CompleteBooking.class)));
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

				return badRequest(views.html.bookings.render(user.bookings, Form.form(CancelBooking.class), Form.form(ReviewRecommendations.class)));
			} else {
				// Otherwise, get the form parameters' values
				CancelBooking details = cancelBookingForm.get();

				// Now get the specified booking
				Booking booking = Booking.find.where(Expr.eq("id", details.bookingId)).findUnique();

				// Finally, update its status flag
				booking.status = Booking.Status.CANCELLED;
				booking.update();

				// Once done, redirect to the booking requests page
				return redirect(routes.BookingController.bookings());
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

				return badRequest(bookingRequests.render(bookings, Form.form(CompleteBooking.class)));
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
	 * Recommend Flights action - displays the 'Recommend Flights' form.
	 * @param bookingId The ID of the Booking involved in the recommendation.
	 * @return The 'Recommend Flights' form.
	 */
	public static Result recommendFlights(Long bookingId) {
		if (AuthenticatedUser.isLoggedIn() && User.find.where(Expr.eq("email", new AuthenticatedUser().getUsername(Http.Context.current()))).findUnique().userType.equals("travel")) {
			// Pass through the booking ID to the Form
			RecommendFlights recommendFlights = new RecommendFlights();
			recommendFlights.bookingId = bookingId;

			// Get the details of the booking
			Booking booking = Booking.find.where(Expr.eq("id", bookingId)).fetch("itinerary").fetch("itinerary.flights").findUnique();
			Flight source = booking.itinerary.flights.get(0);
			Flight destination = booking.itinerary.flights.get(booking.itinerary.flights.size() - 1);

			// Get a list of itineraries
			List<Itinerary> recommendations = FlightFinder.findFlights(source.source, destination.destination, new DateTime(booking.date), new DateTime(booking.date).plusDays(5), FlightFinder.DEFAULT_SEARCH_DEPTH);

			// Send the form + flights back to the user
			return ok(views.html.recommendFlights.render(Form.form(RecommendFlights.class).fill(recommendFlights), recommendations.subList(0, 5)));
		} else {
			return forbidden();
		}
	}

	/**
	 * Send Recommendations action - validates and sends flight recommendations.
	 * @return A redirect back to the Booking Requests page, or forbidden if no User is logged in.
	 */
	public static Result sendRecommendations() {
		if (AuthenticatedUser.isLoggedIn() && User.find.where(Expr.eq("email", new AuthenticatedUser().getUsername(Http.Context.current()))).findUnique().userType.equals("travel")) {
			// Get the request parameters
			Form<RecommendFlights> recommendFlightsForm = Form.form(RecommendFlights.class).bindFromRequest();

			// Do we have errors?
			if (recommendFlightsForm.hasErrors()) {
				// If we do, issue a bad-request error

				// Get the details of the booking
				Booking booking = Booking.find.where(Expr.eq("id", recommendFlightsForm.get().bookingId)).fetch("itinerary").fetch("itinerary.flights").findUnique();
				Flight source = booking.itinerary.flights.get(0);
				Flight destination = booking.itinerary.flights.get(booking.itinerary.flights.size() - 1);

				// Get a list of itineraries
				List<Itinerary> recommendations = FlightFinder.findFlights(source.source, destination.destination, new DateTime(booking.date), new DateTime(booking.date).plusDays(5), FlightFinder.DEFAULT_SEARCH_DEPTH);

				// Send the form + flights back to the user
				return badRequest(views.html.recommendFlights.render(recommendFlightsForm, recommendations.subList(0, 5)));
			} else {
				// Otherwise, get the form parameters' values
				RecommendFlights details = recommendFlightsForm.get();

				// First, pull down the itineraries specified by the list of IDs we received from the form
				// TODO: This don't actually exist. Need to AJAX stuff then actually persist them in Booking.recommendations
				List<Itinerary> itineraries = Itinerary.find.where(Expr.in("id", details.recommendedItineraryIds)).findList();

				// Now get the specified booking, along with any existing recommendations
				Booking booking = Booking.find.where(Expr.eq("id", details.bookingId)).fetch("recommendations").findUnique();

				// Finally, add the itineraries as recommendations to the booking, and update its status flag
				booking.recommendations.addAll(itineraries);
				booking.status = Booking.Status.AWAITING_RECOMMENDATION_RESPONSE;
				booking.update();

				// Once done, redirect to the booking requests page
				return redirect(routes.BookingController.bookingRequests());
			}
		} else {
			return forbidden();
		}
	}

	/**
	 * Review Recommendations action - displays the 'Review Recommendations' form.
	 * @param bookingId The ID of the Booking involved in the recommendation.
	 * @return The 'Review Recommendations' form.
	 */
	public static Result reviewRecommendations(Long bookingId) {
		if (AuthenticatedUser.isLoggedIn()) {
			// Pass through the booking ID to the Form
			ReviewRecommendations reviewRecommendations = new ReviewRecommendations();
			reviewRecommendations.bookingId = bookingId;

			// Get the details of the booking
			Booking booking = Booking.find.where(Expr.eq("id", bookingId)).fetch("recommendations").findUnique();

			// Send the form + flights back to the user
			return ok(views.html.reviewRecommendations.render(Form.form(ReviewRecommendations.class).fill(reviewRecommendations), booking.recommendations));
		} else {
			return forbidden();
		}
	}

	/**
	 * Send Recommendation Response action - validates and sends flight recommendation responses.
	 * @return A redirect back to the Bookings action.
	 */
	public static Result sendRecommendationResponse() {
		if (AuthenticatedUser.isLoggedIn()) {
			// Get the request parameters
			Form<ReviewRecommendations> reviewRecommendationsForm = Form.form(ReviewRecommendations.class).bindFromRequest();

			// Do we have errors?
			if (reviewRecommendationsForm.hasErrors()) {
				// If we do, issue a bad-request error

				// Get the details of the booking
				Booking booking = Booking.find.where(Expr.eq("id", reviewRecommendationsForm.get().bookingId)).fetch("recommendations").findUnique();

				// Send the form + flights back to the user
				return badRequest(views.html.reviewRecommendations.render(reviewRecommendationsForm, booking.recommendations));
			} else {
				// Otherwise, get the form parameters' values
				ReviewRecommendations details = reviewRecommendationsForm.get();

				// First, pull down the specified itinerary
				Itinerary itinerary = Itinerary.find.where(Expr.eq("id", details.acceptedItinerary)).findUnique();

				// Now get the specified booking
				Booking booking = Booking.find.where(Expr.eq("id", details.bookingId)).findUnique();

				// Finally, swap out the booking's current itinerary for the specified one, and update its status flag
				booking.itinerary = itinerary;
				booking.status = Booking.Status.AWAITING_CONFIRMATION;
				booking.update();

				// Finally, redirect to bookings page
				return redirect(routes.BookingController.bookings());
			}
		} else {
			return forbidden();
		}
	}

	public static Result flights() {
		return ok(views.html.flights.render());
	}

    public static Result seatSelection() {
	    List<Seat> seats = Seat.find.all();
        String params = request().body().asFormUrlEncoded().get("params")[0];
        return ok(views.html.seatSelection.render(seats, params));
    }

    public static Result submitSeats() {
	    return payment();
    }

    public static Result tickets() {
        String params = request().body().asFormUrlEncoded().get("params")[0];
        return ok(views.html.tickets.render(params));
    }

    public static Result submitLuggage() {
        return seatSelection();
    }

    /**
     * Inner static class to specify and validate the fields used in the payment form.
     */
    public static class PaymentForm {
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
         * Name on card
         */
        /*@Constraints.MaxLength(value = 30, message = "Name too long!")
        @Constraints.Pattern(value = "\\D*", message = "Name cannot contain numbers!")
        public String mcardName;

        /**
         * Card number
         */
        /*public int mcardNum;

        /**
         * Card CVV number
         */
        /*public int mcardCCV;

        /**
         * Card expiry month
         */
        /*public String mcardExpMonth;

        /**
         * Card expiry year
         */
        /*public String mcardExpYear;

        /**
         * PayPal username
         */
        @Constraints.MaxLength(value = 130, message = "Name too long!")
        public String ppUsername;

        /**
         * PayPal password
         */
        /*@Constraints.MinLength(value = 8, message = "Password too short!")
        @Constraints.MaxLength(value = 20, message = "Password too long!")
        public String pPalPass;*/

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
	        User user = User.find.where().eq("email", session().get("email")).findUnique();
            Payment payment = new Payment(details.paymentMethod, details.cardName, details.cardNumber, null, null, null, details.ppUsername, null);
	        Booking booking = new Booking(user, null, payment);
	        user.lastPayment = payment;
	        user.bookings.add(booking);
	        user.save();
        }
        return ok(views.html.home.render());
    }
}
