import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from '@/auth/auth.service';
import { LoginDto, RegisterDto } from '@/auth/dto';
import { Public } from '@/auth/decorator/public.decorator';
import { EmailVerificationService } from '@/auth/email-verification.service';
import { EmailRegisterDto } from '@/auth/dto/email-register.dto';
import { Throttle } from '@nestjs/throttler';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly emailVerificationService: EmailVerificationService,
  ) {}
  // 登录
  @Public()
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // 注册
  @Public()
  @Post('register')
  register(@Body() createUserDto: RegisterDto) {
    return this.authService.register(createUserDto);
  }

  // 发送验证码
  @Post('send-verification-code')
  @Public()
  @Throttle({ default: { ttl: 60000, limit: 5 } })
  async sendVerificationCode(@Body() dto: { email: string }) {
    return await this.emailVerificationService.sendVerificationCode(dto.email);
  }

  // 邮箱注册
  @Post('register-email')
  @Public()
  async registerWithEmail(@Body() registerDto: EmailRegisterDto) {
    return await this.authService.registerWithEmail(registerDto);
  }

  // 邮箱找回密码
  @Post('reset-password')
  @Public()
  @Throttle({ default: { ttl: 60000, limit: 5 } })
  async resetPassword(@Body() resetPasswordDto: EmailRegisterDto) {
    return await this.authService.resetPassword(resetPasswordDto);
  }
}
