const router = require('express').Router();
const {
  createUser,
  iHunger,
  iAmBored,
  login,
  aboutPage
} = require('../../controllers/user-controller');

const { authMiddleware } = require('../../utils/auth');

router.route('/About').get(aboutPage);

router.route('/register').post(createUser).put(authMiddleware);

router.route('/login').post(login);

router.route('/food').get(authMiddleware, iHunger);

router.route('/entertainment').get(authMiddleware, iAmBored);

router.route('/begone/list/:listId').delete(authMiddleware, savedList);

module.exports = router;
