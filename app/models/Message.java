package models;

import play.data.format.Formats;
import play.db.ebean.Model;
import play.data.validation.Constraints;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Message extends Model {

	/**
	 * An enumeration defining the status of the message
	 */
	public enum Status {
		UNREAD,
		READ
	}

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
	 * Specifies the flight associated with the message
	 */
	@Constraints.Required
	@ManyToOne(cascade = CascadeType.ALL)
	public Flight flight;

	/**
	 * The date the message was received
	 */
	@Constraints.Required
	@Formats.DateTime(pattern="yyyy-MM-dd HH:mm:ss")
	public Date date;

	/**
	 * Specifies the status of the message
	 */
    @Enumerated(EnumType.ORDINAL)
	@Constraints.Required
	public Status status;

	/**
	 * A flag checking if the message has been replied to
	 */
	@Constraints.Required
	public boolean reply;

	/**
	 * The date the reply was sent
	 */
	@Constraints.Required
	@Formats.DateTime(pattern="yyyy-MM-dd HH:mm:ss")
	public Date replyDate;

	/**
	 * Class constructor setting the required variables of the class
	 */
	public Message(User user, User travelAgent, Flight flight) {
		this.user = user;
		this.travelAgent = travelAgent;
		this.flight = flight;
		this.date = new Date();
		this.status = Status.UNREAD;
	}

	/**
	 * Creates a finder for the Message entity
	 */
	public static Model.Finder<Long, Message> find = new Model.Finder<>(Long.class, Message.class);

}
