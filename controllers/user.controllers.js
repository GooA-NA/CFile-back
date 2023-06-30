const User = require("../models/User.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const File = require("../models/File.models");
const fileService = require("../services/fileService");

module.exports.userControllers = {
  addUser: async (req, res) => {
    const { firstName, lastName, password, email } = req.body;
    console.log(1);
    try {
      console.log(2);

      const hash = bcrypt.hashSync(password, 10);
      const user = await User.create({
        firstName: firstName,
        lastName: lastName,
        password: hash,
        email: email,
      });
      await fileService.createDir(new File({ user: user.id, naem: "" }));
      res.json(user);
    } catch (error) {
      res.json({ error: error + "Ошибка добавления" });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const data = await User.find();
      res.json(data);
    } catch (error) {
      res.json(error);
    }
  },

  login: async (req, res) => {
    try {
      const { firstName, password } = req.body;
      const candidate = await User.findOne({ firstName });
      if (!candidate) {
        return res.status(401).json("Неверный логин");
      }

      const valid = await bcrypt.compareSync(password, candidate.password);
      if (!valid) {
        return res.status(401).json("Неверный пароль");
      }

      const token = {
        _id: candidate._id,
        firstName: candidate.firstName,
        lastName: candidate.lastName,
        email: candidate.email,
      };
      // const name = candidate._id;

      // const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
      //   expiresIn: "24h",
      // });

      res.json({ token });
    } catch (error) {
      res.json(error);
    }
  },
  updateUser: async (req, res) => {
    try {
      const { userId, firstName, lastName, email } = req.body;
      const user = await User.findByIdAndUpdate(
         userId ,
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
        }
      );
      res.json({ user });
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
};
