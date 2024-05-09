const express = require("express");
const router = express.Router();
// const upload = require("../Middlewares/Image");
const checkuserauthecated = require('../Middlewares/authMiddlewares')
const Authentecation = require("../Controller/AuthController");


// Authentication Routes
router.post('/register', Authentecation.Register)
router.post('/login', Authentecation.Login)
router.post('/change',checkuserauthecated, Authentecation.ChangePassword)



module.exports = router;