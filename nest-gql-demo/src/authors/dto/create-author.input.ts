import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, MinLength } from 'class-validator';

@InputType()
export class CreateAuthorInput {
    // { nullable: true }
    @Field()
    // @IsOptional()
    @MinLength(2)
    firstName: string;

    // { nullable: true }
    @Field()
    // @IsOptional()
    @MinLength(2)
    lastName: string;
}