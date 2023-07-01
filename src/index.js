import Account from './Account.js';
import Statement from './Statement.js';

console.log('Steph opens a new bank account.\n');
const stephAccount = new Account();

console.log('Steph then deposits GBP 1,000 into the account on 10/01/2012.');
stephAccount.deposit(new Date('2012-01-10'), 1000);

console.log(
    'Steph deposits another GBP 2,000 into the account three days later on 13/01/2012.'
);
stephAccount.deposit(new Date('2012-01-13'), 2000);

console.log('She then withdrew GBP 500 the next day.');
stephAccount.withdraw(new Date('2012-01-14'), 500);

Statement.print(stephAccount);
