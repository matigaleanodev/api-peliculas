import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { WatchListModule } from './watch-list/watch-list.module';
import { TmdbModule } from './tmdb/tmdb.module';

@Module({
  imports: [AuthModule, UsersModule, MoviesModule, WatchListModule, TmdbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
