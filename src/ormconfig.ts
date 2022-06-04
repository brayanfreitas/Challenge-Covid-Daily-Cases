import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config();

const config: TypeOrmModuleOptions = {
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
  migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN
    ? JSON.parse(process.env.TYPEORM_MIGRATIONS_RUN)
    : true,
  entities: [`${__dirname}/**/*.entity{.ts,.js}`],
  migrations: [path.join(__dirname, '/migrations/*{.ts,.js}')]
};

export = config;
