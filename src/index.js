import Account from './Account.js';
import Statement from './Statement.js';

console.log();
console.log('Sven opens a new bank account.');
const svenAccount = new Account();

console.log('Sven deposits GBP 1,000 into the account on 10/01/2012.');
svenAccount.deposit(new Date('2012-01-10'), 1000);

console.log(
    'He deposits another GBP 2,000 into the account three days later on 13/01/2012.'
);
svenAccount.deposit(new Date('2012-01-13'), 2000);

console.log('He then withdrew GBP 500 the next day.');
svenAccount.withdraw(new Date('2012-01-14'), 500);

console.log('And he requested to view her latest bank statement.\n');
Statement.print(svenAccount);
