name := """BatJam FlightPub"""

version := "1.0-SNAPSHOT"

libraryDependencies ++= Seq(
	// Select Play modules
	jdbc,					// The JDBC connection pool and the play.api.db API
	//anorm,			// Scala RDBMS Library
	//javaJdbc,		// Java database API
	javaEbean,		// Java Ebean plugin
	//javaJpa,		// Java JPA plugin
	//filters,		// A set of built-in filters
	javaCore,			// The core Java API

// this was for the jasmine sbt plugin. not needed if not going through sbt.
//  jasmineSettings,  // Jasmine Framework/Plugin Settings

	// WebJars pull in client-side web libraries
	"org.webjars" %% "webjars-play" % "2.2.1-2",
	"org.webjars" % "bootstrap" % "3.1.1-1",
	"mysql" % "mysql-connector-java" % "5.1.26"
	// Add your own project dependencies in the form:
	// "group" % "artifact" % "version"
)

play.Project.playJavaSettings


// the reason i abandoned the sbt plugin is because i wasn't sure
// exactly how to set it up with these settings.
// then stumbled onto karma, which was simple through npm.

//seq(jasmineSettings : _*)
//jasmineSettings

// Jasmine Config Paths

// directory to app.js and javascript files.
//appJsDir <+= sourceDirectory { src => src / "public" / "app"}
//// directory to lib js files like jquery etc.
//appJsDir <+= sourceDirectory { src => src / "public" / "app" / "extjs"}
//// directory to jasmine tests:
//// jasmine will look for /specs and /mocks sub directories
//// (note that the plugin only picks up test files named *.spec.js)
//appJsDir <+= sourceDirectory { src => src / "test" / "js" / "jasmine"}
//// directory to the test.dependencies.js configuration file
//// that loads the required application js and lib js files into the test context.
//appJsDir <+= sourceDirectory { src => src / "test" / "js" / "jasmine" / "test.dependencies.js"}

// jasmineRequireJsFile - the file that is your require.js library file (not needed?)
// jasmineRequireConfFile - the require.conf.js configuration file for require.js


// link jasmine to the standard 'sbt test' action.
// Now when running 'test' jasmine tests will be run
// and after that other Play tests will be executed.
//(test in Test) <<= (test in Test) dependsOn (jasmine)
// ^ possibly can link the karma run to the sbt run like this ^