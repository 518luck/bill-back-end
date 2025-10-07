# Bill Back-End

基于 NestJS 构建的账单管理后端服务，采用 TypeScript 编写，集成 JWT 认证、Argon2 密码加密和 TypeORM 数据库操作。

## 📁 项目结构

```
src/
├── auth/               # 认证模块
│   ├── dto/            # 数据传输对象
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
├── users/              # 用户模块
│   ├── entity/         # 数据实体
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.module.ts
├── database/           # 数据库配置
├── config/             # 全局配置
├── enum/               # 枚举类型
├── utils/              # 工具函数
├── main.ts             # 应用入口
└── app.module.ts       # 根模块
```

## 🚀 快速开始

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
# 开发模式（热重载）
pnpm run start:dev

# 调试模式（监听9229端口）
pnpm run start:debug
```

### 数据库迁移

```bash
# 生成迁移文件
pnpm run typeorm migration:generate -- -n Init

# 运行迁移
pnpm run typeorm migration:run
```

## 🔐 认证机制

- 使用 `argon2` 加密密码
- JWT 签发与验证（60分钟有效期）
- 支持用户名/邮箱/手机号登录

## 🛠️ 技术栈

- **框架**: NestJS + TypeScript
- **ORM**: TypeORM
- **数据库**: MySQL (通过 docker-compose.yml 配置)
- **安全**: Argon2 + JWT
- **部署**: Docker (可选)

## 📦 环境变量

在 `.env` 文件中配置以下变量：

```env
JWT_SECRET=your_jwt_secret_key
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USERNAME=root
DATABASE_PASSWORD=root
DATABASE_NAME=bill
```

## 🧪 测试

```bash
# 单元测试
pnpm run test

# E2E 测试
pnpm run test:e2e
```

## 📄 License

MIT