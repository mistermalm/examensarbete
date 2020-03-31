const express = require('express');
const gravatar = require('gravatar');
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../../models/User');

const router = express.Router();

/**
 *  @route  POST api/users
 *  @desc   Register user
 *  @access Public
 */
router.post(
  '/',
  [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Please enter a valid email adress').isEmail(),
    check(
      'password',
      'Please enter a password with at least 6 characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // Check If User already Exists
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({
          errors: [{ msg: 'User already exists' }]
        });
      }

      // Get User Gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });

      user = new User({
        name,
        email,
        avatar,
        password
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Save User To Database
      await user.save();

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id
        }
      };

      const jwtSecret = process.env.JWT_SECRET;
      //change back to 3600 before production!!!
      jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
      // res.send('user added');
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
