const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')
const request = require('request')
require('dotenv').config()

const Profile = require('../../models/Profile')
const User = require('../../models/User')
const Post = require('../../models/Post')

/**
 *  @route  GET api/profile/me
 *  @desc   Get current user profile
 *  @access Private
 */
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'avatar'])

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' })
    }

    res.json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).json.send('Server Error')
  }
})

/**
 *  @route  POST api/profile
 *  @desc   Create or update user profile
 *  @access Private
 */
router.post('/', [auth], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { airport, date } = req.body

  // Build profile object
  const profileFields = {}
  profileFields.user = req.user.id
  if (airport) profileFields.airport = airport
  if (date) profileFields.date = date

  try {
    let profile = await Profile.findOne({ user: req.user.id })
    if (profile) {
      // Update
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      )
      console.log(profile)

      return res.json(profile)
    }
    // Create
    profile = new Profile(profileFields)
    await profile.save()
    res.json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

/**
 *  @route  GET api/profile
 *  @desc   Get all profiles
 *  @access Public
 */
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar'])
    res.json(profiles)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

/**
 *  @route  DELETE api/profile
 *  @desc   Delete profile, user & post
 *  @access Private
 */
router.delete('/', auth, async (req, res) => {
  try {
    // Remove user posts
    await Post.deleteMany({ user: req.user.id })

    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id })

    // Remove user
    await User.findOneAndRemove({ _id: req.user.id })

    res.json({ msg: 'User deleted' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
