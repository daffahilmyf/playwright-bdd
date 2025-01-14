Feature: Inventory Functionality - Normal
    As a user
    I want to be able to manage my inventory
    So that I can keep track of my items

    Background: Navigate to the inventory page
        Given I am on the inventory page
        When I view the inventory page

    Scenario: Display list of items
        Then I should see a list of items
        | item_name                         | price      |
        | Sauce Labs Backpack               | $29.99     |
        | Sauce Labs Bike Light             | $9.99      |
        | Sauce Labs Bolt T-Shirt           | $15.99     |
        | Sauce Labs Fleece Jacket          | $49.99     |
        | Sauce Labs Onesie                 | $7.99      |
        | Test.allTheThings() T-Shirt (Red) | $15.99     |

    Scenario: Add a single item to the cart
        And I add an item to the cart
        Then the cart should display 1 item

    Scenario: Add multiple items to the cart
        And I add multiple items to the cart
        Then the cart should display multiple items


