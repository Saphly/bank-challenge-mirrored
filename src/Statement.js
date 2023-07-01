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
        const colWidths = this.getColumnWidth();
        let formattedTransactions = [];

        for (let i = 0; i < sortedTransactions.length; i++) {
            let transaction = sortedTransactions[i];
            let transactionString = '';

            transactionString = this.formatDate(transaction.timestamp)
                .padEnd(colWidths.dateColumn)
                .concat(this.colSeparator);

            if (transaction.type === 'DEBIT') {
                transactionString = transactionString.concat(
                    ''.padEnd(colWidths.others),
                    this.colSeparator
                );

                transactionString = transactionString.concat(
                    transaction.amount.toFixed(2).padEnd(colWidths.others),
                    this.colSeparator
                );

                transactionString = transactionString.concat(
                    balanceArray[i].toFixed(2)
                );
            } else {
                transactionString = transactionString.concat(
                    transaction.amount.toFixed(2).padEnd(colWidths.others),
                    this.colSeparator
                );

                transactionString = transactionString.concat(
                    ''.padEnd(colWidths.others),
                    this.colSeparator
                );

                transactionString = transactionString.concat(
                    balanceArray[i].toFixed(2)
                );
            }
            formattedTransactions = [
                ...formattedTransactions,
                transactionString,
            ];
        }

        return formattedTransactions;
    };

    static getTransactionBalance = (accountBalance, sortedTransactions) => {
        let balanceArr = [];
        let remainingBalance = accountBalance;

        for (let i = 0; i < sortedTransactions.length; i++) {
            if (i === 0) {
                balanceArr = [...balanceArr, accountBalance];
                continue;
            }

            if (sortedTransactions[i].type === 'DEBIT') {
                remainingBalance -= sortedTransactions[i - 1].amount;
            } else {
                remainingBalance += sortedTransactions[i - 1].amount;
            }
            balanceArr = [...balanceArr, remainingBalance];
        }

        return balanceArr;
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

    static formatDate = (dateObj) => {
        let day = dateObj.getDate();
        let month = dateObj.getMonth() + 1;
        let year = dateObj.getFullYear();

        let formattedDay = day < 10 ? `0${day}` : day;
        let formattedMonth = month < 10 ? `0${month}` : month;

        return `${formattedDay}/${formattedMonth}/${year}`;
    };

    // Not sure how to set it to have widest/dynamic widths
    static getColumnWidth = () => {
        return {
            dateColumn: '10/10/2021'.length,
            others: '100000000.00'.length,
        };
    };
}

export default Statement;
