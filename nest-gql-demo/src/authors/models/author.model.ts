import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Table, Model, Column, HasMany } from 'sequelize-typescript';

import { Post } from '../../posts/models/post.model';

@ObjectType()
@Table
export class Author extends Model<Author> {
    @Field((type) => Int)
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Field({ nullable: true, description: 'Author first name' })
    @Column
    firstName?: string;

    @Field({ nullable: true })
    @Column
    lastName?: string;

    @Field(type => [Post])
    @HasMany(() => Post)
    posts?: Post[];
}