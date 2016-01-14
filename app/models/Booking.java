package models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import play.data.format.Formats;
import play.data.validation.Constraints;
import play.db.ebean.Model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class Booking extends Model {
	/**
	 * Defines an enumeration for the current status of the booking
	 */
	public enum Status {
		/**
		 * User has issued a Booking request, and it has yet to be seen by a travel agent.
		 */
		PENDING,
		/**
		 * Travel agent has sent recommendations back to the User.
		 */
		AWAITING_RECOMMENDATION_RESPONSE,
		/**
		 * User has finalized their Booking, and is waiting for confirmation from the travel agent.
		 */
		AWAITING_CONFIRMATION,
		/**
		 * Travel agent has confirmed the Booking and the process is complete.
		 */
		COMPLETED,
		/**
		 * User has cancelled this Booking before it was completed.
		 */
		CANCELLED
	}

	/**
	 * Uniquely identifies the booking
	 */
	@Id
	public Long id;

	/**
	 * The current status of the booking
	 */
	@Enumerated(EnumType.ORDINAL)
	@Constraints.Required
	public Status status;

	/**
	 * The user that requested the booking
	 * A user is able to book for others
	 */
	@Constraints.Required
	@ManyToOne(cascade = CascadeType.ALL)
	public User user;

	/**
	 * The Itinerary that is linked to this Booking.
	 */
	@Constraints.Required
	@ManyToOne(cascade = CascadeType.ALL)
	public Itinerary itinerary;

	/**
	 * The payment used for the booking
	 */
	@Constraints.Required
	@ManyToOne(cascade = CascadeType.ALL)
	public Payment payment;

	/**
	 * The List of alternate possible Itineraries recommended by a travel agent during the booking process.
	 */
	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	public List<Itinerary> recommendations;

	/**
	 * The date that the booking was made
	 */
	@Constraints.Required
	@Formats.DateTime(pattern="yyyy-MM-dd HH:mm:ss")
	public Date date;

	/**
	 * A reverse mapping of the list of tickets requested by the user
	 * This enables the user to book for others
	 */
    @JsonIgnore
	@Constraints.Required
	@OneToMany(mappedBy = "booking", fetch = FetchType.LAZY)
	public List<Ticket> tickets = new ArrayList<>();

	/**
	 * Class constructor setting the required variables of the class
	 */
	public Booking(User user, Itinerary itinerary, Payment payment) {
		this.status = Status.PENDING;
		this.user = user;
		this.itinerary = itinerary;
		this.recommendations = new ArrayList<>();
		this.payment = payment;
		this.date = new Date();
	}

	/**
	 * Class constructor setting the required variables of the class
	 */
	public Booking(Status status, User user, Itinerary itinerary, Payment payment) {
		this(user, itinerary, payment);
		this.status = status;
	}

	/**
	 * Creates a finder for the Booking entity
	 */
	public static Model.Finder<Long, Booking> find = new Model.Finder<>(Long.class, Booking.class);
}
