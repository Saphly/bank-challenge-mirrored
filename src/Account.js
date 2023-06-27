class Account {
    #currentBalance = 0;
    #transactions = [];

    #decimalError = new Error('Amount can only be up to 2 decimal places');
    #nonPositiveError = new Error('Amount has to be more than 0');
    #insufficientBalanceError = new Error('Insufficient balance');

    get currentBalance() {
        return this.#currentBalance;
    }

    get transactions() {
        return this.#transactions;
    }

    set currentBalance(amount) {
        this.#currentBalance = amount;
    }

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
        this.checkAmount(depAmount);

        this.currentBalance += depAmount;
    };

    withdraw = (withdrawAmount) => {
        this.checkAmount(withdrawAmount);

        if (withdrawAmount > this.currentBalance)
            throw this.#insufficientBalanceError;

        this.currentBalance -= withdrawAmount;
    };
}

export default Account;
