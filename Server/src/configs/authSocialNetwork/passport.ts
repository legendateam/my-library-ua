import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import generatorPassword from 'generate-password';

import { mainConfig } from '../main.config';
import { IGoogleUser, ITokensPair } from '../../interfaces';
import { Users } from '../../entities';
import { authService, userService } from '../../services';
import { userGoogleSchema } from '../../utils';
import { emailService } from '../../services/email.service';
import { EmailEnum } from '../../enums';

let callbackURL = `http://localhost:${mainConfig.PORT}/auth/google/callback`;

if (mainConfig.NODE_ENVIRONMENT_VARIABLE === 'prod') callbackURL = mainConfig.GOOGLE_CALLBACK;

passport.serializeUser(async (user, done) => {
    const googleUser = user as IGoogleUser;
    const userDB = await userService.getOneByEmail(googleUser._json?.email);

    if (userDB) {
        const tokenPair = await authService.login(userDB);

        if (!tokenPair) {
            return;
        }
        await emailService.sendEmail(userDB.email, EmailEnum.WELCOME_BACK, userDB);
        done(null, tokenPair);
        return;
    }

    if (!userDB) {
        const { email } = googleUser._json;
        const firstLetterEmail = email.slice(0, 1).toUpperCase();
        const nickName = `${firstLetterEmail}${googleUser.id}`;

        const password = generatorPassword.generate({
            uppercase: true,
            numbers: true,
            length: 12,
        });

        const userGoogleGenerated = {
            email: googleUser._json.email, nickName, avatar: googleUser._json.picture, password,
        } as Users;

        const { value } = userGoogleSchema.validate(userGoogleGenerated);

        const userCreated = await authService.registration(value);

        const tokenPair = await authService.login(userCreated);

        if (!tokenPair) {
            return;
        }

        await emailService.sendEmail(userCreated.email, EmailEnum.GOOGLE_WELCOME, { ...userCreated, password });
        done(null, tokenPair);
    }
});

passport.deserializeUser((tokenPair: ITokensPair, done) => {
    done(null, tokenPair);
});

passport.use(new GoogleStrategy(
    {
        clientID: mainConfig.GOOGLE_CLIENT_ID!,
        clientSecret: mainConfig.GOOGLE_SECRET_KEY!,
        callbackURL,
        passReqToCallback: true,
    },
    // @ts-ignore
    ((request, accessToken, refreshToken, profile, done) => done(null, profile)),
));
