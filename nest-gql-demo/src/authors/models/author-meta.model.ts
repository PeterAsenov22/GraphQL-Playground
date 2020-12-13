import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthorMeta {
    constructor(companyName: string, bulstat: string) {
        this.companyName = companyName;
        this.bulstat = bulstat;
    }
    
    @Field((type) => String, { nullable: true })
    companyName?: string;

    @Field((type) => String, { nullable: true })
    bulstat?: string;
}
