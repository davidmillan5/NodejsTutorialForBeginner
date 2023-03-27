'use strict';

const fs = require('fs'),
  rs = fs.createReadStream('./Reading_And_Writing_Files/lorem.txt', {
    encoding: 'utf8',
  }),
  ws = fs.createWriteStream('./Reading_And_Writing_Files/new-lorem.txt');

// rs.on('data', (dataChunk) => {
//   ws.write(dataChunk);
// });

rs.pipe(ws);
