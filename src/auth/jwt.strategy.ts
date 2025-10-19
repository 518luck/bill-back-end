import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ConfigEnum } from '@/enum/config.enum';
import { JwtPayload } from '@/auth/types/jwt-payload.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>(ConfigEnum.JWT_SECRET, 'default'),
    });
  }

  // Passport JWT 验证成功后会调用这个方法
  // payload 就是 JWT 解析后的负载
  validate(payload: JwtPayload) {
    return {
      sub: payload.sub,
      username: payload.username,
      role: payload.role,
    };
  }
}
