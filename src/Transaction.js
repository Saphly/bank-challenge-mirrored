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

    // setDate = (dateString) => {
    //     this.timestamp = new Date(dateString);
    // };

    checkAmount = (amount) => {
        if (isNaN(amount) || amount < 0) throw this.#amountError;
    };

    // setAmount = (amount) => {
    //     this.checkAmount(amount);
    //     this.amount = amount;
    // };

    // setType = (typeString) => {
    //     if (!['DEBIT', 'CREDIT'].includes(typeString)) throw this.#typeError;

    //     this.type = typeString;
    // };
}

export default Transaction;
