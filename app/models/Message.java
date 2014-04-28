package models;

import play.data.format.Formats;
import play.db.ebean.Model;
import play.data.validation.Constraints;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Message extends Model {

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
    @ManyToOne(cascade = CascadeType.ALL)
    public User travelAgent;

    @Constraints.Required
    @ManyToOne(cascade = CascadeType.ALL)
    public Flight flight;

    @Constraints.Required
    @Formats.DateTime(pattern="yyyy-MM-dd HH:mm:ss")
    public Date date;

    @Constraints.Required
    public Status status;

    @Constraints.Required
    public boolean reply;

    @Constraints.Required
    @Formats.DateTime(pattern="yyyy-MM-dd HH:mm:ss")
    public Date replyDate;

    public Message(User user, User travelAgent, Flight flight) {
        this.user = user;
        this.travelAgent = travelAgent;
        this.flight = flight;
        this.date = new Date();
        this.status = Status.UNREAD;
    }

    public static Model.Finder<Long, Message> find = new Model.Finder<>(Long.class, Message.class);

}
