const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const keys = require('./config/keys');
const User = require('./models/User');

passport.use(new LinkedInStrategy({
  clientID: keys.linkedin.clientID,
  clientSecret: keys.linkedin.clientSecret,
  callbackURL: keys.linkedin.callbackURL,
  scope: ['profile'],
}, async (accessToken, refreshToken, profile, done) => {
  const { id, displayName, emails } = profile;
  try {
    let user = await User.findOne({ user_id: id });
    if (!user) {
      user = new User({
        user_id: id,
        username: displayName,
        name: displayName,
        email: emails[0].value,
      });
      await user.save();
    }
    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
