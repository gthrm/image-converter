// use for CLI
const fs = require('fs');
const { convertToType } = require('./utils/convert.utils');
const { logger } = require('./utils/logger.utils');
require('dotenv').config();

const DIR = './data'; // input dir for images

fs.readdir(DIR, async (err, files) => {
  if (err) {
    logger.error(err);
    throw new Error(err);
  }

  for await (const file of files) {
    const path = `${DIR}/${file}`;
    await convertToType(path, 'webp');
    await convertToType(path, 'avif');
    await convertToType(path, 'jpeg');
  }
});
