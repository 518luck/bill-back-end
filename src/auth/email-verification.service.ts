import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailVerificationService {
  // 存储验证码（生产环境建议用Redis）
  private verificationCodes = new Map<string, { code: string; expiry: Date }>();

  // 生成6位随机验证码
  generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // 发送验证码（模拟）
  async sendVerificationCode(email: string): Promise<void> {
    const code = this.generateCode();
    const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10分钟过期
    await Promise.resolve(); // 模拟异步操作

    this.verificationCodes.set(email, { code, expiry });

    // 实际项目中这里应该调用邮件服务API
    console.log(`发送验证码到 ${email}: ${code}`);
  }

  // 验证验证码
  verifyCode(email: string, code: string): boolean {
    const stored = this.verificationCodes.get(email);
    if (!stored) return false;

    if (stored.expiry < new Date()) {
      this.verificationCodes.delete(email);
      return false;
    }

    return stored.code === code;
  }
}
