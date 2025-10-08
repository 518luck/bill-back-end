import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';

import { LoginDto, RegisterDto } from '@/auth/dto';
import { UsersService } from '@/users/users.service';
import { getAccountType } from '@/utils/account-type';
import { AccountType } from '@/enum/account-type.enum';
import { User } from '@/users/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { account, password } = loginDto;
    const accountType = getAccountType(account);
    let user;

    if (accountType === AccountType.USERNAME) {
      user = await this.usersService.findByUsername(account);
    } else {
      // 邮箱或手机号登录
      const userAccount = await this.usersService.findAccount(
        loginDto.account,
        accountType,
      );
      user = userAccount?.user;
    }

    if (!user) {
      throw new UnauthorizedException('用户不存在');
    }

    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('密码错误');
    }

    // 生成 JWT
    const token = this.generateJwt(user);

    const userIns = plainToInstance(User, user);
    return { ...userIns, token };
  }

  // 注册用户
  async register(registerDto: RegisterDto) {
    const user = await this.usersService.findByUsername(registerDto.username);
    if (user) {
      throw new ConflictException('用户名存在 ( ´･･)ﾉ(._.`)');
    }

    const newUser = await this.usersService.createUser(registerDto);

    return newUser;
  }

  // 生成 JWT 令牌
  generateJwt(user: User) {
    const payload = { sub: user.id, username: user.username };
    return this.jwtService.sign(payload);
  }
}
