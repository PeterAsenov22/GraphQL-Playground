import { Injectable } from '@nestjs/common';
import { Post } from './models/post.model';

@Injectable()
export class PostsService {
    // private posts: Post[];
// 
    // constructor() {
    //     this.posts = [{
    //         id: 1,
    //         title: 'My post',
    //         votes: 2
    //     }];
    // }

    findAll(): Post[] {
        // return this.posts;
        return [];
    }

    findByAuthorId({ authorId: number }): Post[] {
        // return this.posts;
        return [];
    }

    upvoteById(postId: number): Post {
        // const post = this.posts.find(p => p.id == postId);
        // post.votes++;
        // return post;
        return null;
    }
}