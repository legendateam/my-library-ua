"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const generate_password_1 = __importDefault(require("generate-password"));
const main_config_1 = require("../main.config");
const services_1 = require("../../services");
const utils_1 = require("../../utils");
const email_service_1 = require("../../services/email.service");
const enums_1 = require("../../enums");
let callbackUrl = `http://localhost:${main_config_1.mainConfig.PORT}`;
if (main_config_1.mainConfig.NODE_ENVIRONMENT_VARIABLE === 'prod')
    callbackUrl = main_config_1.mainConfig.GOOGLE_CALLBACK_URL;
passport_1.default.serializeUser(async (user, done) => {
    const googleUser = user;
    const userDB = await services_1.userService.getOneByEmail(googleUser._json?.email);
    if (userDB) {
        const tokenPair = await services_1.authService.login(userDB);
        if (!tokenPair) {
            return;
        }
        await email_service_1.emailService.sendEmail(userDB.email, enums_1.EmailEnum.WELCOME_BACK, userDB);
        done(null, tokenPair);
        return;
    }
    if (!userDB) {
        const { email } = googleUser._json;
        const firstLetterEmail = email.slice(0, 1).toUpperCase();
        const nickName = `${firstLetterEmail}${googleUser.id}`;
        const password = generate_password_1.default.generate({
            uppercase: true,
            numbers: true,
            length: 12,
        });
        const userGoogleGenerated = {
            email: googleUser._json.email, nickName, avatar: googleUser._json.picture, password,
        };
        const { value } = utils_1.userGoogleSchema.validate(userGoogleGenerated);
        const userCreated = await services_1.authService.registration(value);
        const tokenPair = await services_1.authService.login(userCreated);
        if (!tokenPair) {
            return;
        }
        await email_service_1.emailService.sendEmail(userCreated.email, enums_1.EmailEnum.GOOGLE_WELCOME, { ...userCreated, password });
        done(null, tokenPair);
    }
});
passport_1.default.deserializeUser((tokenPair, done) => {
    done(null, tokenPair);
});
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: main_config_1.mainConfig.GOOGLE_CLIENT_ID,
    clientSecret: main_config_1.mainConfig.GOOGLE_SECRET_KEY,
    callbackURL: `${callbackUrl}/auth/google/callback`,
    passReqToCallback: true,
}, 
// @ts-ignore
((request, accessToken, refreshToken, profile, done) => done(null, profile))));
//# sourceMappingURL=passport.js.map