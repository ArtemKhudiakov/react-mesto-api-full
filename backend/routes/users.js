const router = require('express').Router();
const {
  getUsers,
  getUser,
  getCurrentUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

const {
  validateGetUser,
  validateUpdateUser,
  validateUpdateAvatar,
} = require('../middlewares/validate');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:_id', validateGetUser, getUser);
router.patch('/me', validateUpdateUser, updateUser);
router.patch('/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = router;
