import * as dotenv from 'dotenv';
interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  datauser: string;
}

interface JwtConfig {
  secret: string;
}

interface AppConfig {
  environment: string;
  database: DatabaseConfig;
  jwt: JwtConfig;
}

const env = process.env.NODE_ENV || 'development';

dotenv.config({ path: `.env.${env}` });

export default (): AppConfig => ({
  environment: env,
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process?.env?.DB_PORT || '3306', 10),
    username: process.env.DB_NAME || '123456',
    password: process.env.DB_PASS || '123456',
    datauser: process.env.DB_USER || '123456',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'default',
  },
});
