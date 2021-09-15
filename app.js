// use for CLI
const fs = require("fs");
const { convertToType } = require("./utils/convert.utils");

const DIR = "./data"; // input dir for images
const PREW_OPT = { height: 480, width: 640 };

fs.readdir(DIR, (err, files) => {
  if (err) {
    console.error(err);
  }
  files.forEach(async (file) => {
    const path = `${DIR}/${file}`;
    await convertToType(path, "webp");
    await convertToType(path, "avif");
    await convertToType(path, "jpg", PREW_OPT);
  });
});
