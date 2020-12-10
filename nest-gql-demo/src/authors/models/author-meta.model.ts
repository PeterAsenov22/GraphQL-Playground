import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthorMeta {
    @Field((type) => String, { nullable: true })
    companyName?: string;

    @Field((type) => String, { nullable: true })
    bulstat?: string;
}
