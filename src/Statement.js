class Statement {
    static colSeparator = ' || ';

    static printHeader = () => {
        const colWidths = this.getColumnWidth();
        const headerArray = ['date', 'credit', 'debit', 'balance'];

        let printString = '';

        for (let i = 0; i < headerArray.length; i++) {
            let element = '';

            if (headerArray[i] === 'date') {
                element = headerArray[i].padEnd(colWidths.dateColumn);
            } else {
                element = headerArray[i].padEnd(colWidths.others);
            }

            if (i !== headerArray.length - 1)
                element = element.concat(this.colSeparator);
            printString = printString.concat(element);
        }

        console.log(printString);
    };

    static print = (account) => {
        if (!account || account.transactions.length === 0)
            throw new Error('Transactions not provided');

        const sortedTransactions = this.sortTransactions(account.transactions);
        const transactionBalances = this.getTransactionBalance(
            account.currentBalance,
            sortedTransactions
        );
        const formattedTransactions = this.formatTransactions(
            transactionBalances,
            sortedTransactions
        );
        this.printHeader();
        formattedTransactions.forEach((transaction) => {
            console.log(transaction);
        });
    };

    static formatTransactions = (balanceArray, sortedTransactions) => {
        const RESET_ANSI = '\x1b[0m';
        const RED_ANSI = '\x1b[0;31m';
        const GREEN_ANSI = '\x1b[0;32m';
        const colWidths = this.getColumnWidth();
        let formattedTransactions = [];

        for (let i = 0; i < sortedTransactions.length; i++) {
            let transaction = sortedTransactions[i];
            let transactionString = '';
            let balanceColour = balanceArray[i] >= 0 ? GREEN_ANSI : RED_ANSI;

            transactionString = this.formatDate(transaction.timestamp)
                .padEnd(colWidths.dateColumn)
                .concat(this.colSeparator);

            if (transaction.type === 'DEBIT') {
                transactionString = transactionString.concat(
                    ''.padEnd(colWidths.others),
                    this.colSeparator
                );

                transactionString = transactionString.concat(
                    RED_ANSI,
                    transaction.amount.toFixed(2).padEnd(colWidths.others),
                    RESET_ANSI,
                    this.colSeparator
                );
            } else {
                transactionString = transactionString.concat(
                    GREEN_ANSI,
                    transaction.amount.toFixed(2).padEnd(colWidths.others),
                    RESET_ANSI,
                    this.colSeparator
                );

                transactionString = transactionString.concat(
                    ''.padEnd(colWidths.others),
                    this.colSeparator
                );
            }

            transactionString = transactionString.concat(
                balanceColour,
                balanceArray[i].toFixed(2),
                RESET_ANSI
            );

            formattedTransactions = [
                ...formattedTransactions,
                transactionString,
            ];
        }

        return formattedTransactions;
    };

    static getTransactionBalance = (accountBalance, sortedTransactions) => {
        let remainingBalance = accountBalance;

        return sortedTransactions.slice(0, -1).reduce(
            (balances, transaction) => {
                if (transaction.type === 'DEBIT') {
                    remainingBalance += transaction.amount;
                } else {
                    remainingBalance -= transaction.amount;
                }
                return [...balances, remainingBalance];
            },
            [remainingBalance]
        );
    };

    // Implemented from
    // https://stackoverflow.com/questions/10123953/how-to-sort-an-object-array-by-date-property
    static sortTransactions = (transactionArray) => {
        let sortedArray = [...transactionArray];

        sortedArray.sort((a, b) => {
            return new Date(b.timestamp) - new Date(a.timestamp);
        });

        return sortedArray;
    };

    static formatDate = (dateObj) =>
        dateObj.toLocaleString('en-GB', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        });

    // Not enough time to make it dynamic
    static getColumnWidth = () => {
        return {
            dateColumn: '10/10/2021'.length,
            others: '100000000.00'.length,
        };
    };
}

export default Statement;
