const Router = require('express');
const router = new Router();
const controller = require('./authController');
const { check } = require('express-validator');
const authMiddleware = require('./middlewaree/authMiddleware');
router.post(
  '/registration',
  [
    check('firstname', 'Заполните поле с именем').notEmpty(),
    check('lastname', 'Заполните поле с фамилией').notEmpty(),
    check('email', 'Почта пользователя не может быть пустой').notEmpty(),
    check(
      'password',
      'Длина пароля должена быть больше 4 и менньше 10',
    ).isLength({ min: 4, max: 10 }),
  ],
  controller.registration,
);
router.post('/login', controller.login);
router.patch('/profile', authMiddleware, controller.updateProfile);
router.get('/info', authMiddleware, controller.getUserInfo);

module.exports = router;
