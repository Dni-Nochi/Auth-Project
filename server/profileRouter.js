const Router = require('express');
const profileRouter = new Router();
const controller = require('./authController');
const { check } = require('express-validator');
const authMiddleware = require('./middlewaree/authMiddleware');

profileRouter.patch(
  '/urls',
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
  authMiddleware,
  controller.updateUrls,
);

profileRouter.patch(
  '/fullName',
  [
    check('firstname', 'Заполните поле с именем').notEmpty(),
    check('lastname', 'Заполните поле с фамилией').notEmpty(),
  ],
  authMiddleware,
  controller.updateProfile,
);

profileRouter.patch(
  '/aboutPerson',
  [
    check('userStack').custom((stack) => {
      const values = stack.map((item) => item.value.toLowerCase());
      const unique = new Set(values);
      if (unique.size !== stack.length) {
        throw new Error('Стек не должен содержать дубликаты');
      }
      return true;
    }),
  ],
  authMiddleware,
  controller.aboutPerson,
);
profileRouter.delete(
  '/aboutPerson/:id',
  authMiddleware,
  controller.deleteSkill,
);

module.exports = profileRouter;
