*************************
| Testing branch setup  |
-------------------------

Javascript Testing Setup
-------------------------
Summary
--------
Jasmine is the javascript testing framework.
Karma is a runner framework/driver to control the running of tests, and uses Jasmine.
Other browser specific plugins are also used with Karma.
Istanbul handles code coverage via the karma-coverage plugin.
^ These are all node plugins ^
You can see them in the package.json file in the flightpub directory.
IntelliJ IDE Karma Plugin is required to run Karma in iJ.

Instructions
-------------

you might need to:
- update npm 
- install istanbul

you will need to:
run "npm install" from command line in the flightpub directory.
this should install all the npm dependencies.



