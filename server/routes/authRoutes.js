const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/linkedin', authController.linkedinAuth);
router.get('/linkedin/callback', authController.linkedinCallback);
router.get('/logout', authController.logout);

module.exports = router;
