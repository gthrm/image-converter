const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const { logger } = require('./logger.utils');
require('dotenv').config();

const sizeOptions = {
  full: null, // Original size
  medium: 1200, // Medium size
  small: 800, // Small size
  thumbnail: 400, // Thumbnail size
};

/**
 * convertToType
 * @param {*} image - image
 * @param {'avif' | 'webp' | 'jpeg'} type - output type
 * @param {object} resizeOptions - resizeOptions
 */
async function convertToType(imagePath, type = 'webp', imageSize = 'full') {
  if (!imagePath) {
    throw new Error('imagePath is not defined');
  }
  const [dir] = imagePath.split('/');
  const imageId = uuidv4();
  const filePath = `${dir}/${imageId}.${type}`;
  const resizeOption = sizeOptions[imageSize];
  switch (type) {
    case 'webp':
      return new Promise((resolve, reject) => sharp(imagePath)
        .webp()
        .resize(resizeOption)
        .toFile(`${dir}/${imageId}.${type}`, (err, info) => {
          if (err) {
            logger.error(err);
            reject(err);
          }
          resolve({ id: imageId, info, filePath });
          logger.info(`${imagePath} have been converted successfully`);
        }));
    case 'avif':
      return new Promise((resolve, reject) => sharp(imagePath)
        .avif()
        .resize(resizeOption)
        .toFile(`${dir}/${imageId}.${type}`, (err, info) => {
          if (err) {
            logger.error(err);
            reject(err);
          }
          resolve({ id: imageId, info, filePath });
          logger.info(`${imagePath} have been converted successfully`);
        }));
    case 'jpeg':
      return new Promise((resolve, reject) => sharp(imagePath)
        .jpeg()
        .resize(resizeOption)
        .toFile(`${dir}/${imageId}.${type}`, (err, info) => {
          if (err) {
            logger.error(err);
            reject(err);
          }
          resolve({ id: imageId, info, filePath });
          logger.info(`${imagePath} have been converted successfully`);
        }));
    default:
      return new Promise((_resolve, reject) => reject(new Error(`Type ${type} is not defined`)));
  }
}

module.exports = {
  convertToType,
};
