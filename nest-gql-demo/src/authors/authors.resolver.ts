import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver, Subscription } from "@nestjs/graphql";
import { NotFoundException } from "@nestjs/common";
import { PubSub } from 'graphql-subscriptions';

import { Author } from "./models/author.model";
import { Post } from "../posts/models/post.model";
import { GetAuthorArgs } from "./dto/get-author.args";
import { AuthorsService } from "./authors.service";
import { PostsService } from "src/posts/posts.service";
import { CreateAuthorInput } from "./dto/create-author.input";

const pubSub = new PubSub();

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
        const author = await this.authorsService.findOneById(id);
        if (!author) {
            throw new NotFoundException(`Author with id "${id}" does not exist.`);
        }

        return author;
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
    async createAuthor(
        @Args('createAuthorData') createAuthorData: CreateAuthorInput,
    ): Promise<Author> {
        const author = await this.authorsService.create(createAuthorData);
        pubSub.publish('authorCreated', { authorCreated: author });
        return author;
    }

    @Subscription(returns => Author)
    authorCreated() {
        return pubSub.asyncIterator('authorCreated');
    }
}