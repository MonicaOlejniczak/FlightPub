package models;

import play.db.ebean.Model;
import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public abstract class Role extends Model {

	@Id
	public Long id;

	@OneToMany(mappedBy = "role", fetch = FetchType.LAZY)
	public List<User> users = new ArrayList<>();

}
