package models;

import play.data.format.Formats;
import play.db.ebean.Model;
import play.data.validation.Constraints;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Message extends Model {
	/**
	 * Uniquely identifies the message
	 */
	@Id
	public Long id;

	/**
	 * Specifies the user associated with the message
	 */
	@Constraints.Required
	@ManyToOne(cascade = CascadeType.ALL)
	public User user;

	/**
	 * Specifies the travel agent associated with the message
	 */
	@Constraints.Required
	@ManyToOne(cascade = CascadeType.ALL)
	public User travelAgent;

	/**
	 * Specifies the booking associated with the message
	 */
	@Constraints.Required
	@ManyToOne(cascade = CascadeType.ALL)
	public Booking booking;

	/**
	 * The date the message was received
	 */
	@Constraints.Required
	@Formats.DateTime(pattern="yyyy-MM-dd HH:mm:ss")
	public Date date;

	/**
	 * Boolean indicating whether or not this message has been read by its recipient.
	 */
	@Constraints.Required
	public Boolean read;

	/**
	 * Class constructor setting the required variables of the class
	 */
	public Message(User user, User travelAgent, Booking booking) {
		this.user = user;
		this.travelAgent = travelAgent;
		this.booking = booking;
		this.date = new Date();
		this.read = false;
	}

	/**
	 * Creates a finder for the Message entity
	 */
	public static Model.Finder<Long, Message> find = new Model.Finder<>(Long.class, Message.class);
}
