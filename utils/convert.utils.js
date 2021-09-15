const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");

/**
 * convertToType
 * @param {*} image - image
 * @param {'avif' | 'webp' | 'jpeg'} type - output type
 * @param {object} resizeOptions - resizeOptions
 */
async function convertToType(imagePath, type = "webp", resizeOptions) {
  if (!imagePath) {
    throw "imagePath is not defined";
  }
  const [dir] = imagePath.split("/");
  const imageId = uuidv4();
  const filePath = `${dir}/${imageId}.${type}`;
  switch (type) {
    case "webp":
      return new Promise((resolve, reject) =>
        sharp(imagePath)
          .webp()
          .resize(resizeOptions)
          .toFile(`${dir}/${imageId}.${type}`, (err, info) => {
            if (err) {
              console.error(err);
              reject(err);
            }
            resolve({ id: imageId, info, filePath });
          })
      );
    case "avif":
      return new Promise((resolve, reject) =>
        sharp(imagePath)
          .avif()
          .resize(resizeOptions)
          .toFile(`${dir}/${imageId}.${type}`, (err, info) => {
            if (err) {
              console.error(err);
              reject(err);
            }
            resolve({ id: imageId, info, filePath });
          })
      );
    case "jpeg":
      return new Promise((resolve, reject) =>
        sharp(imagePath)
          .jpeg()
          .resize(resizeOptions)
          .toFile(`${dir}/${imageId}.${type}`, (err, info) => {
            if (err) {
              console.error(err);
              reject(err);
            }
            resolve({ id: imageId, info, filePath });
          })
      );
    default:
      return new Promise((_resolve, reject) =>
        reject(`Type ${type} is not defined`)
      );
  }
}

module.exports = {
  convertToType,
};
