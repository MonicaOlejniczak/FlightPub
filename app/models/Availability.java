package models;

import play.db.ebean.Model;
import play.data.validation.Constraints;

import javax.persistence.*;

@Entity
public class Availability extends Model {

	/**
	 * Uniquely identifies the availability of seats
	 */
	@Id
	public Long id;

	/**
	 * Specifies the airline associated with the availability of seats
	 */
	@Constraints.Required
	@ManyToOne(cascade = CascadeType.ALL)
	public Airline airline;

	@Constraints.Required
	@ManyToOne(cascade = CascadeType.ALL)
	public Flight flight;

	@Constraints.Required
	@ManyToOne(cascade = CascadeType.ALL)
	public TicketType ticketType;

	@Constraints.Required
	@Constraints.Min(0)
	@Constraints.MinLength(1)
	@Constraints.MaxLength(3)
	public int numberAvailableSeatsLeg1;

	@Constraints.Required
	@Constraints.Min(0)
	@Constraints.MinLength(1)
	@Constraints.MaxLength(3)
	public int numberAvailableSeatsLeg2;

	public Availability(Airline airline, Flight flight, TicketType ticketType, int numberAvailableSeatsLeg1, int numberAvailableSeatsLeg2) {
		this.airline = airline;
		this.flight = flight;
		this.ticketType = ticketType;
		this.numberAvailableSeatsLeg1 = numberAvailableSeatsLeg1;
		this.numberAvailableSeatsLeg2 = numberAvailableSeatsLeg2;
	}

	public static Model.Finder<Long, Availability> find = new Model.Finder<>(Long.class, Availability.class);

}
