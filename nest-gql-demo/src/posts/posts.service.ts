import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreatePostInput } from './dto/create-post.input';
import { Post } from './models/post.model';

@Injectable()
export class PostsService {
    constructor(
        @Inject('POSTS_REPOSITORY') private postsRepository: typeof Post
    ) { }

    findAll(): Promise<Post[]> {
        return this.postsRepository.findAll();
    }

    findById(id: number): Promise<Post> {
        return this.postsRepository.findOne({
            where: {
                id
            }
        });
    }

    findByAuthorId(authorId: number): Promise<Post[]> {
        return this.postsRepository.findAll({
            where: {
                authorId
            }
        });
    }

    create(createPostData: CreatePostInput): Promise<Post> {
        return this.postsRepository.create(createPostData);
    }

    async upvoteById(postId: number): Promise<Post> {
        const post = await this.findById(postId);
        
        post.votes++;
        await post.save();

        return post;
    }
}