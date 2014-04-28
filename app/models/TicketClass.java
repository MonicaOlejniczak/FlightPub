package models;

import play.db.ebean.Model;
import play.data.validation.Constraints;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class TicketClass extends Model {

    @Id
    public Long id;

    @Constraints.Required
    @Constraints.MinLength(3)
    @Constraints.MaxLength(3)
    public String code;

    @Constraints.Required
    @Constraints.MinLength(3)
    @Constraints.MaxLength(30)
    public String details;

    @OneToMany(mappedBy = "ticketClass", fetch = FetchType.LAZY)
    public List<Price> prices = new ArrayList<>();

    public TicketClass(String details, String code) {
        this.details = details;
        this.code = code;
    }

    public static Model.Finder<Long, TicketClass> find = new Model.Finder<>(Long.class, TicketClass.class);

}
