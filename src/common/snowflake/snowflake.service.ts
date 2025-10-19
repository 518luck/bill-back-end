import { Injectable } from '@nestjs/common';
import SnowflakeId from 'snowflake-id';

@Injectable()
export class SnowflakeService {
  private static instance: SnowflakeId;

  constructor() {
    if (!SnowflakeService.instance) {
      SnowflakeService.instance = new SnowflakeId({
        mid: 1, // 机器 ID，分布式环境保证唯一
        offset: (2020 - 1970) * 31536000 * 1000, // 自定义 epoch
      });
    }
  }

  generate(): string {
    // 使用单例生成唯一 ID
    return SnowflakeService.instance.generate().toString();
  }
}
