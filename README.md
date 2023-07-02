# Bank

This challenge helps you practice your OO design skills.

You'll work alone, and you'll also review your own code so you can practice reflecting on and improving your own work.

## Installation

Use the package manager [npm](https://docs.npmjs.com/cli/v9/commands/npm-install) to install dependencies.
```
npm install
```

## To run the tests
After installing the dependencies, you can run the test suites from your project root directory: 
```
npm test
```

## Usage
You can run the programme from the project root directory by running
```
cd src/ && node index.js
```

## Explanation

### User story 1

As a bank client, 
To keep my money in a safe place,
I want to deposit my money into my bank account. 

| Objects | Properties      | Messages  | Output |
| ------- | --------------- | --------- | ------ |
| Account | balance @number | deposit() |        |

Tests:
<ul>
    <li>Check that deposit amount gets added to balance</li>
</ul>

### User story 2

As a bank client, 
So that I can have cash on hand,
I want to withdraw money from my bank account.

| Objects | Properties      | Messages   | Output |
| ------- | --------------- | ---------- | ------ |
| Account | balance @number | withdraw() |        |

Tests:
<ul>
    <li>Check new balance is correct after withdrawing</li>
</ul>

### User story 3

As a bank client, 
So that I know when I deposit,
I want my deposit transactions to be recorded. 

| Objects     | Properties                        | Messages  | Output  |
| ----------- | --------------------------------- | --------- | ------- |
| Account     | balance @number                   | deposit() |         |
|             | transactions @array[@Transaction] |           |         |
| Transaction | timestamp @Date                   |           | @object |
|             | amount @number                    |           |         |
|             | type @string                      |           |         |

Tests:
<ul>
    <li>Check that date is valid</li>
    <li>Check that deposit/withdraw amount is a number</li>
    <li>Check deposit/withdraw amount is not more than 2 decimal places</li>
    <li>Check deposit/withdraw amount is not less than 0</li>
    <li>Check that type is either "DEBIT" or "CREDIT"</li>
    <li>Check that it should return error if any of the args are invalid</li>
    <li>Check that transactions[] has added a Transaction{} after successful deposit</li>
</ul>

### User story 4

As a bank client,
So that I know when I withdraw, 
I want my withdraw transactions to be recorded. 

| Objects     | Properties                        | Messages   | Output  |
| ----------- | --------------------------------- | ---------- | ------- |
| Account     | balance @number                   | withdraw() |         |
|             | transactions @array[@Transaction] |            |         |
| Transaction | timestamp @Date                   |            | @object |
|             | amount @number                    |            |         |
|             | type @string                      |            |         |

Tests:
<ul>
    <li>Check that transactions[] has added a Transaction{} after successful withdraw</li>
</ul>

### User story 5

As a bank client,
To know more about my transactions,
I want to be able to see my transaction details. 

| Objects   | Properties                        | Messages | Output |
| --------- | --------------------------------- | -------- | ------ |
| Account   | transactions @array[@Transaction] |          |        |
| Statement | account @Account                  | @print   |        |

Tests: 
<ul>
    <li>Check that it prints the header</li>
    <li>Check that it is printing the right elements</li>
</ul>

### User story 6

As a bank client,
So that I can read easily,
I want the bank statement to be printed neatly.

| Objects   | Properties                        | Messages | Output |
| --------- | --------------------------------- | -------- | ------ |
| Account   | transactions @array[@Transaction] |          |        |
| Statement | account @Account                  | @print   |        |
|           |                                   | @format  |        |

Tests: 
<ul>
    <li>Check that it has the right paddings</li>
    <li>Check that it has the right colours for debit/credit amount and balance</li>
</ul>


## Specification

### Requirements

* Results of your code should display via the JavaScript console.  (NB: You don't need to implement a command line interface that takes user input from STDIN.)
* Deposits, withdrawal.
* Account statement (date, credit or debit amount, balance) printing.
* Data can be kept in memory (it doesn't need to be stored to a database or anything).

### Acceptance criteria

**Given** a client makes a deposit of 1000 on 10-01-2012  
**And** a deposit of 2000 on 13-01-2012  
**And** a withdrawal of 500 on 14-01-2012  
**When** she prints her bank statement  
**Then** she would see

```
date       || credit  || debit  || balance
14/01/2012 ||         || 500.00 || 2500.00
13/01/2012 || 2000.00 ||        || 3000.00
10/01/2012 || 1000.00 ||        || 1000.00
```


#### Standard
- [ ] Meets the spec
- [ ] Developed test-first
- [ ] Passes tests and code is clean and well formatted
- [ ] Encapsulates adding and storing Transactions in a class
- [ ] Encapsulates Statement formatting in a class
- [ ] Encapsulates Transaction data in a class

#### Extended
- [ ] Can you format the console output?  Credited values should be GREEN and debited values should be RED.  The balance should be GREEN if positive and RED if negative

You may find this link useful [Output to the command line using NodeJS](https://nodejs.dev/en/learn/output-to-the-command-line-using-nodejs/) - check the formatting section (and this links out to a GitHub doc on the [ANSI color codes](https://gist.github.com/iamnewton/8754917))

#### Note

I have received help from StackOverflow and my husband. 