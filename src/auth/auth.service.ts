import { ConflictException, Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from '@/auth/dto';
import { UsersService } from '@/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  login(loginDto: LoginDto) {
    return loginDto;
  }

  async register(registerDto: RegisterDto) {
    const user = await this.usersService.findByUsername(registerDto.username);
    if (user) {
      throw new ConflictException('用户名存在 ( ´･･)ﾉ(._.`)');
    }

    const newUser = await this.usersService.createUser(registerDto);

    return newUser;
  }
}
