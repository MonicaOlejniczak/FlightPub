package authentication;

/*
 * AuthenticatedUser.java
 * Date created: 16/05/2014
 * Copyright 2014 Trey Brisbane
 */

import play.mvc.Http;
import play.mvc.Result;
import play.mvc.Security;

/**
 * A class that facilitates the enforcement of User authentication in attempts to access restricted areas of the site.
 *
 * @author Trey Brisbane
 */
public class AuthenticatedUser extends Security.Authenticator {

	@Override
	public String getUsername(Http.Context context) {
		return context.session().get("email");
	}

	@Override
	public Result onUnauthorized(Http.Context context) {
		context.flash().put("destination", context.request().uri());
		return ok();
		//return redirect(controllers.routes.AuthenticationController.login());
	}

	public static Boolean isLoggedIn() {
		Http.Session session = Http.Context.current().session();
		return session.get("email") != null && !session.get("email").equals("");
	}

}
