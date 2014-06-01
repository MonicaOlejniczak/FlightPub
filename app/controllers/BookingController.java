package controllers;

import authentication.AuthenticatedUser;
import com.avaje.ebean.Expr;
import models.*;
import play.data.Form;
import play.data.validation.Constraints;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Controller responsible for handling all aspects of the FlightPub booking process.
 * @author Chris Emery, Trey Brisbane
 */
@Security.Authenticated(AuthenticatedUser.class)
public class BookingController extends Controller {
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
			// TODO: Get our list of bookings for the user
			User testUser = User.find.where(Expr.eq("email", "test@test.com")).findUnique();
			List<Booking> bookings = new ArrayList<>();
			bookings.add(new Booking(Booking.Status.PENDING, testUser, null, new Date()));
			bookings.add(new Booking(Booking.Status.AWAITING_RECOMMENDATION_RESPONSE, testUser, null, new Date()));
			bookings.add(new Booking(Booking.Status.AWAITING_CONFIRMATION, testUser, null, new Date()));
			bookings.add(new Booking(Booking.Status.COMPLETED, testUser, null, new Date()));
			for (int i = 0; i < bookings.size(); i++) {
				bookings.get(i).id = (long)i;
			}

			// Send the form back to the user
			return ok(views.html.bookings.render(bookings));
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
			// TODO: Get our list of booking requests
			User testUser = User.find.where(Expr.eq("email", "test@test.com")).findUnique();
			List<Booking> bookings = new ArrayList<>();
			bookings.add(new Booking(Booking.Status.PENDING, testUser, null, new Date()));
			bookings.add(new Booking(Booking.Status.AWAITING_CONFIRMATION, testUser, null, new Date()));
			bookings.add(new Booking(Booking.Status.AWAITING_CONFIRMATION, testUser, null, new Date()));
			bookings.add(new Booking(Booking.Status.PENDING, testUser, null, new Date()));
			for (int i = 0; i < bookings.size(); i++) {
				bookings.get(i).id = (long)i;
			}

			// Send the form back to the user
			return ok(views.html.bookingRequests.render(bookings));
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
		if (AuthenticatedUser.isLoggedIn()) {
			// Pass through the booking ID to the Form
			RecommendFlights recommendFlights = new RecommendFlights();
			recommendFlights.bookingId = bookingId;

			// TODO: Get some flights to send back
			List<Itinerary> its = new ArrayList<>();
			List<Flight> flights = new ArrayList<>();
			Flight f1 = new Flight(null, "107", null, null, null, new Date(), new Date(), new Date(), new Date(), null, 1, 2);
			f1.id = (long)1;
			Flight f2 = new Flight(null, "108", null, null, null, new Date(), new Date(), new Date(), new Date(), null, 1, 2);
			f2.id = (long)2;
			Flight f3 = new Flight(null, "109", null, null, null, new Date(), new Date(), new Date(), new Date(), null, 1, 2);
			f3.id = (long)3;
			flights.add(f1);
			flights.add(f2);
			flights.add(f3);
			Itinerary i1 = new Itinerary(flights);
			i1.id = (long)1;
			Itinerary i2 = new Itinerary(flights);
			i2.id = (long)2;
			Itinerary i3 = new Itinerary(flights);
			i3.id = (long)3;
			its.add(i1);
			its.add(i2);
			its.add(i3);

			// Send the form + flights back to the user
			return ok(views.html.recommendFlights.render(Form.form(RecommendFlights.class).fill(recommendFlights), its));
		} else {
			return forbidden();
		}
	}

	/**
	 * Send Recommendations action - validates and sends flight recommendations.
	 * @return
	 */
	public static Result sendRecommendations() {
		if (AuthenticatedUser.isLoggedIn()) {
			// Get the request parameters
			Form<RecommendFlights> recommendFlightsForm = Form.form(RecommendFlights.class).bindFromRequest();

			// Do we have errors?
			if (recommendFlightsForm.hasErrors()) {
				// If we do, issue a bad-request error

				// TODO: Get some flights to send back
				List<Itinerary> its = new ArrayList<>();
				List<Flight> flights = new ArrayList<>();
				Flight f1 = new Flight(null, "107", null, null, null, new Date(), new Date(), new Date(), new Date(), null, 1, 2);
				f1.id = (long)1;
				Flight f2 = new Flight(null, "108", null, null, null, new Date(), new Date(), new Date(), new Date(), null, 1, 2);
				f2.id = (long)2;
				Flight f3 = new Flight(null, "109", null, null, null, new Date(), new Date(), new Date(), new Date(), null, 1, 2);
				f3.id = (long)3;
				flights.add(f1);
				flights.add(f2);
				flights.add(f3);
				Itinerary i1 = new Itinerary(flights);
				i1.id = (long)1;
				Itinerary i2 = new Itinerary(flights);
				i2.id = (long)2;
				Itinerary i3 = new Itinerary(flights);
				i3.id = (long)3;
				its.add(i1);
				its.add(i2);
				its.add(i3);

				// Send the form + flights back to the user
				return badRequest(views.html.recommendFlights.render(recommendFlightsForm, its));
			} else {
				// Otherwise, get the form parameters' values
				RecommendFlights details = recommendFlightsForm.get();

				// Send the message
				// TODO

				// Finally, redirect to the booking requests page
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

			// TODO: Get some flights to send back
			List<Itinerary> its = new ArrayList<>();
			List<Flight> flights = new ArrayList<>();
			Flight f1 = new Flight(null, "107", null, null, null, new Date(), new Date(), new Date(), new Date(), null, 1, 2);
			f1.id = (long)1;
			Flight f2 = new Flight(null, "108", null, null, null, new Date(), new Date(), new Date(), new Date(), null, 1, 2);
			f2.id = (long)2;
			Flight f3 = new Flight(null, "109", null, null, null, new Date(), new Date(), new Date(), new Date(), null, 1, 2);
			f3.id = (long)3;
			flights.add(f1);
			flights.add(f2);
			flights.add(f3);
			Itinerary i1 = new Itinerary(flights);
			i1.id = (long)1;
			Itinerary i2 = new Itinerary(flights);
			i2.id = (long)2;
			Itinerary i3 = new Itinerary(flights);
			i3.id = (long)3;
			its.add(i1);
			its.add(i2);
			its.add(i3);

			// Send the form + flights back to the user
			return ok(views.html.reviewRecommendations.render(Form.form(ReviewRecommendations.class).fill(reviewRecommendations), its));
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

				// TODO: Get some flights to send back
				List<Itinerary> its = new ArrayList<>();
				List<Flight> flights = new ArrayList<>();
				Flight f1 = new Flight(null, "107", null, null, null, new Date(), new Date(), new Date(), new Date(), null, 1, 2);
				f1.id = (long)1;
				Flight f2 = new Flight(null, "108", null, null, null, new Date(), new Date(), new Date(), new Date(), null, 1, 2);
				f2.id = (long)2;
				Flight f3 = new Flight(null, "109", null, null, null, new Date(), new Date(), new Date(), new Date(), null, 1, 2);
				f3.id = (long)3;
				flights.add(f1);
				flights.add(f2);
				flights.add(f3);
				Itinerary i1 = new Itinerary(flights);
				i1.id = (long)1;
				Itinerary i2 = new Itinerary(flights);
				i2.id = (long)2;
				Itinerary i3 = new Itinerary(flights);
				i3.id = (long)3;
				its.add(i1);
				its.add(i2);
				its.add(i3);

				// Send the form + flights back to the user
				return badRequest(views.html.reviewRecommendations.render(reviewRecommendationsForm, its));
			} else {
				// Otherwise, get the form parameters' values
				ReviewRecommendations details = reviewRecommendationsForm.get();

				// Send the message
				// TODO

				// Finally, redirect to bookings page
				return redirect(routes.BookingController.bookings());
			}
		} else {
			return forbidden();
		}
	}

    public static Result seatSelection() {
        List<Seat> seats = Seat.find.all();
        return ok(views.html.seatSelection.render(seats));
    }

    public static Result luggage() {
        List<Luggage> luggageTypes = Luggage.find.all();
        return ok(views.html.luggage.render(luggageTypes));
    }
}
