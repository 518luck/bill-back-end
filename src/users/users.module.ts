import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '@/users/entity/user.entity';
import { UsersController } from '@/users/users.controller';
import { UsersService } from '@/users/users.service';
import { UserAccount } from '@/users/entity/user-account.entity';
import { UserEmail } from '@/users/entity/user-email.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserAccount, UserEmail])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
