Feature: Test typing speed

  Background:
    Given I run the program with "0.txt"

  Scenario: Test wpm on command line
    Given I enter the "right" words
    Then I should see the amount of "10" correct  words
