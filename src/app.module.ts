import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@/database/mysql.module';
import { UsersModule } from '@/users/users.module';
import { AuthModule } from '@/auth/auth.module';
import { BillsModule } from '@/bills/bills.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    BillsModule,

    DatabaseModule,

    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
