const User = require('./models/User');
const Role = require('./models/Role');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { secret } = require('./config');

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, secret, { expiresIn: '24h' });
};

class AuthController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: 'Ошибка при регистрации', errors });
      }
      const { username, password, gitHubUrl } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res
          .status(400)
          .json({ message: 'Польлзователь с таким именем уже существует' });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({ value: 'USER' });
      const user = new User({
        username,
        password: hashPassword,
        gitHubUrl,
        roles: [userRole.value],
      });
      await user.save();
      return res.json({ message: 'Пользователь успешно зарегистрирован' });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Ошибка при регистрации' });
    }
  }
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ message: `Пользователь ${username} не найден` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: 'Введен неверный пароль' });
      }
      const token = generateAccessToken(user._id, user.roles);
      return res.json({ token, status: 'Успешно прошел' });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Ошибка при входе' });
    }
  }
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (e) {
      console.log(e);
    }
  }
  async updateProfile(req, res) {
    try {
      const { gitHubUrl } = req.body;
      const userId = req.user.id;

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { gitHubUrl },
        { new: trur },
      ).select('-password');

      return res.json(updatedUser);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Ошибка при обновлении профиля' });
    }
  }
}

module.exports = new AuthController();
