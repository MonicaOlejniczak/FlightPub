package models;

import play.data.format.Formats;
import play.db.ebean.Model;
import play.data.validation.Constraints;

import javax.persistence.*;

import java.util.Date;

@Entity
public class Notification extends Model {

	public enum Status {
		UNREAD,
		READ
	}

	@Id
	public Long id;

	@Constraints.Required
	@ManyToOne(cascade = CascadeType.ALL)
	public User user;

	@Constraints.Required
	@Formats.DateTime(pattern="yyyy-MM-dd HH:mm:ss")
	public Date date;

	@Constraints.Required
	public String message;

	@Constraints.Required
	public Status status;

	public Notification(User user, String message) {
		this.user = user;
		this.date = new Date();
		this.message = message;
		this.status = Status.UNREAD;
	}

	public static Model.Finder<Long, Notification> find = new Model.Finder<>(Long.class, Notification.class);

}
