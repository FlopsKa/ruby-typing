Feature: Test typing speed

  Background:
    Given I run the program with "0.txt"

  Scenario: Test wpm on command line
    Given I enter the words needed to complete the exercise
    Then I should see "10"
