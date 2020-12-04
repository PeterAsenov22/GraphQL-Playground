import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Post } from './models/post.model';
import { postsProviders } from './posts.providers';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';

@Module({
    imports: [
        // SequelizeModule.forFeature([Post])
    ],
    providers: [
        PostsService,
        PostsResolver,
        ...postsProviders
    ],
    exports: [PostsService]
})
export class PostsModule { }