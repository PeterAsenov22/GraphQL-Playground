import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Table, Model, Column, HasMany, DataType } from 'sequelize-typescript';

import { FieldEncryptionUtil } from 'src/utils/field-encryption.util';

import { AuthorMeta } from './author-meta.model';
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

    @Field({ nullable: true })
    @Column({
        type: DataType.JSONB,
        get: FieldEncryptionUtil.decryptMeta('meta'),
        set: FieldEncryptionUtil.encryptMeta('meta'),
    })
    meta?: AuthorMeta;

    @Field(type => [Post])
    @HasMany(() => Post)
    posts?: Post[];
}