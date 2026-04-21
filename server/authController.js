const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { secret } = require('./config');

const generateAccessToken = (id) => {
  const payload = {
    id,
  };
  return jwt.sign(payload, secret, { expiresIn: '24h' });
};

class AuthController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = errors.array()[0];
        return res.status(400).json({
          message: error.msg,
          field: error.path,
        });
      }

      const { firstname, lastname, email, password, gitHubUrl } = req.body;

      const candidate = await User.findOne({ email });
      const validate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!validate) {
        return res.status(400).json({
          message: 'Проверьте знаки "@" и "."',
          field: 'email',
        });
      }
      if (candidate) {
        return res.status(400).json({
          message: 'Пользователь c такой почтой уже существует',
          field: 'email',
        });
      }

      const hashPassword = bcrypt.hashSync(password, 7);
      const user = new User({
        firstname,
        lastname,
        email,
        password: hashPassword,
        gitHubUrl,
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
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ message: `Пользователь ${email} не найден` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: 'Введен неверный пароль' });
      }
      const token = generateAccessToken(user._id);
      return res.json({ token, message: 'Успешно прошел' });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Ошибка при входе' });
    }
  }
  async getUserInfo(req, res) {
    try {
      const user = await User.findById(req.user.id).select('-password');
      if (!user) {
        return res.status(400).json({ message: `Пользователь не найден` });
      }
      return res.json(user);
    } catch (e) {
      console.log(e);
      res
        .status(400)
        .json({ message: 'Ошибка при получении данных пользователя' });
    }
  }
  async updateProfile(req, res) {
    try {
      const {
        gitHubUrl,
        linkedinUrl,
        headHunterUrl,
        userLearn,
        userExperience,
        userProfession,
        userCity,
        userBiography,
        userStack,
      } = req.body;
      const userId = req.user.id;

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            gitHubUrl,
            linkedinUrl,
            headHunterUrl,
            userLearn,
            userExperience,
            userProfession,
            userCity,
            userBiography,
            userStack,
          },
        },
        { new: true },
      ).select('-password');

      return res.json({ updatedUser, message: 'Успешно обновлено' });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Ошибка при обновлении профиля' });
    }
  }
}

module.exports = new AuthController();
