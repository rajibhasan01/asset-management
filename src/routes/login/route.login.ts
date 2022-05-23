import express from "express";
import cors from "cors";
import passport from "passport";
import { ConfigService } from "../../services/utility/configService";
import session from "express-session";
import dotenv from "dotenv";
import "./route.auth"
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


loginRoute.get("/", (req, res) => {
  res.render('pages/login-page.ejs');
});

loginRoute.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

loginRoute.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: config.google.failUrl }),
(req, res) => {res.redirect(config.google.successUrl)});

export = loginRoute;
