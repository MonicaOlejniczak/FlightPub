package models;

import play.db.ebean.Model;
import play.data.validation.Constraints;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Airline extends Model {

	@Id
	public Long id;

	@Constraints.Required
	@Constraints.MinLength(2)
	@Constraints.MaxLength(2)
	public String code;

	@Constraints.Required
	@Constraints.MinLength(3)
	@Constraints.MaxLength(30)
	public String name;

	@ManyToOne(cascade = CascadeType.ALL)
	public Country country;

	@OneToMany(mappedBy = "airline", fetch = FetchType.LAZY)
	public List<Availability> availabilities = new ArrayList<>();

	@OneToMany(mappedBy = "airline", fetch = FetchType.LAZY)
	public List<Flight> flights = new ArrayList<>();

	@OneToMany(mappedBy = "airline", fetch = FetchType.LAZY)
	public List<Price> prices = new ArrayList<>();

	public Airline(String code, String name, Country country) {
		this.code = code;
		this.name = name;
		this.country = country;
	}

	public static Model.Finder<Long, Airline> find = new Model.Finder<>(Long.class, Airline.class);

}
