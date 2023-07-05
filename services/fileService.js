const fs = require("fs");
require("dotenv").config();

class FileService {
  createDir(file) {
    
    const filePath = `${process.env.FILEPATH}\\${file.user}\\${file.path}`;
    return new Promise((resolve, reject) => {
      try {
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath);
          return resolve({ message: "File was created" });
        } else {
          return reject({ message: "File alredy exist" });
        }
      } catch (e) {
        return reject({ message: "File error" });
      }
    });
  }
}

module.exports = new FileService();
