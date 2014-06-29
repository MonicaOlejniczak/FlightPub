package models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import edu.asu.emit.qyan.alg.model.abstracts.BaseVertex;
import play.db.ebean.Model;
import play.data.validation.Constraints;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Airport extends Model implements BaseVertex, Comparable<BaseVertex> {

	/**
	 * Uniquely identifies the airport
	 */
	@Id
	public Long id;

	/**
	 * A standard three letter code for an airport
	 */
	@Constraints.Required
	@Constraints.MinLength(3)
	@Constraints.MaxLength(3)
	public String code;

	/**
	 * Specifies the name of the airport
	 */
	@Constraints.Required
	@Constraints.MinLength(3)
	@Constraints.MaxLength(30)
	public String name;

	/**
	 * The country that the airport is based in
	 */
	@Constraints.Required
	@ManyToOne(cascade = CascadeType.ALL)
	public Country country;

    /**
     * The latitude of the airport
     */
    public String latitude;

    /**
     * The longitude of the airport
     */
    public String longitude;

	/**
	 * The reverse mapping for the distance of source airports
	 */
    @JsonIgnore
	@OneToMany(mappedBy = "source", fetch = FetchType.LAZY)
	public List<Distance> distanceSources = new ArrayList<>();

	/**
	 * The reverse mapping for the distance of arrival airports
	 */
    @JsonIgnore
	@OneToMany(mappedBy = "destination", fetch = FetchType.LAZY)
	public List<Distance> distanceDestinations = new ArrayList<>();

    /**
     * The reverse mapping for the flights which source from this airport
     */
    @JsonIgnore
    @OneToMany(mappedBy = "source", fetch = FetchType.LAZY)
    public List<Flight> flightSources = new ArrayList<>();

    /**
     * The reverse mapping for the flights which have a destination of this airport
     */
    @JsonIgnore
    @OneToMany(mappedBy = "destination", fetch = FetchType.LAZY)
    public List<Flight> flightDestinations = new ArrayList<>();

	/**
	 * Class constructor setting the required variables of the class
	 */
	public Airport(String code, String name, Country country) {
		this.code = code;
		this.name = name;
		this.country = country;
	}

	/**
	 * Creates a finder for the Airport entity
	 */
	public static Model.Finder<Long, Airport> find = new Model.Finder<>(Long.class, Airport.class);

    @Override
    public int get_id() {
        return this.id.intValue();
    }

    @Override
    public double get_weight() {
        return 0; // wat
    }

    @Override
    public void set_weight(double weight) {
        // no
    }

    @Override
    public int compareTo(BaseVertex o) {
        double diff = this.get_weight() - o.get_weight();
        if(diff > 0)
            return 1;
        else if(diff < 0)
            return -1;
        else
            return 0;
    }

    @Override
    public String toString() {
        return this.name;
    }
}
