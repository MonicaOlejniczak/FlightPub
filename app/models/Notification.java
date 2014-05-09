package models;

import play.data.format.Formats;
import play.db.ebean.Model;
import play.data.validation.Constraints;

import javax.persistence.*;

import java.util.Date;

@Entity
public class Notification extends Model {

	/**
	 * An enumeration defining the status of the notification
	 */
	public enum Status {
		UNREAD,
		READ
	}

	/**
	 * Uniquely identifies the notification
	 */
	@Id
	public Long id;

	/**
	 * Specifies the user associated with the notification
	 */
	@Constraints.Required
	@ManyToOne(cascade = CascadeType.ALL)
	public User user;

	/**
	 * The date the notification was received
	 */
	@Constraints.Required
	@Formats.DateTime(pattern="yyyy-MM-dd HH:mm:ss")
	public Date date;

	/**
	 * The contents of the notification
	 */
	@Constraints.Required
	public String message;

	/**
	 * Specifies the status of the notification
	 */
    @Enumerated(EnumType.ORDINAL)
	@Constraints.Required
	public Status status;

	/**
	 * Class constructor setting the required variables of the class
	 */
	public Notification(User user, String message) {
		this.user = user;
		this.date = new Date();
		this.message = message;
		this.status = Status.UNREAD;
	}

	/**
	 * Creates a finder for the Notification entity
	 */
	public static Model.Finder<Long, Notification> find = new Model.Finder<>(Long.class, Notification.class);

}
