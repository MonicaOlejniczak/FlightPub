package controllers;

import org.junit.Test;
import play.data.Form;

import java.util.HashMap;
import java.util.Map;

import static org.junit.Assert.assertEquals;
import static play.test.Helpers.fakeApplication;
import static play.test.Helpers.running;

public class AuthenticationControllerTest {

    AuthenticationController test = new AuthenticationController();

    @Test
    public void testIsUsernameTakenReturnsTRUE() throws Exception {
        // This test assumes user with username 'test@user.com' already exists within the database
        running(fakeApplication(), new Runnable() {
            public void run() {
            assertEquals(true, test.isUsernameTaken("test@user.com"));
            }
        });
    }

    @Test
    public void testIsUsernameTakenReturnsFALSE() throws Exception {
        // This test assumes user with username 'newuser@user.com' doesn't exist within the database
        running(fakeApplication(), new Runnable() {
            public void run() {
                assertEquals(false, test.isUsernameTaken("newuser@user.com"));
            }
        });
    }

    @Test(expected=IllegalStateException.class) // Attempting to register a user with incorrectly formatted details will throw this exception
                                                // If it is caught, then this test can be considered passed
    public void testRegisterUserFailsIfFormHasErrors() throws Exception {
        running(fakeApplication(), new Runnable() {
            public void run() {
                Map<String, String> testMap = new HashMap<>();
                testMap.put("firstName", "Billy");
                testMap.put("lastName", "Bob");
                testMap.put("accountType", "STANDARD_USER");
                testMap.put("email", "blah"); // Another error; email is of incorrect format
                testMap.put("password", "test"); // Another error; password isn't long enough
                Form <AuthenticationController.RegistrationForm> testForm = new Form(AuthenticationController.RegistrationForm.class);
                testForm = testForm.bind(testMap);
                assertEquals(1, test.registerUser2(testForm));
            }
        });
    }

    @Test
    public void testRegisterUserFailsIFUsernameIsTaken() throws Exception {
        running(fakeApplication(), new Runnable() {
            public void run() {
                Map<String, String> testMap = new HashMap<>();
                testMap.put("firstName", "test");
                testMap.put("lastName", "user");
                testMap.put("accountType", "STANDARD_USER");
                testMap.put("email", "test@user.com"); // This is a user already registered in the system for testing purposes
                testMap.put("password", "password");
                Form <AuthenticationController.RegistrationForm> testForm = new Form(AuthenticationController.RegistrationForm.class);
                testForm = testForm.bind(testMap);
                assertEquals(2, test.registerUser2(testForm));
            }
        });
    }

    @Test
    public void testRegisterUserPassesIFUsernameIsAvailableAndFormHasNoErrors() throws Exception {
        running(fakeApplication(), new Runnable() {
            public void run() {
                Map<String, String> testMap = new HashMap<>();
                testMap.put("firstName", "new");
                testMap.put("lastName", "user");
                testMap.put("accountType", "STANDARD_USER");
                testMap.put("email", "newuser@user.com"); // This is a username not registered in the system, used for testing purposes
                testMap.put("password", "password");
                Form <AuthenticationController.RegistrationForm> testForm = new Form(AuthenticationController.RegistrationForm.class);
                testForm = testForm.bind(testMap);
                assertEquals(3, test.registerUser2(testForm));
            }
        });
    }

    @Test
    public void testLoginUserPassesIFLoginDetailsAreCorrect() throws Exception {
        running(fakeApplication(), new Runnable() {
            public void run() {
                Map<String, String> testMap = new HashMap<>();
                testMap.put("email", "test@user.com");
                testMap.put("password", "password");
                Form<AuthenticationController.LoginCredentials> testForm = new Form(AuthenticationController.LoginCredentials.class);
                testForm = testForm.bind(testMap);
                assertEquals(2, test.loginUser2(testForm));
            }
        });
    }

    @Test(expected=IllegalStateException.class) // Attempting to register a user with incorrectly formatted details will throw this exception
                                                // If it is caught, then this test can be considered passed
    public void testLoginUserFailsIFLoginDetailsAreFormattedIncorrectly() throws Exception {
        running(fakeApplication(), new Runnable() {
            public void run() {
                Map<String, String> testMap = new HashMap<>();
                testMap.put("email", "user"); // incorrect username format
                testMap.put("password", "1234"); // incorrect password length
                Form<AuthenticationController.LoginCredentials> testForm = new Form(AuthenticationController.LoginCredentials.class);
                testForm = testForm.bind(testMap);
                assertEquals(1, test.loginUser2(testForm));
            }
        });
    }
}