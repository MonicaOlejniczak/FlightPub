package models;

import akka.util.Crypt;
import com.avaje.ebean.Expr;

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

	@Constraints.Email
	@Constraints.Required
	public String email;

	@Constraints.Required
	@Constraints.MinLength(8)
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
	public User(String firstName, String lastName, String email, String password) {
		super(firstName, lastName);
		this.email = email;
		this.password = User.hashPassword(password);
		this.registrationDate = new Date();
		this.theme = Theme.LIGHT;
		this.unit= Units.METRIC;
	}

	/**
	 * Sets this User's password to the specified new password.
	 * @param password The new password to assign to this user, in plaintext.
	 */
	public void setPassword(String password) {
		this.password = User.hashPassword(password);
	}

	/**
	 * Registers a User account with the given registration details, returning a Boolean indicating success
	 * or failure.
	 * @param firstName The first name of the registering User.
	 * @param lastName The last name of the registering User.
	 * @param email The email address of the registering User.
	 * @param password The plaintext password of the registering User.
	 * @return A Boolean indicating whether or not the User is able to register with the suppl
	 */
	public static Boolean register(String firstName, String lastName, String email, String password) {
		try {
			// Create a new user
			User newbie = new User(firstName, lastName, email, password);

			// TODO: Any additional configuration here

			// Save the user to the database
			newbie.save();

			return true;
		} catch (Exception ignored) {
			return false;
		}
	}

	/**
	 * Attempt to authenticate with the supplied email and passwordHash, returning a Boolean indicating success or
	 * failure.
	 * @param email The email address of the User to check.
	 * @param password The plaintext password of the User to check.
	 * @return A Boolean indicating whether or not the User was authenticated.
	 */
	public static Boolean authenticate(String email, String password) {
		// Find a user with the specified credentials
		return (User.find.where().and(Expr.eq("email", email), Expr.eq("password", User.hashPassword(password))).findUnique() != null);
	}

	/**
	 * Returns a hash of the specified plaintext password.
	 * @param plaintextPassword The plaintext password to hash.
	 * @return A hash of the specified plaintext password.
	 */
	private static String hashPassword(String plaintextPassword) {
		return Crypt.sha1(plaintextPassword);
	}
	
	/**
	 * Creates a finder for the User entity
	 */
	public static Model.Finder<Long, User> find = new Model.Finder<>(Long.class, User.class);
}
