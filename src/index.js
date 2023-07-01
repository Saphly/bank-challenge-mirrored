import Statement from './Statement.js';
const mockAccount = {
    currentBalance: 2400,
    transactions: [
        { timestamp: new Date('2021-01-10'), amount: 400, type: 'CREDIT' },
        { timestamp: new Date('2021-01-20'), amount: 1000, type: 'DEBIT' },
        { timestamp: new Date('2021-01-25'), amount: 3000, type: 'CREDIT' },
    ],
};

// Statement.printHeader();
// Statement.formatDate(new Date('2012-01-08'));
// Statement.print(mockAccount);
// Statement.sortTransactions(mockAccount.transactions);
// Statement.formatTransactions(5000, [
//     { timestamp: new Date('2021-01-10'), amount: 400, type: 'CREDIT' },
//     { timestamp: new Date('2021-01-20'), amount: 1000, type: 'DEBIT' },
//     { timestamp: new Date('2021-01-25'), amount: 3000, type: 'CREDIT' },
// ]);

Statement.print(mockAccount);
