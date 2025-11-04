import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';

@Injectable()
export class EmailVerificationService {
  // 存储验证码（生产环境建议用Redis）
  private verificationCodes = new Map<string, { code: string; expiry: Date }>();
  private transporter: nodemailer.Transporter;
  constructor(private configService: ConfigService) {
    // 在构造函数中初始化transporter
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('EMAIL_HOST', 'smtp.qq.com'),
      port: this.configService.get<number>('EMAIL_PORT', 465),
      secure: this.configService.get<boolean>('EMAIL_SECURE', true),
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASS'),
      },
    });
  }
  // 生成6位随机验证码
  generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // 发送验证码
  async sendVerificationCode(email: string) {
    const code = this.generateCode();
    const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10分钟过期

    this.verificationCodes.set(email, { code, expiry });
    console.log(`验证码已存储: ${email} -> ${code}`);
    console.log('当前Map大小:', this.verificationCodes.size);

    const mailOptions = {
      from: this.configService.get<string>('EMAIL_USER'),
      to: email,
      subject: '邮箱验证',
      html: `
  <div style="font-family: Arial, 'Microsoft Yahei', sans-serif; max-width: 420px; padding: 20px; border-radius: 12px; border: 1px solid #eee; background: #fafafa;">
    <h2 style="color:#1677ff; text-align:center; margin-bottom: 20px;">小账童 · 身份验证</h2>
    
    <p style="font-size: 15px; color:#333;">
      您好，您的验证码为：
    </p>
    
    <div style="text-align:center; margin: 25px 0;">
      <span style="font-size: 28px; font-weight:bold; color:#1677ff; letter-spacing: 2px;">${code}</span>
    </div>
    
    <p style="font-size: 14px; color:#555; line-height: 1.7;">
      用于账号安全验证，<strong>10分钟内有效</strong>。请勿泄露，如非本人操作，请忽略本邮件。
    </p>

    <p style="font-size: 12px; color:#999; margin-top: 28px; text-align:center;">
      © 小账童 保障您的账户安全
    </p>
  </div>
  `,
    };

    // 向QQ邮箱发送验证码
    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      return { success: false, message: '发送验证码失败 ' + error };
    }

    return { success: true, message: '验证码已发送' };
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
