import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/database/mysql.module';
import { UsersModule } from '@/users/users.module';
import { AuthModule } from '@/auth/auth.module';
import { BillsModule } from '@/bills/bills.module';
import { SnowflakeModule } from '@/common/snowflake/snowflake.module';
import { DebtsModule } from '@/debts/debts.module';
import { ThrottlerModule } from '@nestjs/throttler';
@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1分钟
        limit: 5, // 最多5次请求
      },
    ]),
    UsersModule,
    AuthModule,
    BillsModule,
    DebtsModule,

    DatabaseModule,
    SnowflakeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
