package models;

import play.data.validation.Constraints;
import play.db.ebean.Model;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import java.util.ArrayList;
import java.util.List;

@Entity
public class FlightPath extends Model {

    public FlightPath(Airport source, Airport destination) {
        this.source = source;
        this.destination = destination;
    }
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

    /**
     * An ordered list of edges connecting source and destination
     * TODO: order them D:
     */
    public List<FlightEdge> flightEdges = new ArrayList<>();

    /**
     * Creates a finder for the Path entity
     */
    public static Model.Finder<Long, FlightPath> find = new Model.Finder<>(Long.class, FlightPath.class);
}
