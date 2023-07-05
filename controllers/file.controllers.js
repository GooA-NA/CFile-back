const File = require("../models/File.models");
const User = require("../models/User.models");
require("dotenv").config();
const fileService = require("../services/fileService");

module.exports.fileControllers = {
  createDir: async (req, res) => {
    try {
      const { name, type, parent, userId } = req.body;
      const file = await File.create({
        name: name,
        type: type,
        parent: parent,
        user: userId,
      });
      const parentFile = await File.findOne({ _id: parent });
      if (!parentFile) {
        file.path = name;
        await fileService.createDir(file);
      } else {
        file.path = `${parentFile.path}\\${file.name}`;
        await fileService.createDir(file);
        parentFile.childs.push(file._id);
        await parentFile.save();
      }
      await file.save;
      return res.json(file);
    } catch (error) {
      console.log(e);
      return res.status(400).json(e);
    }
  },

  getFiles: async (req, res) => {
    try {
      const files = await File.find({
        user: req.body.userId,
      });
      return res.json({ files });
    } catch (e) {
      return res.status(500).json({ message: "Can not get Files" });
    }
  },
  uploadFile: async (req, res) => {
    try {
      const file = req.files.file;

      const parent = await File.findOne({
        user: req.params.id,
        _id: req.body.parent,
      });
      console.log(parent, 'otec vu')
      const user = await User.findOne({_id: req.params.id})
      console.log(user, 'user vu');
      let path;

      if (parent) {
        path = `${process.env.FILEPATH}\\${user._id}\\${parent.name}\\${file.name}`;
      } else {
        path = `${process.env.FILEPATH}\\${user._id}\\${file.name}`;
      }

      file.mv(path);

      const type = file.name.split(".").pop();
      const dbFile = new File({
        name: file.name,
        type,
        path: parent?.path,
        parent: parent?._id,
        user: user._id,
      });

      await dbFile.save();
      res.json(dbFile);
    } catch (e) {
      return res.status(500).json({ message: "Upload error" });
    }
  },
};
