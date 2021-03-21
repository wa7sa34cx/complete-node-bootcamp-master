const fs = require('fs');
const crypto = require('crypto');

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 2;

setTimeout(() => console.log('Time 1 finished'), 2000);
setImmediate(() => console.log('Immediate 1 finished'));

fs.readFile('test-file.txt', () => {
  console.log('I/O finished');

  setTimeout(() => console.log('Time 2 finished'), 2000);
  setTimeout(() => console.log('Time 3 finished'), 3000);
  setImmediate(() => console.log('Immediate 2 finished'));

  process.nextTick(() => console.log('Process NextTick'));

  crypto.pbkdf2Sync('iewu32yyn23TTmn', 'salt3', 100000, 1024, 'sha512');
  console.log('Password encripted', Date.now() - start);

  crypto.pbkdf2('iewu32yyn23TTmn', 'salt3', 100000, 1024, 'sha512', () =>
    console.log('Password encripted', Date.now() - start)
  );

  crypto.pbkdf2('iewu32yyn23TTmn', 'salt3', 100000, 1024, 'sha512', () =>
    console.log('Password encripted', Date.now() - start)
  );

  crypto.pbkdf2('iewu32yyn23TTmn', 'salt3', 100000, 1024, 'sha512', () =>
    console.log('Password encripted', Date.now() - start)
  );
});

console.log('Hello from top-level code');
