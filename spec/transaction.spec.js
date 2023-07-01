import Transaction from '../src/Transaction.js';

describe('Transaction Class Tests', () => {
    let transaction;
    const firstDate = new Date('2012-01-10');

    describe('Transaction instantiation tests', () => {
        // it has to be this specific format
        it('should return an error if given invalid date', () => {
            expect(
                () => new Transaction(new Date('2023-01-43'), 5)
            ).toThrowError('Invalid date');
        });

        it('should instantiate with a date', () => {
            // jasmine.clock().install();
            // let mockDate = jasmine.clock().mockDate(new Date(firstDate));
            transaction = new Transaction(firstDate, 5, 'CREDIT');
            expect(transaction.timestamp).toEqual(firstDate);

            // jasmine.clock().uninstall();
        });

        it('should return an error if amount is not a number', () => {
            expect(() => new Transaction(firstDate, 'amount')).toThrowError(
                'Invalid amount'
            );
        });

        it('should return an error if amount more than 2 decimal places', () => {
            expect(
                () => new Transaction(firstDate, 10.1223, 'CREDIT')
            ).toThrowError('Invalid amount');
        });

        it('should return an error if amount is less than 0', () => {
            expect(() => new Transaction(firstDate, -5)).toThrowError(
                'Invalid amount'
            );
        });

        it('should return an error if transaction type is not DEBIT or CREDIT', () => {
            expect(() => new Transaction(firstDate, 10, 'CHECK')).toThrowError(
                'Invalid transaction type'
            );
        });
    });
});
