# login-page

Simple login page with test file to ensure that the following conditions are met when logging in:
- Username and password accept alphanumeric values
- Username and password accept the following special characters: ~, !, @, #, $, %, ^
- Username must be at least 6 characters long, and no longer than 8 characters
- Password must be at least 8 characters long, and no longer than 16 characters

The test file will run two tests on the login page, both of which iterate through a number of times depending on which values are given for the number of character codes to test, and the lengths of usernames/passwords to test. 

The first loop will iterate through character codes from 0 to n, where n is the number of different characters to be tested (determined by the constant **'NUMBER_OF_CHARACTER_CODES'** in imports/ui/App.test.js). If the character code at the given point of the loop is alphanumeric or one of the special characters, the tester will check that the login page allows this as input. Otherwise, the login page should reject this character code and present an error message, which the tester will identify. 

The second loop will iterate through lengths of usernames and passwords from 0 to n, where n is the desired maximum length to test (determined by the constant **'TEST_USER_PASS_LENGTH'** in imports/ui/App.test.js). At iteration i, usernames and passwords of length i will be randomly generated and submitted to see if the login page allows or rejects them. If the username and password are the "proper" length, the login page should treat the input as valid, otherwise the page should reject it. 

If you're using the login page without the tester, entering a valid username and password will create a new account. If the username and password are entered again, the app will treat this as a login case rather than attempting to create another account with the same credentials (although this doesn't accomplish much other than displaying a message with the user's username).

## Usage

[Meteor](https://www.meteor.com/install) and [Jest](https://facebook.github.io/jest/docs/en/getting-started.html) must be installed before running.

#### Cloning & Setup
```
$ git clone https://github.com/sheldonfries/login-page
$ cd login-page
```

#### To run the login page:

`$ meteor`

Once the application is up and running, open [http://localhost:3000](http://localhost:3000) in your browser to view the page.

**Note:** You may need to remove or rename the .babelrc file in the main directory in order for this to work.


#### To test:

`$ npm test`

OR

`$ yarn test`

The default values for the number of loop iterations are *very large*, so running this tester without changing the values of **'NUMBER_OF_CHARACTER_CODES'** and **'TEST_USER_PASS_LENGTH'** may take a very long time. It's probably best to change them to something in the tens or hundreds if just looking to test a few cases or for making sure that the tester is working.

**Note:** If you've previously removed or renamed the .babelrc file, restore it before testing.
