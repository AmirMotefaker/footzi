// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerStats } from './player-stats.entity'; // <-- ۱. این خط برای معرفی Entity اضافه می‌شود

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345678', // ❗️ رمز عبور خود را اینجا قرار دهید
      database: 'footzi_stats',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([PlayerStats]), // <-- ۲. این خط Repository را برای AppModule فراهم می‌کند
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}