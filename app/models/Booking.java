package models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import play.db.ebean.Model;
import play.data.format.Formats;
import play.data.validation.Constraints;

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
		COMPLETED
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
	 * The flight that was booked by the user
	 */
	@Constraints.Required
	@ManyToOne(cascade = CascadeType.ALL)
	public Flight flight;

	/**
	 * A reverse mapping of the list of messages between a user and travel agent for a particular flight
	 */
	@JsonIgnore
	@OneToMany(mappedBy = "booking", fetch = FetchType.LAZY)
	public List<Message> messages = new ArrayList<>();

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
	@Constraints.Required
	@OneToMany(mappedBy = "booking", fetch = FetchType.LAZY)
	public List<Ticket> tickets = new ArrayList<>();

	/**
	 * Class constructor setting the required variables of the class
	 */
	public Booking(Status status, User user, Flight flight, Date date) {
		this.status = status;
		this.user = user;
		this.flight = flight;
		this.date = date;
	}

	/**
	 * Creates a finder for the Booking entity
	 */
	public static Model.Finder<Long, Booking> find = new Model.Finder<>(Long.class, Booking.class);
}
