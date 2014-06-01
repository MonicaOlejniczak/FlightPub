package controllers;

import authentication.AuthenticatedUser;
import com.avaje.ebean.Expr;
import models.*;
import play.data.Form;
import play.data.validation.Constraints;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;
import play.mvc.Security;
import views.html.bookingRequests;

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
			User testUser = User.find.where(Expr.eq("email", "test@test.com")).findUnique();
			List<Booking> bookings = new ArrayList<>();
			bookings.add(new Booking(Booking.Status.PENDING, testUser, null, new Date()));
			bookings.add(new Booking(Booking.Status.AWAITING_RECOMMENDATION_RESPONSE, testUser, i1, new Date()));
			bookings.add(new Booking(Booking.Status.AWAITING_CONFIRMATION, testUser, null, new Date()));
			bookings.add(new Booking(Booking.Status.COMPLETED, testUser, null, new Date()));
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
			bookings2.add(new Booking(Booking.Status.PENDING, testUser, null, new Date()));
			bookings2.add(new Booking(Booking.Status.AWAITING_CONFIRMATION, testUser, null, new Date()));
			bookings2.add(new Booking(Booking.Status.AWAITING_CONFIRMATION, testUser, null, new Date()));
			bookings2.add(new Booking(Booking.Status.PENDING, testUser, null, new Date()));
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
	 * @return A redirect back to the Booking Requests page, or forbidden if no User is logged in.
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

				// First, pull down the itineraries specified by the list of IDs we received from the form
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

    public static Result seatSelection() {
        List<Seat> seats = Seat.find.all();
        return ok(views.html.seatSelection.render(seats));
    }

    public static Result luggage() {
        List<Luggage> luggageTypes = Luggage.find.all();
        return ok(views.html.luggage.render(luggageTypes));
    }
}
