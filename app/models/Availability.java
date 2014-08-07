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

	@Constraints.Required
	@ManyToOne(cascade = CascadeType.ALL)
	public Flight flight;

	@Constraints.Required
	@ManyToOne(cascade = CascadeType.ALL)
	public TicketType ticketType;

    @Constraints.Required
    @ManyToOne(cascade = CascadeType.ALL)
    public TicketClass ticketClass;

	@Constraints.Required
	@Constraints.Min(0)
	@Constraints.MinLength(1)
	@Constraints.MaxLength(3)
	public int availableSeats;

	public Availability(Flight flight, TicketType ticketType, int availableSeats) {
		this.flight = flight;
		this.ticketType = ticketType;
		this.availableSeats = availableSeats;
	}

	public static Model.Finder<Long, Availability> find = new Model.Finder<>(Long.class, Availability.class);

}
