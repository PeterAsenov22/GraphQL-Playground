import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";

import { Author } from "./models/author.model";
import { Post } from "../posts/models/post.model";
import { GetAuthorArgs } from "./dto/get-author.args";
import { AuthorsService } from "./authors.service";
import { PostsService } from "src/posts/posts.service";
import { CreateAuthorInput } from "./dto/create-author.input";

@Resolver(of => Author)
export class AuthorsResolver {
    constructor(
        private authorsService: AuthorsService,
        private postsService: PostsService,
    ) { }

    @Query(returns => [Author])
    async authors(): Promise<Author[]> {
        return await this.authorsService.findAll();
    }

    @Query(returns => Author, { name: 'author' })
    async getAuthor(
        @Args('id', { type: () => Int }) id: number,
        @Args('firstName', { nullable: true }) firstName?: string,) {
        return this.authorsService.findOneById(id);
    }

    @Query(returns => Author, { name: 'author2' })
    async getAuthor2(@Args() args: GetAuthorArgs) {
        return this.authorsService.findOneById(args.id);
    }

    @ResolveField('posts', returns => [Post], {nullable: 'itemsAndList'})
    async getPosts(@Parent() author: Author) {
        const { id } = author;
        return this.postsService.findByAuthorId(id);
    }

    @Mutation(returns => Author)
    createAuthor(
        @Args('createAuthorData') createAuthorData: CreateAuthorInput,
    ): Promise<Author> {
        return this.authorsService.create(createAuthorData);
    }
}