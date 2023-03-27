'use strict';

const fsPromises = require('fs').promises;
const path = require('path');

const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, 'starter.txt'),
      'utf-8'
    );
    console.log(data);
    await fsPromises.unlink(path.join(__dirname, 'starter.txt'));
    await fsPromises.writeFile(path.join(__dirname, 'promiseWrite.txt'), data);
    await fsPromises.appendFile(
      path.join(__dirname, 'promiseWrite.txt'),
      '\n\nNice to meet you.'
    );
    await fsPromises.rename(
      path.join(__dirname, 'promiseWrite.txt'),
      path.join(__dirname, 'promiseComplete.txt')
    );
    const newData = await fsPromises.readFile(
      path.join(__dirname, 'promiseComplete.txt'),
      'utf-8'
    );
    console.log(newData);
  } catch (err) {
    console.log(err);
  }
};

fileOps();

// fs.readFile(path.join(__dirname, 'starter.txt'), 'utf-8', (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// fs.writeFile(path.join(__dirname, 'reply.txt'), 'Nice To Meet You', (err) => {
//   if (err) throw err;
//   console.log('Write Complete');

//   fs.appendFile(path.join(__dirname, 'reply.txt'), '\n\nYes it is', (err) => {
//     if (err) throw err;
//     console.log('Append Complete');

//     fs.rename(
//       path.join(__dirname, 'reply.txt'),
//       path.join(__dirname, 'newreply.txt'),
//       (err) => {
//         if (err) throw err;
//         console.log('Rename Complete');
//       }
//     );
//   });
// });

//Exit on uncaught errors

process.on('uncaughtException', (err) => {
  console.error(`There was an uncaught error:${err}`);
  process.exit(1);
});
