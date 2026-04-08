const Router = require('express');
const router = new Router();
const controller = require('./authController');
const { check } = require('express-validator');
const authMiddleware = require('./middlewaree/authMiddleware');
const roleMiddleware = require('./middlewaree/roleMiddleware');

router.post(
  '/registration',
  [
    check('username', 'Имя пользователя не может быть пустым').notEmpty(),
    check(
      'password',
      'Длина пароля должена быть больше 4 и менньше 10',
    ).isLength({ min: 4, max: 10 }),
  ],
  controller.registration,
);
router.post('/login', controller.login);
router.patch('/profile', authMiddleware, controller.updateProfile);
router.get('/users', roleMiddleware(['ADMIN', 'USER']), controller.getUsers);
router.get('/info', authMiddleware, controller.getUserInfo);

module.exports = router;
