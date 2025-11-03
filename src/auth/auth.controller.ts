import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from '@/auth/auth.service';
import { LoginDto, RegisterDto } from '@/auth/dto';
import { Public } from '@/auth/decorator/public.decorator';
import { EmailVerificationService } from '@/auth/email-verification.service';
import { EmailRegisterDto } from '@/auth/dto/email-register.dto';

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

  // src/auth/auth.controller.ts
  @Post('send-verification-code')
  @Public()
  async sendVerificationCode(@Body() dto: { email: string }) {
    await this.emailVerificationService.sendVerificationCode(dto.email);
    return { success: true, message: '验证码已发送' };
  }

  @Post('register-email')
  @Public()
  async registerWithEmail(@Body() registerDto: EmailRegisterDto) {
    return await this.authService.registerWithEmail(registerDto);
  }
}
