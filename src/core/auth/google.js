import passport from '../passport';
import jwt from 'jsonwebtoken';
import { auth, url } from '../../config';

const googleAuth = app => {

  app.get('/login/google',
    function (req, res, next) {
      let referURL = req.query.refer;
      if (referURL && referURL != null) {
        referURL = referURL.indexOf('---') >= 0 ? referURL.replace('---', '?') : referURL;
        referURL = referURL.indexOf('--') >= 0 ? referURL.replace('--', '&') : referURL;
      }
      if (referURL) {
        let expiresIn = 60 * 60; // 1 hour
        res.cookie('referURL', referURL, { maxAge: 1000 * expiresIn, httpOnly: true });
      }
      passport.authenticate('google',
        {
          scope: [
            'profile',
            'email'
          ],
          session: false,
        }
      )(req, res, next);
    }
  );

  app.get('/login/google/return',
    passport.authenticate('google', {
      failureRedirect: '/login',
      session: false,
    }),
    (req, res) => {
      const type = req.user.type;
      let referURL = req.cookies.referURL;
      const user = {
        id: req.user.id,
        email: req.user.email,
      };
      if (referURL) {
        res.clearCookie("referURL");
        const expiresIn = 60 * 60 * 24 * 180; // 180 days
        const token = jwt.sign(user, auth.jwt.secret, { expiresIn });
        res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
        res.redirect(referURL);
      } else {
        if (type === 'verification') {
          res.redirect(auth.redirectURL.verification);
        } else if (type === 'userbanned') {
          res.redirect(auth.redirectURL.userbanned);
        } else if (type === 'userDeleted') {
          res.redirect(auth.redirectURL.returnURLDeletedUser);
        }
        else {
          const expiresIn = 60 * 60 * 24 * 180; // 180 days
          const token = jwt.sign(user, auth.jwt.secret, { expiresIn });
          res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
          res.redirect(auth.redirectURL.login);
        }
      }
    }
  );
};

export default googleAuth;
