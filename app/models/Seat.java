package models;

import play.data.validation.Constraints;
import play.db.ebean.Model;

import javax.persistence.CascadeType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

public class Seat extends Model {

    /**
    * Uniquely defines this seat.
    */
    @Id
    public Long id;

    /**
     * Specifies the seat row.
     */
    @Constraints.Required
    @Constraints.MaxLength(2)
    @ManyToOne(cascade = CascadeType.ALL)
    public String row;

    /**
     * Specifies the seat number.
     */
    @Constraints.Required
    @Constraints.Min(0)
    @ManyToOne(cascade = CascadeType.ALL)
    public int seatNum;

    /**
     * Class constructor setting the required variables of the class
     */
    public Seat(String row, int seatNum) {
        this.row = row;
        this.seatNum = seatNum;
    }

    /**
     * Creates a finder for the Seat entity
     */
    public static Model.Finder<Long, Seat> find = new Model.Finder<>(Long.class, Seat.class);

}
