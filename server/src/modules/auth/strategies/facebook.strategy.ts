import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-facebook";

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(private readonly configService: ConfigService) {
    super({
      cliendId: configService.get<string>('FACEBOOK_CLIENT_ID'),
      clientSecret: configService.get<string>('FACEBOOK_CLIENT_SECRET'),
      callbackURL: configService.get<string>('FACEBOOK_CALLBACK_URL'),
      profileFields: ['id', 'emails', 'name', 'photos'],
    })
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: any) {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0]?.value,
      name: name?.givenName && name?.familyName
      ? `${name.givenName} ${name.familyName}`
      : name?.givenName || name?.familyName || '',
      photo: photos[0]?.value,
      accessToken,
    };
    done(null, user);
  }
}