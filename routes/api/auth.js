const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
require('dotenv').config();

/**
 *  @route  GET api/auth
 *  @desc   User auth
 *  @access Public
 */
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 *  @route  Post api/auth
 *  @desc   Authenticate user & get token
 *  @access Public
 */
router.post(
  '/',
  [
    check('email', 'Please enter a valid email adress').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check If User Exists
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({
          errors: [{ msg: 'Invalid credentials' }]
        });
      }

      // Match Password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          errors: [{ msg: 'Invalid credentials' }]
        });
      }

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id
        }
      };

      const jwtSecret = process.env.JWT_SECRET;

      //Change back to 3600 before production!!!
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
