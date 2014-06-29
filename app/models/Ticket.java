package models;

import play.db.ebean.Model;
import play.data.format.Formats;
import play.data.validation.Constraints;

import javax.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
public class Ticket extends Model {

	/**
	 * Uniquely identifies the ticket
	 */
	@Id
	public Long id;

	/**
	 * Specifies the person that the ticket is for
	 */
	@Constraints.Required
	@ManyToOne(cascade = CascadeType.ALL)
	public Person person;

	/**
	 * Specifies the type of passenger the person is
	 */
	@Constraints.Required
	@ManyToOne(cascade = CascadeType.ALL)
	public PassengerType passengerType;

	/**
	 * The date the ticket was booked
	 */
	@Constraints.Required
	@Formats.DateTime(pattern="yyyy-MM-dd HH:mm:ss")
	public Date date;

	/**
	 * Specifies the flight associated with the ticket
	 */
	@Constraints.Required
	@ManyToOne(cascade = CascadeType.ALL)
	public Flight flight;

	/**
	 * Specifies the booking associated with the ticket
	 */
	@Constraints.Required
	@ManyToOne(cascade = CascadeType.ALL)
	public Booking booking;

	/**
	 * Specifies the type of ticket associated with the ticket
	 */
	@Constraints.Required
	@ManyToOne(cascade = CascadeType.ALL)
	public TicketType ticketType;

	/**
	 * Specifies the ticket class associated with the ticket
	 */
	@Constraints.Required
	@ManyToOne(cascade = CascadeType.ALL)
	public TicketClass ticketClass;

	/**
	 * Specifies the luggage associated with the ticket
	 */
	@Constraints.Required
	@ManyToOne(cascade = CascadeType.ALL)
	public Luggage luggage;

    /**
     * Specifies the seat(s) associated with the ticket.
     */
    @Constraints.Required
    @ManyToOne(cascade = CascadeType.ALL)
    public List<Seat> seats;

	/**
	 * Class constructor setting the required variables of the class
	 */
	public Ticket(Person person, PassengerType passengerType, Date date, Flight flight, Booking booking, TicketType ticketType, TicketClass ticketClass, Luggage luggage, List<Seat> seats) {
		this.person = person;
		this.passengerType = passengerType;
		this.date = date;
		this.flight = flight;
		this.booking = booking;
		this.ticketType = ticketType;
		this.ticketClass = ticketClass;
		this.luggage = luggage;
        this.seats = seats;
	}

	/**
	 * Creates a finder for the Ticket entity
	 */
	public static Model.Finder<Long, Ticket> find = new Model.Finder<>(Long.class, Ticket.class);

}
