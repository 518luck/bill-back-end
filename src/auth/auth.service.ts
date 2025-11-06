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
import { User } from '@/users/entity/user.entity';
import { EmailRegisterDto } from '@/auth/dto/email-register.dto';
import { EmailVerificationService } from '@/auth/email-verification.service';
import { Repository } from 'typeorm';
import { UserEmail } from '@/users/entity/user-email.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly emailVerificationService: EmailVerificationService,
    @InjectRepository(UserEmail)
    private readonly userEmailRepository: Repository<UserEmail>,
  ) {}

  // 用户登录
  async login(loginDto: LoginDto) {
    const { account, password } = loginDto;
    // 使用统一查找方法
    const user = await this.usersService.findByAccount(account);
    if (!user) {
      throw new UnauthorizedException('用户不存在');
    }

    // 验证密码
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
    const payload = { sub: user.id, username: user.username, role: user.role };
    return this.jwtService.sign(payload);
  }

  // 邮箱注册
  async registerWithEmail(registerDto: EmailRegisterDto) {
    // 验证验证码
    const isCodeValid = this.emailVerificationService.verifyCode(
      registerDto.email,
      registerDto.verificationCode,
    );

    if (!isCodeValid) {
      throw new UnauthorizedException('验证码错误或已过期');
    }

    // 检查邮箱是否已注册
    const existingEmail = await this.userEmailRepository.findOne({
      where: { email: registerDto.email },
      relations: ['user'],
    });

    if (existingEmail) {
      throw new ConflictException('邮箱已被注册');
    }

    // 创建用户
    const user = await this.usersService.createUser({
      username: registerDto.email, // 使用邮箱作为用户名
      password: registerDto.password,
      verificationCode: registerDto.verificationCode,
    });

    // 创建邮箱记录
    await this.userEmailRepository.save({
      email: registerDto.email,
      verified: true,
      user,
    });

    return user;
  }

  // 邮箱找回密码
  async resetPassword(resetPasswordDto: EmailRegisterDto) {
    // 验证验证码
    const isCodeValid = this.emailVerificationService.verifyCode(
      resetPasswordDto.email,
      resetPasswordDto.verificationCode,
    );

    if (!isCodeValid) {
      throw new UnauthorizedException('验证码错误或已过期');
    }

    // 检查邮箱是否已注册
    const existingEmail = await this.userEmailRepository.findOne({
      where: { email: resetPasswordDto.email },
      relations: ['user'],
    });

    if (!existingEmail) {
      throw new ConflictException('邮箱未被注册');
    }

    // 更新用户密码
    await this.usersService.updateUserPassword(
      existingEmail.user.id,
      resetPasswordDto.password,
    );

    return { message: '密码重置成功' };
  }
}
