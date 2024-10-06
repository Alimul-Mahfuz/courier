import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { IsUniqueConstraint } from './shared/validation/unique-constraint';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}),DatabaseModule, UsersModule, PostsModule, CommentsModule, AuthModule],
  controllers: [],
  providers: [UsersModule,IsUniqueConstraint],
})
export class AppModule {}
