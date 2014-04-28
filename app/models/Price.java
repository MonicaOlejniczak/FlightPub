package models;

import play.db.ebean.Model;
import play.data.validation.Constraints;
import play.data.format.Formats;

import javax.persistence.*;

import java.util.Date;

@Entity
public class Price extends Model {

    @Id
    public Long id;

    @Constraints.Required
    @ManyToOne(cascade = CascadeType.ALL)
    public Flight flight;

    @Constraints.Required
    @ManyToOne(cascade = CascadeType.ALL)
    public Airline airline;

    @Constraints.Required
    @ManyToOne(cascade = CascadeType.ALL)
    public TicketClass ticketClass;

    @Constraints.Required
    @ManyToOne(cascade = CascadeType.ALL)
    public TicketType ticketType;

    @Constraints.Required
    @Formats.DateTime(pattern="yyyy-MM-dd HH:mm:ss")
    public Date startDate;

    @Constraints.Required
    @Formats.DateTime(pattern="yyyy-MM-dd HH:mm:ss")
    public Date endDate;

    @Constraints.Required
    public double price;

    @Constraints.Required
    public double priceLegOne;

    @Constraints.Required
    public double priceLegTwo;

    public Price(Flight flight, Airline airline, TicketClass ticketClass, TicketType ticketType, Date startDate, Date endDate, double price, double priceLegOne, double priceLegTwo) {
        this.flight = flight;
        this.airline = airline;
        this.ticketClass = ticketClass;
        this.ticketType = ticketType;
        this.startDate = startDate;
        this.endDate = endDate;
        this.price = price;
        this.priceLegOne = priceLegOne;
        this.priceLegTwo = priceLegTwo;
    }

    public static Model.Finder<Long, Price> find = new Model.Finder<>(Long.class, Price.class);

}
