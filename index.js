const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { convertToType } = require("./utils/convert.utils");

const PORT = process.env.PORT || 3000;

const upload = multer({ dest: "uploads/" }).single("upload");

const app = express();

// Views in public directory
app.use(express.static("public"));

app.get("/", function (_request, response) {
  response.sendFile(__dirname + "/public/index.html");
});

app.post("/upload", (request, response) => {
  upload(request, response, (error) => {
    if (error) {
      console.error(error);
      return response.send(error);
    }
    const { imageType } = request.body;
    convertToType(request?.file?.path, imageType)
      .then(({ filePath }) => {
        fs.unlink(request.file.path, () => response.sendFile(path.join(__dirname, filePath) ));
      })
      .catch((err) => {
        console.error("err.", err);
        response.send("Upload error");
      });
  });
});

const server = app.listen(PORT, function () {
  console.log(
    `Server listening on http://localhost:${
      server.address().port
    }. Open chrome://inspect to debug`
  );
});
