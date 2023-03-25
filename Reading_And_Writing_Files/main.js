'use strict';

const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, 'starter.txt'), 'utf-8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

console.log('Hello....');

fs.writeFile(path.join(__dirname, 'reply.txt'), 'Nice To Meet You', (err) => {
  if (err) throw err;
  console.log('Write Complete');

  fs.appendFile(path.join(__dirname, 'reply.txt'), '\n\nYes it is', (err) => {
    if (err) throw err;
    console.log('Append Complete');

    fs.rename(
      path.join(__dirname, 'reply.txt'),
      path.join(__dirname, 'newreply.txt'),
      (err) => {
        if (err) throw err;
        console.log('Rename Complete');
      }
    );
  });
});

//Exit on uncaught errors

process.on('uncaughtException', (err) => {
  console.error(`There was an uncaught error:${err}`);
  process.exit(1);
});
