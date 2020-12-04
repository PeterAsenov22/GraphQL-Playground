import { Module } from '@nestjs/common';

import { AuthorsResolver } from './authors.resolver';
import { AuthorsService } from './authors.service';
import { PostsModule } from 'src/posts/posts.module';
import { authorsProviders } from './authors.providers';

@Module({
    imports: [PostsModule],
    providers: [
        AuthorsService,
        AuthorsResolver,
        ...authorsProviders
    ]
})
export class AuthorsModule { }