// Comment to get more information during initialization
logLevel := Level.Warn

// The Typesafe repository
resolvers += "Typesafe repository" at "http://repo.typesafe.com/typesafe/releases/"

// Use the Play sbt plugin for Play projects
addSbtPlugin("com.typesafe.play" % "sbt-plugin" % "2.2.1")

// Includes JUnit dependency
libraryDependencies += "junit" % "junit" % "4.11"

// Hamcrest core dependency, used for JUnit
libraryDependencies += "org.hamcrest" % "hamcrest-core" % "1.3"

// EasyMock dependency
libraryDependencies += "org.easymock" % "easymock" % "3.2"


