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
      'Длина пароля должена быть больше 4 и менньше 14',
    ).isLength({ min: 4, max: 14 }),
  ],
  controller.registration,
);
router.post('/login', controller.login);
router.patch(
  '/profile',
  authMiddleware,
  [
    check('firstname', 'Заполните поле с именем').notEmpty(),
    check('lastname', 'Заполните поле с фамилией').notEmpty(),
    // check('userExperience')
    //   .isInt({ min: 0 })
    //   .withMessage('Опыт пользователя не может быть меньше 0'),
  ],
  controller.updateProfile,
);
router.patch(
  '/urls',
  authMiddleware,
  [
    check('gitHubUrl')
      .optional({ checkFalsy: true })
      .isURL()
      .withMessage('Корректно введите поле ссылки')
      .contains('github.com')
      .withMessage('Ссылка должна быть на GitHub'),

    check('linkedinUrl')
      .optional({ checkFalsy: true })
      .isURL()
      .withMessage('Корректно введите поле ссылки')
      .contains('linkedin.com')
      .withMessage('Ссылка должна быть на Linkedin'),

    check('headHunterUrl')
      .optional({ checkFalsy: true })
      .isURL()
      .withMessage('Корректно введите поле ссылки')
      .contains('hh.kz')
      .withMessage('Ссылка должна быть на Head Hunter'),
  ],
  controller.updateUrls,
);
router.get('/info', authMiddleware, controller.getUserInfo);

module.exports = router;
