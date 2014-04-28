package models;

import play.db.ebean.Model;
import play.data.validation.Constraints;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Airport extends Model {

    @Id
    public Long id;

    @Constraints.Required
    @Constraints.MinLength(3)
    @Constraints.MaxLength(3)
    public String code;

    @Constraints.Required
    @Constraints.MinLength(3)
    @Constraints.MaxLength(30)
    public String name;

    @Constraints.Required
    @ManyToOne(cascade = CascadeType.ALL)
    public Country country;

    @OneToMany(mappedBy = "source", fetch = FetchType.LAZY)
    public List<Distance> sources = new ArrayList<>();

    @OneToMany(mappedBy = "destination", fetch = FetchType.LAZY)
    public List<Distance> destinations = new ArrayList<>();

    public Airport(String code, String name, Country country) {
        this.code = code;
        this.name = name;
        this.country = country;
    }

    public static Model.Finder<Long, Airport> find = new Model.Finder<>(Long.class, Airport.class);

}
