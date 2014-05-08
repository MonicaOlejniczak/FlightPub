package models;

import play.db.ebean.Model;
import play.data.format.Formats;
import play.data.validation.Constraints;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class User extends Person {

	/**
	 * An enumeration defining the user's theme
	 */
	public enum Theme {
		LIGHT,
		DARK
	}

	/**
	 * An enumeration defining the units being used by the user
	 */
	public enum Units {
		METRIC,
		IMPERIAL
	}

	/**
	 * Uniquely identifies the user
	 */
	@Id
	public Long id;

	@Constraints.Required
	@Constraints.Email
	public String email;

	@Constraints.Required
	@Constraints.MinLength(6)
	public String password;

	@Constraints.Required
	@ManyToMany(mappedBy = "users", cascade = CascadeType.ALL)
	public List<Role> roles = new ArrayList<>();

	@Constraints.Required
	@Formats.DateTime(pattern="yyyy-MM-dd HH:mm:ss")
	public Date registrationDate;

	@Enumerated(EnumType.ORDINAL)
	@Constraints.Required
	public Theme theme;

	@Enumerated(EnumType.ORDINAL)
	@Constraints.Required
	public Units unit;

	@Constraints.Required
	@ManyToOne(cascade = CascadeType.ALL)
	public Timezone timezone;

	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
	public List<Booking> bookings = new ArrayList<>();

	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
	public List<FlightSearch> flightSearches = new ArrayList<>();

	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
	public List<Message> messages = new ArrayList<>();

	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
	public List<Notification> notifications = new ArrayList<>();

	/**
	 * Class constructor setting the required variables of the class
	 */
	public User(String firstName, String lastName, String email, String password, List<Role> roles, Timezone timezone) {
		super(firstName, lastName);
		this.email = email;
		this.password = password;
		this.roles = roles;
		this.registrationDate = new Date();
		this.theme = Theme.LIGHT;
		this.unit= Units.METRIC;
		this.timezone = timezone;
	}

	/**
	 * Creates a finder for the User entity
	 */
	public static Model.Finder<Long, User> find = new Model.Finder<>(Long.class, User.class);

}
