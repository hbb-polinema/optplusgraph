Additional Feature Project:
---------------------------
- Support user-input scanf() dan cin()
- Responsive web


# Code Review Best Practice #

by: https://www.kevinlondon.com/2015/05/05/code-review-best-practice.html

## What I look for during a review ##

*** Architecture / Design ***

* Single Responsibility Principle
* Open/Closed Principle
* Code duplication
* Squint-test offenses
* Code left in a better state than found
* Potential bugs
* Error handling
* Efficiency

*** Style ***

* Method names
* Variable names --> consistent with your language, more expressive variable names
* Function length --> should be less than 20, if more 50 lines, cut to smaller pieces
* Class length --> max 300 lines, ideally less than 100
* File length --> max 1000 lines, better split into smaller, more focused files
* Docstrings
* Commented code
* Number of method arguments --> max 3
* Readability

*** Testing ***

* Test coverage
* Testing at the right level
* Number of Mocks
* Meets requirements


