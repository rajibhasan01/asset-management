import express from "express";
import cors from "cors";
import passport from "passport";
import strategy from "passport-google-oauth20";
import { ConfigService } from "../../services/utility/configService";
import session from 'express-session';
import dotenv from 'dotenv';
dotenv.config()


const config = ConfigService.getInstance().getConfig();
const loginRoute = express.Router();
loginRoute.use(passport.initialize());
loginRoute.use(cors());
loginRoute.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))


const GoogleStrategy = strategy.Strategy;


passport.use(
    new GoogleStrategy(
      {
        clientID: config.google.clientId,
        clientSecret: config.google.clientSecret,
        callbackURL: config.google.callbackURL,
        passReqToCallback: true,
      },

      (request :any, accessToken:any, refreshToken:any, profile:any, done:any) => {
        if (profile._json.email === "rajib.hasan@braincraftapps.com") {
          return done(null, profile);
        } else {
          return done(null);
        }
      }
    )
  );



  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });

loginRoute.get("/", (req, res) => {
  res.render('pages/login-page.ejs');
});

loginRoute.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

loginRoute.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: config.google.failUrl }),
(req, res) => {res.redirect(config.google.successUrl)});

export = loginRoute;
