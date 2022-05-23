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
loginRoute.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 43200000 }
}));
loginRoute.use(passport.session())
loginRoute.use(passport.initialize());
loginRoute.use(cors());


const checkNotAuthenticated = (req:any, res:any, next:any) => {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}



loginRoute.get("/", checkNotAuthenticated, (req, res) => {
  res.render('pages/login-page.ejs');
});


loginRoute.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

loginRoute.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: config.google.failUrl }),
(req, res) => {res.redirect(config.google.successUrl)});

export = loginRoute;
