package models;

import play.data.validation.Constraints;
import play.db.ebean.Model;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
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
    @Constraints.Min(0)
    public Integer seatRow;

    /**
     * Specifies the seat number.
     */
    @Constraints.Required
    @Constraints.Min(0)
    public Integer seatColumn;

    /**
     * Class constructor setting the required variables of the class
     */
    public Seat(int row, int column) {
        this.seatRow = row;
        this.seatColumn = column;
    }

    /**
     * Creates a finder for the Seat entity
     */
    public static Model.Finder<Long, Seat> find = new Model.Finder<>(Long.class, Seat.class);

}
