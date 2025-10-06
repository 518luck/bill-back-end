import { Module } from '@nestjs/common';

import { UsersModule } from '@/users/users.module';
import { AuthModule } from '@/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@/database/mysql.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
