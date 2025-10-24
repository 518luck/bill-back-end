module.exports = {
  apps: [
    {
      name: 'my-nestjs-project',
      script: 'dist/main.js',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
      // 指定日志文件
      output: './logs/out.log', // 标准输出
      error: './logs/error.log', // 错误输出
      merge_logs: true, // 标准输出和错误输出合并
      log_date_format: 'YYYY-MM-DD HH:mm:ss', // 打印时间格式
    },
  ],
};
