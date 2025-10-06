import { Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from '@/auth/dto';

@Injectable()
export class AuthService {
  login(loginDto: LoginDto) {
    console.log('🚀 ~ AuthService ~ login ~ loginDto:', loginDto);
    return loginDto;
  }

  register(registerDto: RegisterDto) {
    return registerDto;
  }
}
