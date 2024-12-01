Feature: Product Management

  Scenario: Create a product and verify it by category
    Given a product category "Category A"
    And the following product details:
      | name       | category   | value | active |
      | Product A  | Category A | 100   | true   |
    When the product is created
    Then the product should be retrievable by its category
