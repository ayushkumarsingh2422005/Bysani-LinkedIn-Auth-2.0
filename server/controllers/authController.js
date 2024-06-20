const passport = require('passport');

exports.linkedinAuth = passport.authenticate('linkedin');

exports.linkedinCallback = passport.authenticate('linkedin', {
  successRedirect: '/profile',
  failureRedirect: '/',
});

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};
// exports.linkedinCallback = (req, res) => {
//   const token = req.user.token;
//   res.redirect(`http://localhost:5173/login?token=${token}`);
// };
