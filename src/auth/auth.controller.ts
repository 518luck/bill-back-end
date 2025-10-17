import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from '@/auth/auth.service';
import { LoginDto, RegisterDto } from '@/auth/dto';
import { Public } from '@/auth/decorator/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
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
}
