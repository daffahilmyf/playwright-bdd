Feature: Inventory Functionality - Normal
    As a user
    I want to be able to manage my inventory
    So that I can keep track of my items

    Background: Navigate to the inventory page
        Given I am on the inventory page
        When I view the inventory page

    Scenario: Display list of items
        Then I should see a list of items

    Scenario: Add a single item to the cart
        And I add an item to the cart
        Then the cart should display 1 item


