package models;

import play.data.validation.Constraints;
import play.db.ebean.Model;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class FlightEdge extends Model {

    public FlightEdge(Airport source, Airport destination) {
        this.source = source;
        this.destination = destination;
    }

    /**
     * Uniquely identifies the flightedge
     */
    @Id
    public Long id;

    /**
     * The source airport
     */
    @Constraints.Required
    @ManyToOne(cascade = CascadeType.ALL)
    public Airport source;

    /**
     * The destination airport
     */
    @Constraints.Required
    @ManyToOne(cascade = CascadeType.ALL)
    public Airport destination;

//    public Integer

    @Override
    public String toString() {
        return String.format("%s -> %s", source, destination);
    }

    /**
     * Creates a finder for the Edge entity
     */
    public static Model.Finder<Long, FlightEdge> find = new Model.Finder<>(Long.class, FlightEdge.class);
}
