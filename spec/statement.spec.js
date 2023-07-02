import Statement, {
    reverseChronologicalOrder,
    RED_ANSI,
    GREEN_ANSI,
} from '../src/Statement.js';

describe('Statement Class Tests', () => {
    let consoleLogSpy;

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
        });

        it('should return an error if an array was not passed as an argument', () => {
            expect(() => Statement.print()).toThrowError(
                'Transactions not provided'
            );
        });

        it('should print the header first', () => {
            Statement.print(mockAccount);

            expect(consoleLogSpy.calls.argsFor(0)[0]).toBe(
                'date       || credit       || debit        || balance     '
            );
        });

        it('should print all transactions in reverse chronological order', () => {
            Statement.print(mockAccount);

            // no. of transactions + header row
            expect(consoleLogSpy).toHaveBeenCalledTimes(
                mockAccount.transactions.length + 1
            );

            expect(consoleLogSpy.calls.argsFor(1)[0]).toContain('25/01/2021');
            expect(consoleLogSpy.calls.argsFor(2)[0]).toContain('20/01/2021');
            expect(consoleLogSpy.calls.argsFor(3)[0]).toContain('10/01/2021');
        });

        it('should print debit columns in red', () => {
            Statement.print(mockAccount);
            expect(consoleLogSpy.calls.argsFor(1)[0]).toContain(RED_ANSI);
            expect(consoleLogSpy.calls.argsFor(2)[0]).toContain(
                `${RED_ANSI}1000.00`
            );
            expect(consoleLogSpy.calls.argsFor(3)[0]).toContain(RED_ANSI);
        });

        it('should print credit columns in green', () => {
            Statement.print(mockAccount);
            expect(consoleLogSpy.calls.argsFor(1)[0]).toContain(
                `${GREEN_ANSI}3000.00`
            );
            expect(consoleLogSpy.calls.argsFor(2)[0]).toContain(GREEN_ANSI);
            expect(consoleLogSpy.calls.argsFor(3)[0]).toContain(
                `${GREEN_ANSI}400.00`
            );
        });

        it('should print balance columns in green if it is positive, and red otherwise', () => {
            Statement.print(mockAccount);
            expect(consoleLogSpy.calls.argsFor(1)[0]).toContain(
                `${GREEN_ANSI}2400.00`
            );
            expect(consoleLogSpy.calls.argsFor(2)[0]).toContain(
                `${RED_ANSI}-600.00`
            );
            expect(consoleLogSpy.calls.argsFor(3)[0]).toContain(
                `${GREEN_ANSI}400.00`
            );
        });
    });

    describe('When calculating balances for a transaction', () => {
        it('should equal the previous balance less any debit and plus any credit', () => {
            const chronologicalStatementRows = Statement.getStatementRows(
                mockAccount
            ).sort((a, b) => a.date - b.date);

            chronologicalStatementRows.slice(1).forEach((row, prevRowIdx) => {
                const prevRow = chronologicalStatementRows[prevRowIdx];
                expect(row.balance).toBe(
                    prevRow.balance - row.debit + row.credit
                );
            });
        });

        it('the final balance should equal the account current balance', () => {
            const chronologicalStatementRows = Statement.getStatementRows(
                mockAccount
            ).sort((a, b) => a.date - b.date);

            expect(chronologicalStatementRows.slice(-1)[0].balance).toBe(
                mockAccount.currentBalance
            );
        });
    });

    describe('When sorting transactions', () => {
        it('should sort transaction to be newest to oldest transactions', () => {
            expect(
                mockAccount.transactions.sort(reverseChronologicalOrder)[0]
                    .timestamp
            ).toEqual(new Date('2021-01-25'));
        });
    });

    describe('Format transaction details', () => {
        it('should return a date string with a reset ANSI colour code when given a Date object', () => {
            const date = new Date('2012-01-10');
            expect(Statement.formatDate(date)).toContain('\x1b[0m10/01/2012');
        });

        it('should return a string with red ANSI colour code when formatting the debit amount', () => {
            expect(Statement.formatDebit(500)).toContain('\x1b[0;31m500');
        });

        it('should return a string with green ANSI colour code when formatting the credit amount', () => {
            expect(Statement.formatCredit(500)).toContain('\x1b[0;32m500');
        });

        it('should return a string with green ANSI colour code when formatting a non-negative balance', () => {
            expect(Statement.formatBalance(0)).toContain('\x1b[0;32m0');
        });

        it('should return a string with red ANSI colour code when formatting a negative balance', () => {
            expect(Statement.formatBalance(-100)).toContain('\x1b[0;31m-100');
        });
    });
});
