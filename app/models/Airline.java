package models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import play.db.ebean.Model;
import play.data.validation.Constraints;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Airline extends Model {

	/**
	 * Uniquely identifies the airline
	 */
	@Id
	public Long id;

	/**
	 * A standard two letter code for the airline
	 */
	@Constraints.Required
	@Constraints.MinLength(2)
	@Constraints.MaxLength(2)
	public String code;

	/**
	 * Specifies the name of the airline
	 */
	@Constraints.Required
	@Constraints.MinLength(3)
	@Constraints.MaxLength(30)
	public String name;

	/**
	 * The country that the airline is based in
	 */
	@ManyToOne(cascade = CascadeType.ALL)
	public Country country;

	/**
	 * A reverse mapping of the list of available seats for a particular airline
	 */
    @JsonIgnore
	@OneToMany(mappedBy = "airline", fetch = FetchType.LAZY)
	public List<Availability> availabilities = new ArrayList<>();

	/**
	 * A reverse mapping of the list of flights for a particular airline
	 */
    @JsonIgnore
	@OneToMany(mappedBy = "airline", fetch = FetchType.LAZY)
	public List<Flight> flights = new ArrayList<>();

	/**
	 * A reverse mapping of the list of prices for a particular airline
	 */
    @JsonIgnore
	@OneToMany(mappedBy = "airline", fetch = FetchType.LAZY)
	public List<Price> prices = new ArrayList<>();

	/**
	 * Class constructor setting the required variables of the class
	 */
	public Airline(String code, String name, Country country) {
		this.code = code;
		this.name = name;
		this.country = country;
	}

	/**
	 * Creates a finder for the Airline entity
	 */
	public static Model.Finder<Long, Airline> find = new Model.Finder<>(Long.class, Airline.class);

}
