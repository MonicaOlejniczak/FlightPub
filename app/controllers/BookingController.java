package controllers;

import authentication.AuthenticatedUser;
import models.Flight;
import models.Luggage;
import models.Seat;
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
		@Constraints.Pattern(value = "\\d*", message = "Invalid Booking!")
		public Long bookingId;

		/**
		 * The List of Flight IDs to recommend.
		 */
		@Constraints.Required(message = "No Flights Selected!")
		public List<Long> recommendedFlightIds;
	}

	/**
	 * Inner static class defining the fields involved in the 'Review Recommendations' Form.
	 */
	public static class ReviewRecommendations {
		/**
		 * The ID of the Booking involved involved in the recommendations.
		 */
		@Constraints.Required(message = "No Booking Specified!")
		@Constraints.Pattern(value = "\\d*", message = "Invalid Booking!")
		public Long bookingId;

		/**
		 * The accepted recommended Flight.
		 */
		@Constraints.Required(message = "No Flight Selected!")
		@Constraints.Pattern(value = "\\d*", message = "Invalid Flight!")
		public Long acceptedFlight;
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
			List<Flight> flights = new ArrayList<>();
			flights.add(new Flight(null, "107", null, null, null, new Date(), new Date(), new Date(), new Date(), null, 1, 2));
			flights.add(new Flight(null, "108", null, null, null, new Date(), new Date(), new Date(), new Date(), null, 1, 2));
			flights.add(new Flight(null, "109", null, null, null, new Date(), new Date(), new Date(), new Date(), null, 1, 2));

			// Send the form + flights back to the user
			return ok(views.html.recommendFlights.render(Form.form(RecommendFlights.class).fill(recommendFlights), flights));
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
				List<Flight> flights = new ArrayList<>();
				flights.add(new Flight(null, "107", null, null, null, new Date(), new Date(), new Date(), new Date(), null, 1, 2));
				flights.add(new Flight(null, "108", null, null, null, new Date(), new Date(), new Date(), new Date(), null, 1, 2));
				flights.add(new Flight(null, "109", null, null, null, new Date(), new Date(), new Date(), new Date(), null, 1, 2));

				// Send the form + flights back to the user
				return badRequest(views.html.recommendFlights.render(recommendFlightsForm, flights));
			} else {
				// Otherwise, get the form parameters' values
				RecommendFlights details = recommendFlightsForm.get();

				// Send the message
				// TODO

				// Finally, redirect to...
				// TODO
				return redirect(routes.MainController.home());
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
			List<Flight> flights = new ArrayList<>();
			flights.add(new Flight(null, "107", null, null, null, new Date(), new Date(), new Date(), new Date(), null, 1, 2));
			flights.add(new Flight(null, "108", null, null, null, new Date(), new Date(), new Date(), new Date(), null, 1, 2));
			flights.add(new Flight(null, "109", null, null, null, new Date(), new Date(), new Date(), new Date(), null, 1, 2));

			// Send the form + flights back to the user
			return ok(views.html.reviewRecommendations.render(Form.form(ReviewRecommendations.class).fill(reviewRecommendations), flights));
		} else {
			return forbidden();
		}
	}

	/**
	 * Send Recommendation Response action - validates and sends flight recommendation responses.
	 * @return
	 */
	public static Result sendRecommendationResponse() {
		if (AuthenticatedUser.isLoggedIn()) {
			// Get the request parameters
			Form<ReviewRecommendations> reviewRecommendationsForm = Form.form(ReviewRecommendations.class).bindFromRequest();

			// Do we have errors?
			if (reviewRecommendationsForm.hasErrors()) {
				// If we do, issue a bad-request error

				// TODO: Get some flights to send back
				List<Flight> flights = new ArrayList<>();
				flights.add(new Flight(null, "107", null, null, null, new Date(), new Date(), new Date(), new Date(), null, 1, 2));
				flights.add(new Flight(null, "108", null, null, null, new Date(), new Date(), new Date(), new Date(), null, 1, 2));
				flights.add(new Flight(null, "109", null, null, null, new Date(), new Date(), new Date(), new Date(), null, 1, 2));

				// Send the form + flights back to the user
				return badRequest(views.html.reviewRecommendations.render(reviewRecommendationsForm, flights));
			} else {
				// Otherwise, get the form parameters' values
				ReviewRecommendations details = reviewRecommendationsForm.get();

				// Send the message
				// TODO

				// Finally, redirect to...
				// TODO
				return redirect(routes.MainController.home());
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
