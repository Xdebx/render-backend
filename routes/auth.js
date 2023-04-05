const express = require('express');
const router = express.Router();
const upload = require("../utils/multer");
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserProfile, updatePassword, updateProfile, allUsers, getUserDetails, updateUser, deleteUser } = require('../controllers/authController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.get('/me', isAuthenticatedUser, getUserProfile)
//old
// router.route('/register').post(registerUser);
//new
router.post('/register', upload.single("avatar"), registerUser);
router.route('/login').post(loginUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.put('/password/update', isAuthenticatedUser, updatePassword);
//old
// router.route('/logout').get(logout);
// router.route('/logout').post(logout);
//new
router.route('/logout',logout);
//old
// router.put('/me/update', isAuthenticatedUser, updateProfile);
//new
router.put('/me/update', isAuthenticatedUser, upload.single("avatar"), updateProfile)

router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles('admin'), allUsers);
// router.route('/admin/user/:id').get(isAuthenticatedUser, authorizeRoles('admin'), getUserDetails)
// router.route('/admin/user/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateUser)
// router.route('/admin/user/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser)
router.route('/admin/user/:id')
    .get(isAuthenticatedUser, authorizeRoles('admin'), getUserDetails)
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateUser)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser)


module.exports = router;

