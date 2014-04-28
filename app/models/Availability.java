package models;

import play.db.ebean.Model;
import play.data.validation.Constraints;

import javax.persistence.*;

@Entity
public class Availability extends Model {

    @Id
    public Long id;

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
    public int numberAvailableSeatsLegOne;

    @Constraints.Required
    @Constraints.Min(0)
    @Constraints.MinLength(1)
    @Constraints.MaxLength(3)
    public int numberAvailableSeatsLegTwo;

    public Availability(Airline airline, Flight flight, TicketType ticketType, int numberAvailableSeatsLegOne, int numberAvailableSeatsLegTwo) {
        this.airline = airline;
        this.flight = flight;
        this.ticketType = ticketType;
        this.numberAvailableSeatsLegOne = numberAvailableSeatsLegOne;
        this.numberAvailableSeatsLegTwo = numberAvailableSeatsLegTwo;
    }

    public static Model.Finder<Long, Availability> find = new Model.Finder<>(Long.class, Availability.class);

}
