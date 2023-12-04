const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const { logger } = require('./logger.utils');
require('dotenv').config();

const PRED_OPT = 1920;
/**
 * convertToType
 * @param {*} image - image
 * @param {'avif' | 'webp' | 'jpeg'} type - output type
 * @param {object} resizeOptions - resizeOptions
 */
async function convertToType(imagePath, type = 'webp', resizeOptions = PRED_OPT) {
  if (!imagePath) {
    throw new Error('imagePath is not defined');
  }
  const [dir] = imagePath.split('/');
  const imageId = uuidv4();
  const filePath = `${dir}/${imageId}.${type}`;
  switch (type) {
    case 'webp':
      return new Promise((resolve, reject) => sharp(imagePath)
        .webp()
        .resize(resizeOptions)
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
        .resize(resizeOptions)
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
        .resize(resizeOptions)
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
