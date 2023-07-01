// import Transaction from './Transaction.js';

class Account {
    #currentBalance = 0;
    #transactions = [];

    #decimalError = new Error('Amount can only be up to 2 decimal places');
    #nonPositiveError = new Error('Amount has to be more than 0');
    // #insufficientBalanceError = new Error('Insufficient balance');

    get currentBalance() {
        return this.#currentBalance;
    }

    get transactions() {
        return this.#transactions;
    }

    set currentBalance(amount) {
        this.#currentBalance = amount;
    }

    set transactions(trx) {
        this.#transactions = trx;
    }

    // Implemented from
    // https://stackoverflow.com/questions/17369098/simplest-way-of-getting-the-number-of-decimals-in-a-number-in-javascript
    countDecimals = (value) => {
        if (Math.floor(value) === value) return 0;

        return value.toString().split('.')[1].length;
    };

    checkAmount = (value) => {
        if (this.countDecimals(value) > 2) {
            throw this.#decimalError;
        }
        if (value <= 0) {
            throw this.#nonPositiveError;
        }
    };

    deposit = (depAmount) => {
        // deposit = (depDate, depAmount) => {
        this.checkAmount(depAmount);
        // MOVE CHECK AMOUNT TO TRANSACTION

        this.currentBalance += depAmount;
        // let newTransaction = new Transaction(depDate, depAmount, 'CREDIT');
        // this.transactions = [...this.transactions, newTransaction];
    };

    withdraw = (withdrawAmount) => {
        // withdraw = (withdrawDate, withdrawAmount) => {
        this.checkAmount(withdrawAmount);

        // if (withdrawAmount > this.currentBalance)
        //     throw this.#insufficientBalanceError;

        this.currentBalance -= withdrawAmount;
        // let newTransaction = new Transaction(
        //     withdrawDate,
        //     withdrawAmount,
        //     'DEBIT'
        // );
        // this.transactions = [...this.transactions, newTransaction];
    };
}

export default Account;
