Feature: Cart Functionality - normal
    As a user
    I want to be able to manage my card
    So that I can checkout my items

    Background: Navigate to inventory page
        Given I open the inventory page

    Scenario: Navigation to cart page
        When I navigate to the cart page
        Then I should be on the cart page

    Scenario: Checkout a single item
        When I add an item to the cart
        And I checkout the cart
        And I fill in the checkout form 
        Then the cart should display overviews of the items
        And I see the thank you page
