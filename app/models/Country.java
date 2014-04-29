package models;

import play.db.ebean.Model;
import play.data.validation.Constraints;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Country extends Model {

	@Id
	public Long id;

	@Constraints.Required
	@Constraints.MinLength(2)
	@Constraints.MaxLength(2)
	public String countryCode2;

	@Constraints.Required
	@Constraints.MinLength(3)
	@Constraints.MaxLength(3)
	public String countryCode3;

	@Constraints.Required
	@Constraints.MinLength(3)
	public String name;

	@Constraints.MinLength(3)
	public String alternateNameOne;

	@Constraints.MinLength(3)
	public String alternateNameTwo;

	@ManyToOne(cascade = CascadeType.ALL)
	public Country motherCountry;

	@Constraints.MinLength(3)
	public String motherCountryComment;

	@OneToMany(mappedBy = "country", fetch = FetchType.LAZY)
	public List<Airline> airlines = new ArrayList<>();

	@OneToMany(mappedBy = "country", fetch = FetchType.LAZY)
	public List<Airport> airports = new ArrayList<>();

	public Country(String countryCode2, String countryCode3, String name) {
		this.countryCode2 = countryCode2;
		this.countryCode3 = countryCode3;
		this.name = name;
	}

	public Country(String countryCode2, String countryCode3, String name, String alternateNameOne, String alternateNameTwo, Country motherCountry, String motherCountryComment) {
		this.countryCode2 = countryCode2;
		this.countryCode3 = countryCode3;
		this.name = name;
		this.alternateNameOne = alternateNameOne;
		this.alternateNameTwo = alternateNameTwo;
		this.motherCountry = motherCountry;
		this.motherCountryComment = motherCountryComment;
	}

	public static Model.Finder<Long, Country> find = new Model.Finder<>(Long.class, Country.class);

}
