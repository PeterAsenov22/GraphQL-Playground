import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthorsResolver } from './authors.resolver';
import { AuthorsService } from './authors.service';
import { PostsModule } from 'src/posts/posts.module';
import { authorsProviders } from './authors.providers';

import { Author } from './models/author.model';

@Module({
    imports: [
        // SequelizeModule.forFeature([Author]),
        PostsModule
    ],
    providers: [
        AuthorsService,
        AuthorsResolver,
        ...authorsProviders
    ]
})
export class AuthorsModule { }