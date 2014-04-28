package models;

import play.db.ebean.Model;
import play.data.format.Formats;
import play.data.validation.Constraints;

import javax.persistence.*;

import java.util.Date;

@Entity
public class Booking extends Model {

    @Id
    public Long id;

    @Constraints.Required
    @ManyToOne(cascade = CascadeType.ALL)
    public User user;

    @Constraints.Required
    @ManyToOne(cascade = CascadeType.ALL)
    public Flight flight;

    @Constraints.Required
    @Formats.DateTime(pattern="yyyy-MM-dd HH:mm:ss")
    public Date date;

    @Constraints.Required
    @OneToOne(cascade = CascadeType.ALL)
    public BookingRequest bookingRequest;

    // todo reverse mappings and constructor

    public static Model.Finder<Long, Booking> find = new Model.Finder<>(Long.class, Booking.class);

}
