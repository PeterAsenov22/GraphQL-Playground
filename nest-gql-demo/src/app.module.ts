import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { SequelizeModule } from '@nestjs/sequelize';
import { join } from 'path';

import { AuthorsModule } from './authors/authors.module';
import { PostsModule } from './posts/posts.module';
import { DatabaseModule } from './database/database.module';

import { Author } from './authors/models/author.model';
import { Post } from './posts/models/post.model';

@Module({
  imports: [
    AuthorsModule,
    PostsModule,
    DatabaseModule,
    // SequelizeModule.forRoot({
    //   dialect: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'postgres',
    //   password: 'admin123',
    //   database: 'forum',
    //   models: [Author, Post],
    //   synchronize: true
    // }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      installSubscriptionHandlers: true
      // sortSchema: true,
    })
  ],
})
export class AppModule {}
