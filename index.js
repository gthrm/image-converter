const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { convertToType } = require('./utils/convert.utils');
const { logger } = require('./utils/logger.utils');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const upload = multer({ dest: 'uploads/' }).single('upload');

const app = express();

// Views in public directory
app.use(express.static('public'));

app.get('/', (_request, response) => {
  response.sendFile(`${__dirname}/public/index.html`);
});

app.post('/upload', (request, response) => {
  upload(request, response, (error) => {
    if (error) {
      logger.error(error);
      return response.send(error);
    }
    const { imageType, imageSize } = request.body;
    return convertToType(request?.file?.path, imageType, imageSize)
      .then(({ filePath }) => {
        fs.unlink(request.file.path, () => response.sendFile(path.join(__dirname, filePath)));
      })
      .catch((err) => {
        logger.error('err.', err);
        response.send('Upload error');
      });
  });
});

const server = app.listen(PORT, () => {
  const devText = process.env.NODE_ENV !== 'production' ? 'Open chrome://inspect to debug' : '';
  logger.info(
    `Server listening on http://localhost:${
      server.address().port
    }. ${devText}`,
  );
});
