import Statement from '../src/Statement.js';

describe('Statement Class Tests', () => {
    let consoleLogSpy, printHeaderSpy;

    const mockAccount = {
        currentBalance: 2400,
        transactions: [
            { timestamp: new Date('2021-01-10'), amount: 400, type: 'CREDIT' },
            { timestamp: new Date('2021-01-20'), amount: 1000, type: 'DEBIT' },
            { timestamp: new Date('2021-01-25'), amount: 3000, type: 'CREDIT' },
        ],
    };

    describe('When printing', () => {
        beforeEach(() => {
            consoleLogSpy = spyOn(console, 'log');
            printHeaderSpy = spyOn(Statement, 'printHeader');
        });

        it('should return an error if an array was not passed as an argument', () => {
            expect(() => Statement.print()).toThrowError(
                'Transactions not provided'
            );
        });

        it('should print the header first', () => {
            Statement.print(mockAccount);

            expect(printHeaderSpy).toHaveBeenCalled();
        });

        it('should console.log all transactions', () => {
            Statement.print(mockAccount);

            expect(consoleLogSpy).toHaveBeenCalledTimes(
                mockAccount.transactions.length
            );
        });
    });

    describe('When calculating balance for each transaction', () => {
        it('should get account current balance for latest transaction', () => {
            let sortedTransactions = Statement.sortTransactions(
                mockAccount.transactions
            );

            let balanceArr = Statement.getTransactionBalance(
                mockAccount.currentBalance,
                sortedTransactions
            );

            expect(balanceArr[0]).toBe(mockAccount.currentBalance);
        });

        it('should get oldest transaction amount as oldest transaction balance', () => {
            let sortedTransactions = Statement.sortTransactions(
                mockAccount.transactions
            );

            let balanceArr = Statement.getTransactionBalance(
                mockAccount.currentBalance,
                sortedTransactions
            );

            expect(balanceArr.at(-1)).toBe(sortedTransactions.at(-1).amount);
        });
    });

    describe('When formatting transactions array', () => {
        const RED_ANSI = '\x1b[0;31m';
        const GREEN_ANSI = '\x1b[0;32m';
        let sortedTransactions, balanceArr;

        beforeEach(() => {
            sortedTransactions = Statement.sortTransactions(
                mockAccount.transactions
            );

            balanceArr = Statement.getTransactionBalance(
                mockAccount.currentBalance,
                sortedTransactions
            );
        });

        it('should return array of strings', () => {
            let formattedArr = Statement.formatTransactions(
                balanceArr,
                sortedTransactions
            );

            expect(formattedArr.length).toBe(mockAccount.transactions.length);
            expect(formattedArr[0]).toContain('2400');
        });

        it('should return formatted strings with ANSI colour code', () => {
            let formattedArr = Statement.formatTransactions(
                balanceArr,
                sortedTransactions
            );

            expect(formattedArr[0]).toContain(GREEN_ANSI);
            expect(formattedArr[1]).toContain(RED_ANSI);
        });
    });

    describe('When sorting transactions', () => {
        it('should sort transaction to be newest to oldest transactions', () => {
            let sortedArr = Statement.sortTransactions(
                mockAccount.transactions
            );
            expect(sortedArr[0].timestamp).toEqual(new Date('2021-01-25'));
        });
    });

    describe('When printing the header', () => {
        beforeEach(() => {
            consoleLogSpy = spyOn(console, 'log');
        });

        it('should call console.log', () => {
            Statement.printHeader();

            expect(consoleLogSpy).toHaveBeenCalled();
        });
    });

    it('should return a date string when given a Date object', () => {
        expect(Statement.formatDate(new Date('2012-01-10'))).toBe('10/01/2012');
    });
});
