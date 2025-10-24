import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ConfigModule } from '@nestjs/config';
import configuration from '@/config/configuration';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.datauser'),
        // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        entities: [__dirname + '/../**/*.entity.js'],
        autoLoadEntities: true,
        synchronize: true, //自动建表
        namingStrategy: new SnakeNamingStrategy(),
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
