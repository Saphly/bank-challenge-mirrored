import Transaction from './Transaction.js';

class Account {
    #currentBalance = 0;
    #transactions = [];

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

    deposit = (depDate, depAmount) => {
        let newTransaction = new Transaction(depDate, depAmount, 'CREDIT');

        this.currentBalance += depAmount;
        this.transactions = [...this.transactions, newTransaction];
    };

    withdraw = (withdrawDate, withdrawAmount) => {
        let newTransaction = new Transaction(
            withdrawDate,
            withdrawAmount,
            'DEBIT'
        );

        this.currentBalance -= withdrawAmount;
        this.transactions = [...this.transactions, newTransaction];
    };
}

export default Account;
