package models;

import play.db.ebean.Model;
import play.data.format.Formats;
import play.data.validation.Constraints;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class User extends Model {
	public interface LoginFields {}

	@Id
	public Long id;

	@Constraints.Required(groups = LoginFields.class)
	@Constraints.MinLength(5)
	public String email;

	@Constraints.Required(groups = LoginFields.class)
	@Constraints.MinLength(6)
	public String password;

	@Constraints.Required
	@ManyToOne(cascade = CascadeType.ALL)
	public Role role;

	@Constraints.Required
	@Constraints.MaxLength(15)
	public String alias;

	@Constraints.Required
	public String firstName;

	@Constraints.Required
	public String lastName;

	@Constraints.Required
	@Formats.DateTime(pattern="yyyy-MM-dd HH:mm:ss")
	public Date registrationDate;

	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
	public List<Booking> bookings = new ArrayList<>();

	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
	public List<BookingRequest> bookingRequests = new ArrayList<>();

	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
	public List<FlightSearch> flightSearches = new ArrayList<>();

	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
	public List<Message> messages = new ArrayList<>();

	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
	public List<Notification> notifications = new ArrayList<>();

	public User(String email, String password, Role role, String alias, String firstName, String lastName) {
		this.email = email;
		this.password = password;
		this.role = role;
		this.alias = alias;
		this.firstName = firstName;
		this.lastName = lastName;
		this.registrationDate = new Date();
	}

	public static Model.Finder<Long, User> find = new Model.Finder<>(Long.class, User.class);

}
