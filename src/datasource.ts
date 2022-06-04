import * as dotenv from 'dotenv';
import * as path from 'path';
import { DataSource } from 'typeorm';
dotenv.config();

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.TYPEORM_HOST ? process.env.TYPEORM_HOST : 'localhost',
  port: Number(process.env.TYPEORM_PORT)
    ? Number(process.env.TYPEORM_PORT)
    : 5432,
  username: process.env.TYPEORM_USERNAME
    ? process.env.TYPEORM_USERNAME
    : 'postgres',
  password: process.env.TYPEORM_PASSWORD
    ? process.env.TYPEORM_PASSWORD
    : 'postgres',
  database: process.env.TYPEORM_DATABASE
    ? process.env.TYPEORM_DATABASE
    : 'covid_cases',
  cache: { duration: 30000 },
  entities: [`${__dirname}/**/*.entity{.ts,.js}`],
  migrations: [path.join(__dirname, '/migrations/*{.ts,.js}')]
});
