import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { AuthController } from '@/auth/auth.controller';
import { AuthService } from '@/auth/auth.service';
import { User } from '@/users/entity/user.entity';
import { UsersModule } from '@/users/users.module';
import { JwtStrategy } from '@/auth/jwt.strategy';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { EmailVerificationService } from '@/auth/email-verification.service';
import { UserEmail } from '@/users/entity/user-email.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserEmail]),
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    EmailVerificationService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthModule {}
