Feature: Login Functionality
    As a user of the application,
    I want to securely log in with my credentials,
    So that I can access the application's features and functionality.

    Background: Navigate to login page
        Given I open the login page

    Scenario: Login with valid credentials
        When I fill in the login form with valid "<username>" and "<password>"
        And I submit the login form
        Then I should see the welcome page

        Examples:
            | username          | password      |
            | standard_user     | secret_sauce  |

    @only
    Scenario: Login with invalid credentials
        When I fill in the login form with invalid "<username>" and "<password>"
        And I submit the login form
        Then I should see the error message: "<error_message>"

        Examples: 
            | username      | password          | error_message                                                             |
            | user          | secret_sauce      | Epic sadface: Username and password do not match any user in this service |
            |               | password          | Epic sadface: Username is required                                        |
            | standard_user |                   | Epic sadface: Password is required                                        |
            |               |                   | Epic sadface: Username is required                                        |
