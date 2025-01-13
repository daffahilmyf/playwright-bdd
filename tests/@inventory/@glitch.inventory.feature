Feature: Inventory Functionality - Glitch
    As a user
    I want to be able to manage my inventory
    So that I can keep track of my items

    Background: Navigate to login page
        Given I open the login page

    Scenario: Navigation to inventory page expected to be slow
        When I login with glitch "username" and "password"
        Then I should be redirected to the inventory page more than "<timeout>" seconds

        Examples:
        | username                  | password      | timeout        |
        | performance_glitch_user   | secret_sauce  | 10             |


