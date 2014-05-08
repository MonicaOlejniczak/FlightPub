package models;

import play.db.ebean.Model;
import play.data.validation.Constraints;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Airport extends Model {

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
	 * The reverse mapping for the distance of source airports
	 */
	@OneToMany(mappedBy = "source", fetch = FetchType.LAZY)
	public List<Distance> sources = new ArrayList<>();

	/**
	 * The reverse mapping for the distance of arrival airports
	 */
	@OneToMany(mappedBy = "destination", fetch = FetchType.LAZY)
	public List<Distance> destinations = new ArrayList<>();

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

}
