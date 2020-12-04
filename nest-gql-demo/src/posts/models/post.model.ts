import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, PrimaryKey, Table, Model, ForeignKey } from 'sequelize-typescript';
import { Author } from 'src/authors/models/author.model';

@ObjectType()
@Table
export class Post extends Model<Post> {
    @Field((type) => Int)
    @PrimaryKey
    @Column
    id: number;

    @Field()
    @Column
    title: string;

    @Field(type => Int, { defaultValue: 0 })
    @Column
    votes?: number;

    @ForeignKey(() => Author)
    @Column
    authorId: number;
}