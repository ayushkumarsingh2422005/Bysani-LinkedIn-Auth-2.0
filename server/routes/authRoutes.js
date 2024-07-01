const express = require('express');
const User = require('../models/User');
const router = express.Router();

const CLIENT_ID = '863y46ty2ic2k2';
const CLIENT_SECRET = 'w9cagrFRtcYFViEX';
const REDIRECT_URI = 'http://localhost:5000/auth/linkedin/callback';



// Step 1: Redirect user to LinkedIn for authorization
router.get('/linkedin', (req, res) => {
  const scope = 'email profile openid';
  const state = 'someRandomState'; // Replace with a securely generated random state string

  const authorizationUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(scope)}&state=${state}`;

  res.redirect(authorizationUrl);
});

// Step 2: Handle the callback from LinkedIn
router.get('/linkedin/callback', async (req, res) => {
  const { code, state } = req.query;

  if (!code) {
    return res.status(400).send('Authorization code not provided');
  }

  try {
    // Step 3: Exchange authorization code for access token
    const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI
      })
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      throw new Error(tokenData.error_description || 'Error exchanging authorization code for access token');
    }

    const accessToken = tokenData.access_token;

    // Fetch user profile data using the access token
    const profileResponse = await fetch('https://api.linkedin.com/v2/userinfo', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    // const emailResponse = await fetch('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', {
    //   headers: {
    //     'Authorization': `Bearer ${accessToken}`
    //   }
    // });

    const profileData = await profileResponse.json();
    // const emailData = await emailResponse.json();
    // const email = emailData.elements[0]['handle~'].emailAddress;

    console.log(profileData);

    // Save user data to MongoDB
    let user = await User.findOne({ user_id: profileData.sub });
    if (!user) {
      user = new User({
        user_id: profileData.sub,
        username: profileData.given_name + profileData.family_name,
        name: profileData.name,
        email: profileData.email,
        education: '', // Placeholder, replace with actual data if available
        professional_experience: '', // Placeholder, replace with actual data if available
        certificates: '', // Placeholder, replace with actual data if available
        skills: '', // Placeholder, replace with actual data if available
        image: profileData.picture
      });
      await user.save();
    }

    // res.cookie('authToken', accessToken, { httpOnly: true, secure: true });
    const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;

    res.cookie('authToken', accessToken);
    res.cookie('userId', profileData.sub);
    console.log(accessToken, profileData.sub);
    return res.redirect('http://localhost:5173/profile');
  } catch (error) {
    console.error('Error during authentication:', error.message);
    res.status(500).send('Error during authentication');
  }
});


// Route to test authentication
router.get('/profile', (req, res) => {
  const cookies = req.cookies
  console.log(cookies)
  return res.json({ cookies })
});


module.exports = router;
