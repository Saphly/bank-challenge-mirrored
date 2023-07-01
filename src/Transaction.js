class Transaction {
    #timestamp;
    #amount;
    #type;

    #dateError = new Error('Invalid date');
    #amountError = new Error('Invalid amount');
    #typeError = new Error('Invalid transaction type');

    constructor(date, amount, type) {
        this.timestamp = date;
        this.amount = amount;
        this.type = type;
    }

    get timestamp() {
        return this.#timestamp;
    }

    get amount() {
        return this.#amount;
    }

    get type() {
        return this.#type;
    }

    set timestamp(date) {
        if (isNaN(Date.parse(date))) throw this.#dateError;

        this.#timestamp = new Date(date);
    }

    set amount(amt) {
        this.checkAmount(amt);

        this.#amount = amt;
    }

    set type(transactionType) {
        if (!['DEBIT', 'CREDIT'].includes(transactionType))
            throw this.#typeError;

        this.#type = transactionType;
    }

    // Implemented from
    // https://stackoverflow.com/questions/17369098/simplest-way-of-getting-the-number-of-decimals-in-a-number-in-javascript
    countDecimals = (amount) => {
        if (Math.floor(amount) === amount) return 0;

        return amount.toString().split('.')[1].length;
    };

    checkAmount = (amount) => {
        if (isNaN(amount) || amount <= 0 || this.countDecimals(amount) > 2)
            throw this.#amountError;
    };
}

export default Transaction;
