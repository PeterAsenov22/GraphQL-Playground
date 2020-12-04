import { Args, Int, Mutation, Resolver, Query } from "@nestjs/graphql";

import { Post } from "./models/post.model";
import { PostsService } from "src/posts/posts.service";
import { UpvotePostInput } from "./dto/upvote-post.input";

@Resolver(of => Post)
export class PostsResolver {
    constructor(
        private readonly postsService: PostsService,
    ) { }

    @Query(returns => [Post], { nullable: 'itemsAndList'})
    async posts(): Promise<Post[]> {
        return this.postsService.findAll();
    }

    @Mutation(returns => Post)
    async upvotePost(@Args({ name: 'postId', type: () => Int }) postId: number) {
        return this.postsService.upvoteById(postId);
    }

    @Mutation(returns => Post)
    async upvotePost2(
        @Args('upvotePostData') upvotePostData: UpvotePostInput,
    ) {
        return this.postsService.upvoteById(upvotePostData.postId);
    }

}