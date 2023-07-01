import Account from '../src/Account.js';

describe('Account Class Tests', () => {
    let account;
    const testDate = new Date('2012-01-10');

    beforeEach(() => {
        account = new Account();
    });

    describe('Account instantiation tests', () => {
        it('should return 0 initial balance', () => {
            expect(account.currentBalance).toBe(0);
        });

        it('should return an empty array of transactions', () => {
            expect(account.transactions.length).toBe(0);
        });
    });

    describe('When deposit into account', () => {
        it('should return an error when the deposit amount is more than 2 decimal places', () => {
            expect(() => {
                account.deposit(testDate, 10.309);
            }).toThrowError('Invalid amount');
            expect(account.currentBalance).toBe(0);
        });

        it('should return an error if deposit amount is less than 0', () => {
            expect(() => {
                account.deposit(testDate, -5);
            }).toThrowError('Invalid amount');
            expect(account.currentBalance).toBe(0);
        });

        it('should return an error when the deposit date is invalid', () => {
            expect(() => {
                account.deposit('42/01/2021', 1000);
            }).toThrowError('Invalid date');
            expect(account.currentBalance).toBe(0);
        });

        it('should add to the account balance when deposit 1000', () => {
            account.deposit(testDate, 1000);

            expect(account.currentBalance).toBe(1000);
        });

        it('should check that the transaction is recorded after a successful deposit', () => {
            account.deposit(testDate, 500);

            expect(account.transactions.at(-1).amount).toBe(500);
        });
    });

    describe('When withdraw from account', () => {
        // it('should return an error if withdraw amount is more than account balance', () => {
        //     expect(account.currentBalance).toBe(0);
        //     expect(() => {
        //         account.withdraw(5000);
        //     }).toThrowError('Insufficient balance');
        // });

        it('should return an error when the withdraw amount is more than 2 decimal places', () => {
            expect(() => {
                account.withdraw(testDate, 10.309);
            }).toThrowError('Invalid amount');
            expect(account.currentBalance).toBe(0);
        });

        it('should return an error if withdraw amount is less than 0', () => {
            expect(() => {
                account.withdraw(testDate, -5);
            }).toThrowError('Invalid amount');
            expect(account.currentBalance).toBe(0);
        });

        it('should withdraw from account balance provided there is sufficient balance', () => {
            expect(account.currentBalance).toBe(0);
            account.deposit(testDate, 1000);
            expect(account.currentBalance).toBe(1000);

            account.withdraw(testDate, 200);
            expect(account.currentBalance).toBe(800);
        });

        it('should check that the transaction is recorded after a successful withdraw', () => {
            expect(account.currentBalance).toBe(0);
            account.deposit(testDate, 1000);
            expect(account.currentBalance).toBe(1000);

            account.withdraw(testDate, 200);
            expect(account.currentBalance).toBe(800);

            expect(account.transactions.at(-1).amount).toBe(200);
        });
    });

    describe('When request to view bank account statement', () => {
        let consoleLogSpy;

        beforeEach(() => {
            consoleLogSpy = spyOn(console, 'log');
        });

        it('should console log transaction', () => {
            account.deposit(testDate, 10000);
            account.printStatement(account);
            expect(consoleLogSpy).toHaveBeenCalled();
        });
    });
});
