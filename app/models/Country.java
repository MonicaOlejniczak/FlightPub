package models;

import play.db.ebean.Model;
import play.data.validation.Constraints;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Country extends Model {

	/**
	 * Uniquely identifies the airline
	 */
	@Id
	public Long id;

	/**
	 * A standard two letter code for the country
	 */
	@Constraints.Required
	@Constraints.MinLength(2)
	@Constraints.MaxLength(2)
	public String countryCode2;

	/**
	 * A standard three letter code for the airline
	 */
	@Constraints.Required
	@Constraints.MinLength(3)
	@Constraints.MaxLength(3)
	public String countryCode3;

	/**
	 * The name of the country
	 */
	@Constraints.Required
	@Constraints.MinLength(3)
	public String name;

	/**
	 * An alternate name for the country
	 */
	@Constraints.MinLength(3)
	public String alternateName1;

	/**
	 * Another alternate name for the country
	 */
	@Constraints.MinLength(3)
	public String alternateName2;

	/**
	 * Specifies the mother country if it exists
	 * For example, the mother country of the United Kingdom is Great Britain
	 */
	@ManyToOne(cascade = CascadeType.ALL)
	public transient Country motherCountry;

	/**
	 * Provides an additional description for the mother country
	 */
	@Constraints.MinLength(3)
	public String motherCountryComment;

	/**
	 * The reverse mapping specifying the list of airlines that is within the given country
	 */
	@OneToMany(mappedBy = "country", fetch = FetchType.LAZY)
	public List<Airline> airlines = new ArrayList<>();

	/**
	 * The reverse mapping specifying the list of airports that is within the given country
	 */
	@OneToMany(mappedBy = "country", fetch = FetchType.LAZY)
	public List<Airport> airports = new ArrayList<>();

	/**
	 * Class constructor setting the required variables of the class
	 */
	public Country(String countryCode2, String countryCode3, String name) {
		this.countryCode2 = countryCode2;
		this.countryCode3 = countryCode3;
		this.name = name;
	}

	/**
	 * Class constructor setting all the variables in the class excluding any reverse mappings
	 */
	public Country(String countryCode2, String countryCode3, String name, String alternateName1, String alternateName2, Country motherCountry, String motherCountryComment) {
		this.countryCode2 = countryCode2;
		this.countryCode3 = countryCode3;
		this.name = name;
		this.alternateName1 = alternateName1;
		this.alternateName2 = alternateName2;
		this.motherCountry = motherCountry;
		this.motherCountryComment = motherCountryComment;
	}

	/**
	 * Creates a finder for the Country entity
	 */
	public static Model.Finder<Long, Country> find = new Model.Finder<>(Long.class, Country.class);

}
