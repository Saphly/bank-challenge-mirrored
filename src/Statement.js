const SEPARATOR = ' || ';
const DATE_COL_WIDTH = '10/10/2021'.length;
const NUMERIC_COL_WIDTH = '100000000.00'.length;
const RESET_ANSI = '\x1b[0m';
export const RED_ANSI = '\x1b[0;31m';
export const GREEN_ANSI = '\x1b[0;32m';

// See https://stackoverflow.com/questions/10123953/how-to-sort-an-object-array-by-date-property
export const reverseChronologicalOrder = (a, b) => b.timestamp - a.timestamp;

class Statement {
    static printHeader = () => {
        const formattedHeaders = ['date', 'credit', 'debit', 'balance'].map(
            (header) =>
                header.padEnd(
                    header === 'date' ? DATE_COL_WIDTH : NUMERIC_COL_WIDTH
                )
        );
        console.log(formattedHeaders.join(SEPARATOR));
    };

    static print = (account) => {
        if (!account || account.transactions.length === 0)
            throw new Error('Transactions not provided');

        const statementRows = this.getStatementRows(account);
        const formattedStatementRows = this.formatStatementRows(statementRows);

        this.printHeader();
        formattedStatementRows.forEach((row) => {
            console.log(row);
        });
    };

    static getStatementRows = (account) => {
        const reverseChronologicalTransactions = account.transactions.sort(
            reverseChronologicalOrder
        );

        let remainingBalance = account.currentBalance;
        let statementRows = [];

        reverseChronologicalTransactions.forEach((trx) => {
            const credit = trx.type === 'CREDIT' ? trx.amount : 0;
            const debit = trx.type === 'DEBIT' ? trx.amount : 0;
            let statementRow = {
                date: trx.timestamp,
                credit,
                debit,
                balance: remainingBalance,
            };
            statementRows = [...statementRows, statementRow];
            remainingBalance += debit - credit;
        });

        return statementRows;
    };

    static formatStatementRows = (statementRows) => {
        return statementRows.map((row) =>
            [
                this.formatDate(row.date),
                this.formatCredit(row.credit),
                this.formatDebit(row.debit),
                this.formatBalance(row.balance),
            ].join(`${RESET_ANSI}${SEPARATOR}`)
        );
    };

    static formatDate = (dateObj) => {
        let formattedDate = dateObj.toLocaleString('en-GB', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        });
        return `${RESET_ANSI}${formattedDate.padEnd(DATE_COL_WIDTH)}`;
    };

    static formatDebit = (debitAmount) => {
        let formattedAmount = debitAmount === 0 ? '' : debitAmount.toFixed(2);
        return `${RED_ANSI}${formattedAmount.padEnd(NUMERIC_COL_WIDTH)}`;
    };

    static formatCredit = (creditAmount) => {
        let formattedAmount = creditAmount === 0 ? '' : creditAmount.toFixed(2);
        return `${GREEN_ANSI}${formattedAmount.padEnd(NUMERIC_COL_WIDTH)}`;
    };

    static formatBalance = (balance) => {
        return `${balance < 0 ? RED_ANSI : GREEN_ANSI}${balance
            .toFixed(2)
            .padEnd(NUMERIC_COL_WIDTH)}`;
    };
}

export default Statement;
