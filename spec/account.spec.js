import Account from '../src/Account.js';

describe('Account Class Tests', () => {
    let account;

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
                account.deposit(10.309);
            }).toThrowError('Amount can only be up to 2 decimal places');
            expect(account.currentBalance).toBe(0);
        });

        it('should return an error if deposit amount is less than 0', () => {
            expect(() => {
                account.deposit(-5);
            }).toThrowError('Amount has to be more than 0');
            expect(account.currentBalance).toBe(0);
        });

        it('should add to the account balance when deposit 1000', () => {
            account.deposit(1000);

            expect(account.currentBalance).toBe(1000);
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
                account.withdraw(10.309);
            }).toThrowError('Amount can only be up to 2 decimal places');
            expect(account.currentBalance).toBe(0);
        });

        it('should return an error if withdraw amount is less than 0', () => {
            expect(() => {
                account.withdraw(-5);
            }).toThrowError('Amount has to be more than 0');
            expect(account.currentBalance).toBe(0);
        });

        it('should withdraw from account balance provided there is sufficient balance', () => {
            expect(account.currentBalance).toBe(0);
            account.deposit(1000);
            expect(account.currentBalance).toBe(1000);

            account.withdraw(200);
            expect(account.currentBalance).toBe(800);
        });
    });
});
